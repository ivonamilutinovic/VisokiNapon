using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace VISOKI_NAPON.Questions
{   

    /// Class contains information about question
    [Table("Questions")]
    public class Question
    {
        /// Question's id in table of questions
        public int Id { get; set; }
        /// Text of the question
        public string Text { get; set; }
        /// Answer on question
        //[NotMapped]
        public string Answer { get; set; }
        /// Category of question (1, 5, 10, or 4 for VisokiNapon Field)
        public int Category { get; set; }

        /// Constructor
        public Question() {}
    }
}