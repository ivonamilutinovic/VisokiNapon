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
    /// PlayersController class - manages log in/sign up-related requests
    public class PlayersController : Controller
    {   
    
        /// PlayerHandler for PlayersController 
		private IPlayerHandler playerHandler;
        
        /// PlayersController constructor
        public PlayersController(IPlayerHandler playerHandler)
        {
            this.playerHandler = playerHandler;
        }

        /// adjuntive class containing log in informations of player
        public class objLogin {
            public string user {get;set;}
            public string pass {get;set;}
        }

        /// adjuntive class containing infromations about player
        public class signUpObj {
            public string email {get;set;}
            public string name {get;set;}
            public string surname {get;set;}
            public string username {get;set;}
            public string password {get;set;}
            public string confirmpassword {get;set;}
        }
     
        /** ### Desctiption
        *  Log In Function - manages Players log in request 
        * ### Arguments
        * [FromBody]objLogin obj - frombody object contains Players username and password
        * ### Return value
        * IActionResult - Returns positive IActionResult in case of successfull log in and negative otherwise */
        [HttpPost("/api/v3/login")]
        public IActionResult login([FromBody]objLogin obj){
			
            if( playerHandler.Authenticate(obj.user, obj.pass).Result)
				return Json(true);
			else
				return Json(false);
		
        }

        /** ### Desctiption
        *  Function for players registration - manages Players register request 
        * ### Arguments
        * [FromBody]signUpObj obj - frombody object contains all Players data 
        * ### Return value
        * IActionResult - Returns positive IActionResult in case of successfull registration that later has to 
        * be confirmed, and negative otherwise */
        [HttpPost("/api/v3/register")]
        public IActionResult register([FromBody]signUpObj obj){
			
			if( playerHandler.Create(obj.email, obj.username, obj.name, obj.surname, obj.password, obj.confirmpassword).Result)
				return Json(true);
			else
				return Json(false);
			
        }
		
        /** ### Desctiption
        *  Function for registration confirmation - manages Players confirm registration request
        * ### Arguments
        * [FromBody]objLogin obj - frombody object contains Players username and confirmation pin 
        * ### Return value
        * IActionResult - Returns positive IActionResult in case of successfull confirmation and negative otherwise */
		[HttpPost("/api/v3/confirm")]
        public IActionResult confirm([FromBody]objLogin obj){
			
			if( playerHandler.Confirm(obj.user, obj.pass).Result)
				return Json(true);
			else
				return Json(false);
			
        }
		
    }
}

