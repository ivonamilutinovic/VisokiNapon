import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

// const httpOpt = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json, text/plain'
//   })
// };

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  WelcomeScreen                       : boolean
  LogInScreen                         : boolean
  QuestionsScreen                     : boolean
  AnsweringScreen                     : boolean
  SignUpScreen                        : boolean
  TopListScreen                       : boolean
  ChooseModeScreen                    : boolean
  TenderScreen                        : boolean
  CategoryArray                       : Array<number>
  QTextArray                          : Array<string>
  questions                           : any[]  //$: Observable<QuestionM[]>;
  ques                                : string[]
  IsDisabledArray                     : Array<boolean> 
  User								  : string
  
  // private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  // postData = {
  //   test: 'my content'
  // }
  
  constructor(private data : DataService, private makeqService : MakeqService) {
    //this.http.post('/api/v1/answer', JSON.stringify('log'), httpOpt).toPromise().then(data=>{console.log(data);
   // })
   }
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
	this.data.currentIsDisabledArray.subscribe(message => this.IsDisabledArray = message)
	this.data.currentUser.subscribe(message => this.User = message)
    // this.makeqService.postAnswer().subscribe(response => console.log("response from POST", response));
  }
  
  practice(){
    // this.makeqService.validate_user(...).subscribe(res => console.log(res))
    this.data.changePracticeMode(true)

    var i = 0
    for(const item of this.questions){
      this.CategoryArray[i] = item["category"]
      // this.Ids[i] = item["id"]
      this.QTextArray[i] = item["text"]
      this.IsDisabledArray[i]= false
	  i++
	  
    }

	this.data.changeIsDisabledArray(this.IsDisabledArray)
    this.data.changeCategoryArray(this.CategoryArray)
    this.data.changeQTextArray(this.QTextArray)
    
	this.data.changeCounter(0)
	this.data.changeIndicator(false)
	this.data.changeQNumber(-1)
	this.data.changeSum(0)
	this.data.changeValueOfQuestion(0)
	this.data.changeNumberOfQuestionPerRound(5)
	this.data.changeField(16)
	this.data.changecounterPerRound(0)
	this.data.changeGuaranteedSum(0)
	this.data.changeEndOfGame(0)
	this.data.changeCorrect(true)
	this.data.changeusedReplaceQuestionHelp1(false)
	this.data.changeusedReplaceQuestionHelp2(false)
	this.data.changeGameOver(true)
	
    this.data.showWelcomeScreen(false)
    this.data.showQuestionsScreen(true)
  }

  logInOrPlay(){
	  
	  if(this.User!= ""){
		this.data.changePracticeMode(false)
		this.data.showWelcomeScreen(false)
		this.data.showChooseModeScreen(true)
	  }
	  else{
		this.data.changePracticeMode(false)
		this.data.showWelcomeScreen(false)
		this.data.showLogInScreen(true)
	  }
  }
}

