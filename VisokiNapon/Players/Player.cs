using System;
using System.Globalization;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace VISOKI_NAPON.Players
{   
    /// Class containing informations about player
    [Table("Players")]
    public class Player
    {   
        /// Email address - unique players identifier 
        public string Email { get; set; }
        /// Players name 
        public string Name { get; set; }
        /// Players surname 
        public string Surname { get; set; }
		/// Players username - unique players identifier
        [KeyAttribute]
        public string UsernameId { get; set; }
        /// Players password hash generated from players password
        public byte[] PasswordHash { get; set; }
        /// Players password salt generated from players password
        public byte[] PasswordSalt { get; set; }
        /// Contains information whether the player has been verified
		public string Verified {get; set;}
        /// Date and time of players registration
		public DateTime DateAndTime {get; set; }
 
        /// Constructor
        public Player() {}
    }
}