import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  /** Indicator of WelcomeComponent activity */
  WelcomeScreen                        : boolean
  /** Indicator of LogInComponent activity */
  LogInScreen                          : boolean
  /** Indicator of TableComponent activity */
  QuestionsScreen                      : boolean
  /** Indicator of TableComponent activity */
  AnsweringScreen                      : boolean
  /** Indicator of SignUpComponent activity */
  SignUpScreen                         : boolean
  /** Indicator of TopListComponent activity */
  TopListScreen                        : boolean
  /** Indicator of ChoseeModeComponent activity */
  ChooseModeScreen                     : boolean
  /** Indicator of TenderComponent activity */
  TenderScreen                         : boolean

  /** Message which will be shown to player */
  message                  : string = ""
  /** Message which will be shown to player */
  signupmessage            : string = ""
  /** Server's response on player's log in request */
  response                 : any
  /** Username of current user */
  User					   : string
  
  constructor(private data : DataService, 
              private http : HttpClient,  
              private makeqService : MakeqService) { }
              
  ngOnInit() {
    this.data.currentWelcomeScreen.subscribe(message => this.WelcomeScreen = message)
    this.data.currentLogInScreen.subscribe(message => this.LogInScreen = message)
    this.data.currentQuestionsScreen.subscribe(message => this.QuestionsScreen = message)
    this.data.currentAnsweringScreen.subscribe(message => this.AnsweringScreen = message)
	  this.data.currentSignUpScreen.subscribe(message => this.SignUpScreen = message) 
  	this.data.currentTopListScreen.subscribe(message => this.TopListScreen = message) 
    this.data.currentChooseModeScreen.subscribe(message => this.ChooseModeScreen = message) 	 
	  this.data.currentTenderScreen.subscribe(message => this.TenderScreen = message)
  	this.data.currentTenderScreen.subscribe(message => this.TenderScreen = message)
  	this.data.currentUser.subscribe(message => this.User = message)
	
  }

  /** Function which checks player's log in data */
  checkLoginInfo(username : string, password : string){
  
    var objLogin = {
      user : username,
      pass : password
    }

    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.post('/api/v3/login/', objLogin, {
            headers: headerOptions
    }).subscribe(t => {console.log("solution ",t," ", typeof(t)) 
    
    this.response = t

    if(this.response == true){

      this.User = username
	    this.data.changeUser(this.User)    
      
	    this.data.showLogInScreen(false)
      this.data.showChooseModeScreen(true)
    }
    else {
      this.invalidRequest()
    }
  }) 

  }

  /** Function which redirects player to register */
  changeToSignup(){
		this.data.showLogInScreen(false)
		this.data.showSignUpScreen(true)
  }

  /** Function which informs player about invalid log in request */
  invalidRequest(){
    this.message = "Pogrešno korisničko ime ili lozinka. Pokušajte ponovo."
  }

  /** Function which informs player that he didn't fill all the fields */
  requiredFields(){
    this.message = "Oba polja su obavezna."
  }

  /** Function which checks whether or not the player has entered his information */
  checkData(username : string, password : string){
      if(username=="" || password=="")
        return false
      else
        return true
  }

}