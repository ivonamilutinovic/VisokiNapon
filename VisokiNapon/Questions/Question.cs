using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;
namespace VISOKI_NAPON.Questions
{   
    [Table("Questions")]
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        //[NotMapped]
        public string Answer { get; set; }
        public int Category { get; set; }
        public Question() {}
    }
}