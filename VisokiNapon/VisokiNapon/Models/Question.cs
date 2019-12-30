using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VisokiNapon.Models
{
    public class Question
    {
        public int id { get; set; }
        public string question { get; set; }
        public int value { get; set; }

        public int category { get; set; }


        public Question(int id, string q, int v, int c)
        {
            this.id = id;
            this.category = c;
            this.question = q;
            this.value = v;

        }

        public Question()
        {
        }
    }
}
