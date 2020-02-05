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
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;
using AutoMapper;
using VISOKI_NAPON.Handlers;



namespace VISOKI_NAPON.Controllers
{   
    
    public class PlayersController : Controller
    {   
    
		 private IPlayerHandler playerHandler;
        public PlayersController(IPlayerHandler playerHandler)
        {
            this.playerHandler = playerHandler;
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
        public IActionResult login([FromBody]objLogin obj){
			
            if( playerHandler.Authenticate(obj.user, obj.pass).Result)
				return Json(true);
			else
				return Json(false);
		
        }

        [HttpPost("/api/v3/register")]
        public IActionResult register([FromBody]signUpObj obj){
			
			if( playerHandler.Create(obj.email, obj.username, obj.name, obj.surname, obj.password, obj.confirmpassword).Result)
				return Json(true);
			else
				return Json(false);
			
        }
		
		[HttpPost("/api/v3/confirm")]
        public IActionResult confirm([FromBody]objLogin obj){
			
			if( playerHandler.Confirm(obj.user, obj.pass).Result)
				return Json(true);
			else
				return Json(false);
			
        }
		
    }
}

