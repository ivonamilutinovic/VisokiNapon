using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VisokiNapon.Models;

namespace VisokiNapon.Data
{
    public class QuestionsForClientRepo
    {

        public static QuestionsForClient[] questionsForCurrentClients =
            new QuestionsForClient[] { 
                /* prvi klijent, ide neki njegov id, a u QuestionsForClient se generisu pitanja */
                new QuestionsForClient(1),
                /* drugi klijent */
                new QuestionsForClient(2),
                /* treci klijent */
                new QuestionsForClient(3),
            };


        public static Question getQuestionForClientIdAndValue(int clientId, int value)
        {
            Question question = new Question();

            /* indeks u nizu gde su podaci klijenta sa clientId */
            int index = Array.FindIndex(questionsForCurrentClients, element => element.clientId == clientId);


            /* OVDE BI INACE ISO DISCONNECT */
            if (index == -1)
            {
                question.question = "THERE IS NO CLIENT WITH PROCEEDED ID ";
                return question;
            }

            if (value == 10000 && questionsForCurrentClients[index].q10 != 5)
            {
                question = questionsForCurrentClients[index].questions[questionsForCurrentClients[index].q10];
                questionsForCurrentClients[index].q10++;

            }

            if (value == 50000 && questionsForCurrentClients[index].q50 != 5)
            {
                question = questionsForCurrentClients[index].questions[questionsForCurrentClients[index].q50 + 5];
                questionsForCurrentClients[index].q50++;

            }

            if (value == 100000 && questionsForCurrentClients[index].q100 != 5)
            {
                question = questionsForCurrentClients[index].questions[questionsForCurrentClients[index].q100 + 10];
                questionsForCurrentClients[index].q100++;

            }

            /* OVDE BI INACE ISO DISCONNECT */
            if (question.question == null)
                question.question = "YOU HAVE ANSWERED TO ALL QUESTIONS FOR PROCEEDED AMOUNT!";

            return question;

        }


    }
}
