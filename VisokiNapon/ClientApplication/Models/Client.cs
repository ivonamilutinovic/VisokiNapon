using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClientApplication.Models
{
    public class Client
    {
        
        public Player player { get; set; }
        public string question { get; set; }
        public string answer { get; set; }

        // We need this only for first sprint, later it will be extended with initialization for other atributes
        public Client(Player player, string question, string answer)
        {
            this.player = player;
            this.question = question;
            this.answer = answer;
        }

    }

    
}
