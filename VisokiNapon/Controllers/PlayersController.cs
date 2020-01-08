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
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using AutoMapper;
using System.Data.SqlClient;
using System.Text.RegularExpressions;
//using Microsoft.Data.SqlClient;
//using System.Data.SqlClient;

namespace VISOKI_NAPON.Controllers
{   
    
    public class PlayersController : Controller
    {   
    
        private readonly VisokiNaponDbContext context;
        public PlayersController(VisokiNaponDbContext context)
        {
            this.context = context;
        }

        public class objLogin {
        public string user {get;set;}
        public string pass {get;set;}
    }



        public class signUpObj {
        public string email {get;set;}
		public string name {get;set;}
        public string surname {get;set;}
		public string username {get;set;}
        public string password {get;set;}
		public string confirmpassword {get;set;}
    }
     
        [HttpPost("/api/v3/login")]
        public async Task<IActionResult> login([FromBody]objLogin obj){
            string pas = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.Username == obj.user).Select(que=>que.Password).FirstOrDefault());
            if(pas == null)
				return Json(false);	
			if(pas!= null && pas.Equals(obj.pass, StringComparison.CurrentCultureIgnoreCase))
					return Json(true); 
            else 
                return Json(false);
        }

         [HttpPost("/api/v3/register")]
        public async Task<IActionResult> register([FromBody]signUpObj obj){
			
            string pas = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.Username == obj.username).Select(que=>que.Password).FirstOrDefault());
            if(pas != null)
				return Json(false);	// vec postoji user sa datim usernameom
			
			string usr = await Task.FromResult(context.Players.AsEnumerable()
            .Where(que => que.EmailId == obj.email).Select(que=>que.Username).FirstOrDefault());
			if(usr!=null)
				return Json(false); // vec postoji registrovani korisnik sa datim email-om

			// provera za mail adresu
			if (!Regex.Match(obj.email, @"[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}").Success)
				return Json(false);
			
			// provera za username
			if (!Regex.Match(obj.username, @"^[a-zA-Z0-9]+(?:[-_]?[a-zA-Z0-9]+)*$").Success || obj.username.Length < 5 || obj.username.Length > 24)
				return Json(false);
			
			// provera za password
			if (!Regex.Match(obj.password, @"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}").Success || obj.password.Length < 8 || obj.password.Length > 18)
				return Json(false);
			
			// provera za confirmpassword same as password
			if (obj.confirmpassword==null || !obj.confirmpassword.Equals(obj.password, StringComparison.CurrentCultureIgnoreCase))
				return Json(false);
						
			var p = new Player { EmailId = obj.email, Name = obj.name, Surname = obj.surname, Username = obj.username,
								Password = obj.password };

			var p2 = context.Players.Add(p);
			context.SaveChanges();
			
			
			
			return Json(true); 

        }

    }

    
}