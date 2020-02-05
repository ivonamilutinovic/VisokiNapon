using System;
using System.Globalization;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace VISOKI_NAPON.Players
{   
    [Table("Players")]
    public class Player
    {   
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
		[KeyAttribute]
        public string UsernameId { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
		public string Verified {get; set;}
		public DateTime DateAndTime {get; set; }
 
        public Player() {}
    }
}