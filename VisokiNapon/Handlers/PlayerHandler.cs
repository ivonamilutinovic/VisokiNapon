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
    public interface IPlayerHandler
    {
         Task<bool> Authenticate(string username, string password);
		 Task<bool> Confirm(string username, string pin);
         Task<bool> Create(string email, string username, string name, string surname, string password, string confirmpassword);
		 void sendMail(string email, int number);
    }

    public class PlayerHandler : IPlayerHandler 
    {
        private readonly VisokiNaponDbContext context;
        
		public PlayerHandler(VisokiNaponDbContext context)
        {
            this.context = context;
        }

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
			}	// postoji player sa datim username-om koji nije verifikovan, brisemo ga

			if( player!= null && (DateTime.Now -player.DateAndTime).TotalMinutes < 3.0 && !(player.Verified == "1")){
				return false;
			}	// postoji player sa datim username-om koji nije verifikovan u vremenu od 3 min, ne pustamo ga dok se ne verifikuje
			
		   // check if username exists
            if (player.PasswordHash == null || player.PasswordSalt == null)
                return false;
			
            // check if password is correct
            if (!VerifyPasswordHash(password, player.PasswordHash, player.PasswordSalt))
                return false;

            // authentication successful
            return true;
        }


        public async Task<bool> Create(string email, string username, string name, string surname, string password, string confirmpassword)
        {
			
			/*
            var players = await context.Players
                                       .FromSqlRaw("SELECT Email, Name, Surname, UsernameId, PasswordHash, PasswordSalt, Verified, DateAndTime " +
                                                   "FROM dbo.Players " +
                                                   "Where Verified > 1 ").ToListAsync();
												   
			foreach (var player in players) {
				if((DateTime.Now - player.DateAndTime).TotalMinutes > 3.0)
					context.Players.Remove(player);
			}
			
			context.SaveChanges();
			*/
			
			/*
            string emaddr = await Task.FromResult( context.Players.AsEnumerable()
            .Where(que => que.UsernameId == username).Select(que=>que.Email).FirstOrDefault());
			if( emaddr != null)
				return false;	// vec postoji user sa datim usernameom
			*/
			
			var player = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.UsernameId == username).FirstOrDefault());

			
            if( player!= null && (DateTime.Now -player.DateAndTime).TotalMinutes > 3.0 && !(player.Verified == "1")){
				context.Players.Remove(player);
				context.SaveChanges();
				player=null;
			}	// postoji player sa datim username-om koji nije verifikovan, brisemo ga
			
			if(player!= null)
				return false;	// vec postoji user sa datim usernameom
			
			var player1 = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.Email == email).FirstOrDefault());
			
			if( player1!= null && (DateTime.Now -player1.DateAndTime).TotalMinutes > 3.0 && !(player1.Verified == "1")){
				context.Players.Remove(player1);
				context.SaveChanges();
				player1=null;
			}	// postoji player sa datim email-om koji nije verifikovan, brisemo ga
			
			if(player1!= null)
				return false;	// vec postoji user sa datim usernameom
			
			/*
			string usr = await Task.FromResult( context.Players.AsEnumerable()
            .Where(que => que.Email == email).Select(que=>que.UsernameId).FirstOrDefault());
			if(usr!=null)
				return false; // vec postoji registrovani korisnik sa datim email-om

			*/
			
			
			// provera za mail adresu
			if (!Regex.Match(email, @"[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}").Success)
				return false;
			
			// provera za username
			if (!Regex.Match(username, @"^[a-zA-Z0-9]+(?:[-_]?[a-zA-Z0-9]+)*$").Success || username.Length < 5 || username.Length > 24)
				return false;
			
			// provera za password
			if (!Regex.Match(password, @"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}").Success || password.Length < 8 || password.Length > 18)
				return false;
			
			// provera za confirmpassword same as password
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

        // private helper methods

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
			
			/*
			var plainTextContent = "Your confirmation id is " + number.ToString() + ".";
			var htmlContent = "Your confirmation id is <strong>" + number.ToString() + "</strong>.";
			*/
			var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
			var response = await client.SendEmailAsync(msg);	
		}
	
		private int RandomNumber()    
		{    
			Random random = new Random();    
			return random.Next(1000, 9999);    
			
		}	
		
    }
}