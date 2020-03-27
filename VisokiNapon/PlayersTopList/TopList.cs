using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace VISOKI_NAPON.PlayersTopList
{   
    /// Class contains information about player from TopList table
    [Table("PlayersTopList")]
    public class TopList
    {   
        /// Player id in TopList table     
        [KeyAttribute]
        public int Id { get; set; }
        /// Player's username
        public string Username { get; set; }
        /// Max amount that the player has won 
        public int MaxAmount { get; set; }
        /// Constructor
        public TopList() {}
    }
}