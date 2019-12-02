using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VisokiNapon.ClientApplication.Models{
    public class Player{

        public string Ime { get; set;}
        public string Prezime { get; set; }
        public string Username { get; set; }

        public char[] Password { get; set; }
        public string Email { get; set; }
        public string Picture { get; set; }
       
        // Potrebno samo za prvi sprint, kasnije cemo prosiriti inicijalizacijom ostalih atributa
        public Player(string username, char[] password) { 
        	this.Username = username;
		    for(int i = 0; password[i] != '\0'; i++)
			    this.Password[i] = password[i];
        }

        

    }
}
