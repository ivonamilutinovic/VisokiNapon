using System.Security.AccessControl;
using System.Net;
using System.ComponentModel.Design.Serialization;
using System.Data.Common;
using System;
using System.Linq;
using System.IO.MemoryMappedFiles;
using System.Globalization;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using VISOKI_NAPON.Players;
using VISOKI_NAPON.Persistence;
using VISOKI_NAPON.Controllers;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using AutoMapper;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace VISOKI_NAPON.Handlers
{

	/// PlayerHandler Interface
    public interface IPlayerHandler
    {
		/// Log in function for player authentification 
        Task<bool> Authenticate(string username, string password);
		/// Function that checks player confirmation
		Task<bool> Confirm(string username, string pin);
		/// Register function that creates and persists new player 
        Task<bool> Create(string email, string username, string name, string surname, string password, string confirmpassword);
		
		/// Function for sending mail
		void sendMail(string email, int number);
    }

	/// PlayerHandler class - contains functions for all player-related requests
    public class PlayerHandler : IPlayerHandler 
    {
		/// DataBaseContext
        private readonly VisokiNaponDbContext context;
        
		/// PlayerHandler Constructor
		public PlayerHandler(VisokiNaponDbContext context)
        {
            this.context = context;
        }

		/** ### Description 
		*	Function that checks player confirmation <br>
		* ### Arguments
		* string username - player's username <br>
		* string pin - confirmation pin that player has recieved by email <br>
		* ### Return value
		* Task<boolean> - true in case of successful confirmation, false otherwise  */
		public async Task<bool> Confirm(string username, string pin)
        {	
			if (string.IsNullOrEmpty(username))
                return false;
			
			var player = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.UsernameId == username).FirstOrDefault());
			
			if(player==null)
				return false;
			
			if(player.Verified == pin){
				player.Verified = "1";
				context.Players.Update(player);
				context.SaveChanges();
				return true;
			}
			else {
				context.Players.Remove(player);
				context.SaveChanges();
				return false;
			}
		}
		
		/** ### Description
        * Log in function - manages player authentification
        * ### Arguments
        * string username - player's username <br>
        * string password - player's password <br>
        * ### Return value
        * Task<boolean> - true in case of successful authentification, false otherwise */
        public async Task<bool>  Authenticate(string username, string password)
        {
			if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return false;
			
			var player = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.UsernameId == username).FirstOrDefault());
			
			if(player==null)
				return false;

			if( player!= null && (DateTime.Now -player.DateAndTime).TotalMinutes > 3.0 && !(player.Verified == "1")){
				context.Players.Remove(player);
				context.SaveChanges();
				return false;
			}	// player with given username exists, but it's not verified -> deleted

			if( player!= null && (DateTime.Now -player.DateAndTime).TotalMinutes < 3.0 && !(player.Verified == "1")){
				return false;
			}	// player with given username exists, but it's not verified within 3 minutes -> do not release him until he is verified
			
		   // checking if the username exists
            if (player.PasswordHash == null || player.PasswordSalt == null)
                return false;
			
            // checking if the password exists
            if (!VerifyPasswordHash(password, player.PasswordHash, player.PasswordSalt))
                return false;

            // authentication succeeded
            return true;
        }


		/** ### Description
		* Register function that creates and persists the new player 
		* ### Arguments
		* string email - player's email <br>
		* string username - player's username <br>
		* string name - player's name <br>
		* string surname - player's surname <br>
		* string password - player's password <br>
		* string confirmpassword - confirm password for password confirmation  <br>
		* ### Return value
		* Task<boolean> - true in case of successfull registration, false otherwise */
        public async Task<bool> Create(string email, string username, string name, string surname, string password, string confirmpassword)
        {
			
			if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(username) ||
				string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmpassword) )
                return false;	

			var player = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.UsernameId == username).FirstOrDefault());

			
            if( player!= null && (DateTime.Now -player.DateAndTime).TotalMinutes > 3.0 && !(player.Verified == "1")){
				context.Players.Remove(player);
				context.SaveChanges();
				player=null;
			}	// player with given username exists, but it's not verified -> deleted
			
			if(player!= null)
				return false;	// player with given username exists
			
			var player1 = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.Email == email).FirstOrDefault());
			
			if( player1!= null && (DateTime.Now -player1.DateAndTime).TotalMinutes > 3.0 && !(player1.Verified == "1")){
				context.Players.Remove(player1);
				context.SaveChanges();
				player1=null;
			}	// player with given email exists, but it's not verified -> deleted
			
			if(player1!= null)
				return false;	// player with given email already exists

			// checking for email adress
			if (!Regex.Match(email, @"[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}").Success)
				return false;
			
			// checking for username
			if (!Regex.Match(username, @"^[a-zA-Z0-9]+(?:[-_]?[a-zA-Z0-9]+)*$").Success || username.Length < 5 || username.Length > 24)
				return false;
			
			// checking for password
			if (!Regex.Match(password, @"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}").Success || password.Length < 8 || password.Length > 18)
				return false;
			
			// checking for confirmpassword - is it the same as password
			if (confirmpassword==null || !confirmpassword.Equals(password, StringComparison.CurrentCultureIgnoreCase))
				return false;
			
            byte[] passwordHash, passwordSalt;
            if(!CreatePasswordHash(password, out passwordHash, out passwordSalt))
				return false;

			int random = RandomNumber();
			
			var p = new Player { Email = email, Name = name, Surname = surname, UsernameId = username,
								PasswordHash = passwordHash, PasswordSalt = passwordSalt, Verified = random.ToString(), DateAndTime = DateTime.Now};

			var p2 = await Task.FromResult(context.Players.Add(p));
			context.SaveChanges();

			sendMail(email, random);
			Console.Write(random + "\n");
			
            return true;
        }

		/** ### Description
		* Function that creates password hash and password salt from player's password <br>
		* ### Arguments
		* string password - player's password <br>
		* out byte[] passwordHash - player's passwordHash which will be generated from password <br>
		* out byte[] passwordSalt - player's passwordSalt which will be generated from password <br>
		* ### Return value
		* Boolean - true in case of successful creation of password hash and salt, false otherwise */
        private static bool CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
			passwordSalt = null;
			passwordHash = null;
			
            if (password == null) return false;
            if (string.IsNullOrWhiteSpace(password)) return false;

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
			
			return true;
        }

		/** ### Description
		* Function for password verification - checks if forwarded password hash and salt correspond to the password
		* ### Arguments
		* string password - player's password <br>
		* byte[] passwordHash - player's passwordHash <br>
		* byte[] passwordSalt - player's passwordSalt <br>
		* ### Return value
		* Boolean - true in case of successfull password verification, false otherwise */
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) return false;
            if (string.IsNullOrWhiteSpace(password)) return false;
			if (storedHash.Length != 64) return false;
			if (storedSalt.Length != 128) return false;
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }	   

		/** ### Description
		* Function for sending contirmation mail to the player
		* ### Arguments
		* string email - email address to which the mail will be sent <br>
		* int number - player confirmation pin <br> */
		public async void sendMail(string email, int number){
		
			var apiKey = Environment.GetEnvironmentVariable("SENDGRID_KEY");
			var client = new SendGridClient(apiKey);
			var from = new EmailAddress("support@visokinapon.com", "Visoki Napon Support");
			var subject = "Welcome to VisokiNapon! Confirm your Email!";
			var to = new EmailAddress(email, email);
			var plainTextContent = "Hi there!\n\n" + "Thank you for signing up. Your confirmation code is "
			+  number.ToString() + ".\n\n" + " Regards,\n" + "Visoki Napon support team.";
			var htmlContent = "Hi there!\n\n<br><br>" + "Thank you for signing up. Your confirmation code is <strong>"
			+  number.ToString() + "</strong>.\n\n<br><br>" + " Regards,\n<br>" + "Visoki Napon support team.";
			var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
			var response = await client.SendEmailAsync(msg);	
		}
	
		/// Function that generates random number used for player confirmation pin
		private int RandomNumber()    
		{    
			Random random = new Random();    
			return random.Next(1000, 9999);    
			
		}	
		
    }
}