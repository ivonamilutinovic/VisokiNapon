using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace VISOKI_NAPON.PlayersTopList
{   
    [Table("PlayersTopList")]
    public class TopList
    {   
        [KeyAttribute]
        public int Id { get; set; }
        public string Username { get; set; }
        public int MaxAmount { get; set; }
        public TopList() {}
    }
}