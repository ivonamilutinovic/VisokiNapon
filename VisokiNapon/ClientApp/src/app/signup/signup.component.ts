import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  WelcomeScreen                       : boolean
  LogInScreen                         : boolean
  QuestionsScreen                     : boolean
  AnsweringScreen                     : boolean
  SignUpScreen                        : boolean
  TopListScreen                       : boolean
  ChooseModeScreen                    : boolean
  TenderScreen                        : boolean
  message             : string = ""
  signupmessage       : string = ""
  response            : any
  disabledField		  : boolean = false
  codeConfirmation    : boolean = false	
  user				  : string = ""
  requestSent		  : boolean = false
  timeBool                             : any			/*** boolean for operations with time and action on time ***/
  infoBool                             : any	        /*** boolean for operations with time and action on time ***/

  
  constructor(private data : DataService, private http: HttpClient,  private makeqService : MakeqService) { }
  

  ngOnInit() {
    this.data.currentWelcomeScreen.subscribe(message => this.WelcomeScreen = message)
    this.data.currentLogInScreen.subscribe(message => this.LogInScreen = message)
    this.data.currentQuestionsScreen.subscribe(message => this.QuestionsScreen = message)
    this.data.currentAnsweringScreen.subscribe(message => this.AnsweringScreen = message)
	this.data.currentSignUpScreen.subscribe(message => this.SignUpScreen = message) 
	this.data.currentTopListScreen.subscribe(message => this.TopListScreen = message) 
    this.data.currentChooseModeScreen.subscribe(message => this.ChooseModeScreen = message) 	 
	this.data.currentTenderScreen.subscribe(message => this.TenderScreen = message)

  }

  changeToLogin(){
		this.data.showSignUpScreen(false)
		this.data.showLogInScreen(true)
  }

  checkSignUpInfo(uemail: string, uname: string, usurname: string, usr: string, pass : string , confpass : string){
	  
    var objSignup = {
      email             : uemail,
      name              : uname,
      surname           : usurname,
      username          : usr,
      password          : pass,
      confirmpassword   : confpass
    }  
    
	
	this.disabledField=true
	
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('/api/v3/register/', objSignup, {
              headers: headerOptions
      }).subscribe(t=> { 
      this.response =t

      if(this.response== true){
		this.user = usr
		this.codeConfirmation = true
		this.signupmessage = "Unesite kod koji vam je stigao na uneti email."
		
		this.timeBool = setTimeout(function () {
          this.signupmessage = "Isteklo je vreme za verifikaciju! Pokušajte da se registrujete ponovo!"
		  this.requestSent = true	
		  
		  var objLogin = {
			user : this.user,
			pass : "0"
			}
	
		const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
		this.http.post('/api/v3/confirm/', objLogin, {
              headers: headerOptions
		}).subscribe(t=> {
		this.response =t
		}) 
          // After 3 seconds, player is returned to sign up page
          this.infoBool = setTimeout(function () {
            this.data.showSignUpScreen(false)
			this.data.showWelcomeScreen(true)
          }.bind(this), 4000);
        }.bind(this), 180000);
		
		
      }
      else {
		this.signupmessage = "Email adresa je vec registrovana ili je uneti username zauzet. " +  
						   "Pokušajte ponovo!"
		this.disabledField=false;
      }
    }) 	
    }
	
	confirmCode(code : string){
	
	clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)
	this.requestSent = true
	
	var objLogin = {
      user : this.user,
      pass : code
    }
	
	const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('/api/v3/confirm/', objLogin, {
              headers: headerOptions
      }).subscribe(t=> {
      this.response =t

      if(this.response== true){
		this.signupmessage = "Uneli ste isptavan kod! Registracija uspela!"
		setTimeout(function () {
			this.data.showSignUpScreen(false)
			this.data.showLogInScreen(true)
		}.bind(this), 3000);
		
      }
      else {
		this.signupmessage = "Uneli ste pogrešan kod. Probajte opet da se registrujete!"
		setTimeout(function () {
			this.data.showSignUpScreen(false)
			this.data.showWelcomeScreen(true)
		}.bind(this), 3000);
      }
    })  
	}

}
