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
  showHide                            : boolean = false
  message                             : string = ""
  signupmessage                       : string = ""
  response                            : any
  CategoryArray                       : Array<number>
  QTextArray                          : Array<string>
  questions                           : any[]  //$: Observable<QuestionM[]>;
  
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
    this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
    this.makeqService.getQuestions().subscribe(questions => this.questions = questions);
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
    
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('/api/v3/register/', objSignup, {
              headers: headerOptions
      }).subscribe(t=> {console.log("resenje ",t," ", typeof(t)) 
      this.response =t

      if(this.response== true){
        var i=0
      for(const item of this.questions ){
        this.CategoryArray[i]=item["category"]
        //this.Ids[i]=item["id"]
        this.QTextArray[i]=item["text"]
        i++
      }

      this.data.changeCategoryArray(this.CategoryArray)
      this.data.changeQTextArray(this.QTextArray)
    
      this.data.showSignUpScreen(false)
      this.data.showLogInScreen(true)
      }
      else {
      this.signupmessage = "Email adresa je vec registrovana ili je uneto korisničko ime zauzeto. " +  
                "Pokušajte ponovo!"

      }
    }) 	
    }

}
