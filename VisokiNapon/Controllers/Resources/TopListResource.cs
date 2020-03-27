using System.Collections.Generic;
using System.Collections.ObjectModel;
namespace VISOKI_NAPON.Controllers.Resources
{
    ///API resource class for TopList 
    public class TopListResource
    {
        public int Id { get; set; }
        public string Username { get; set; } 
        public int MaxAmount { get; set; }        
    }
}