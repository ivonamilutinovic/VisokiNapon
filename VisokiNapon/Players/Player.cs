using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace VISOKI_NAPON.Players
{   
    [Table("Players")]
    public class Player
    {   [KeyAttribute]
        public string EmailId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }
        public string Password {get; set; }
 
        public Player() {}
    }
}