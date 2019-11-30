using System;
using System.Collections.Generic;
using System.Text;

namespace ServerApplication
{
    public class Question
    {
        public string question;
        public string answer;
        int value;

        public Question(String question, String answer, int value)
        {
            this.question = question;
            this.answer = answer;
            this.value = value;
        }


        public String getQuestion()
        {
            return question;
        }


        public String getAnswer()
        {
            return answer;
        }

        public int getValue()
        {
            return value;
        }

    }
}
