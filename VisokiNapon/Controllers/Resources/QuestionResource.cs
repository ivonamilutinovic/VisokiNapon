using System.Collections.Generic;
using System.Collections.ObjectModel;
namespace VISOKI_NAPON.Controllers.Resources
{
    public class QuestionResource
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Answer { get; set; }
        public int Category { get; set; }
        
    }
}