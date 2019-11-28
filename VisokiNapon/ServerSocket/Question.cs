using System;
using System.Collections.Generic;
using System.Text;

namespace ServerApplication
{
    public class Question
    {
        public string question;
        public string answer;

        public Question(String question, String answer)
        {
            this.question = question;
            this.answer = answer;
        }


        public String getQuestion()
        {
            return question;
        }


        public String getAnswer()
        {
            return answer;
        }

    }
}
