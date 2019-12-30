using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VisokiNapon.Models
{
    public class QuestionsForClient
    {
        public int clientId { get; set; }

        public Question[] questions { get; set; }

        public int q10 { get; set; } = 0;

        public int q50 { get; set; } = 0;

        public int q100 { get; set; } = 0;

        public int category { get; set; }


        public QuestionsForClient(int clientId)
        {
            this.clientId = clientId;

            /* ovde se pitanja ucitavaju random iz baze za ovog datog klijenta */
            this.questions = new Question[] {
                new Question(1, "Prvo za 10", 10000, 1),
                new Question(2, "Drugo za 10", 10000, 1),
                new Question(3, "Trece za 10", 10000, 1),
                new Question(4, "Cetvrto za 10", 10000, 1),
                new Question(5, "Peto za 10", 10000, 1),
                new Question(6, "Prvo za 50", 50000, 2),
                new Question(7, "Drugo za 50", 50000, 2),
                new Question(8, "Trece za 50", 50000, 2),
                new Question(9, "Cetvrto za 50", 50000, 2),
                new Question(10, "Peto za 50", 50000, 2),
                new Question(11, "Prvo za 100", 100000, 3),
                new Question(12, "Drugo za 100", 100000, 3),
                new Question(13, "Trece za 100", 100000, 3),
                new Question(14, "Cetvrto za 100", 100000, 3),
                new Question(15, "Peto za 100", 100000, 3)
            };

        }


    }
}
