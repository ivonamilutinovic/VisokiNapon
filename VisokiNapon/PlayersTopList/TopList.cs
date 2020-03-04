using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace VISOKI_NAPON.PlayersTopList
{   
    /// Class contain information about player in TopList
    [Table("PlayersTopList")]
    public class TopList
    {   
        /// Id of player in TopList database table     
        [KeyAttribute]
        public int Id { get; set; }
        /// Players username
        public string Username { get; set; }
        /// Amount the player has won 
        public int MaxAmount { get; set; }

        /// Constructor
        public TopList() {}
    }
}