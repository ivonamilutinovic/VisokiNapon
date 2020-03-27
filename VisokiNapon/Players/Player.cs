using System;
using System.Globalization;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace VISOKI_NAPON.Players
{   
    /// Class contains informations about player
    [Table("Players")]
    public class Player
    {   
        /// Email address - unique player identifier 
        public string Email { get; set; }
        /// Player's name 
        public string Name { get; set; }
        /// Player's surname 
        public string Surname { get; set; }
		/// Player's username - unique player identifier
        [KeyAttribute]
        public string UsernameId { get; set; }
        /// Player's password hash generated from player's password
        public byte[] PasswordHash { get; set; }
        /// Player's password salt generated from player's password
        public byte[] PasswordSalt { get; set; }
        /// Contains information whether the player has been verified
		public string Verified {get; set;}
        /// Date and time of player registration
		public DateTime DateAndTime {get; set; }
 
        /// Constructor
        public Player() {}
    }
}