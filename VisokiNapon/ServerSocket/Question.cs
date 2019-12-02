using System;
using System.Collections.Generic;
using System.Text;

namespace ServerApplication
{
    public class Question
    {
        private string question;
        private string answer;
        int value;
        public Question(String question, String answer, int value)
        {
            this.question = question;
            this.answer = answer;
            this.value = value;
        }

        public Question()
        {
        }

        public string getQuestion()
        { 
            return question; 
        }
        public string getAnswer()
        {
            return answer;
        }
        public int getValue()
        {
            return value;
        }

        public void setQuestion(string value) 
        {
            this.question = value;
        }
        public void setAnswer(string value)
        {
            this.answer = value;
        }
        public void setValue(int value)
        {
            this.value = value;
        }      
        
    }
    
}
