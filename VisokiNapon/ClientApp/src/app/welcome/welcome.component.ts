import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
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
  
  /** Array with categories which questions belong */
  CategoryArray                       : Array<number>
  /** Array with text of questions */
  QTextArray                          : Array<string>
  /** Contains list of questions got from server */
  questions                           : any[]  

  /** Array of indicators whether question is opened or not */
  IsDisabledArray                     : Array<boolean> 
  /** Username of current user */
  User								  : string
  
  constructor(private data : DataService, private makeqService : MakeqService) {
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
  }
  
  /** Function that redirect player to practise mode */
  practice(){
    this.data.changePracticeMode(true)

    var i = 0
    for(const item of this.questions){
      this.CategoryArray[i] = item["category"]
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
  	this.data.changeGameNotOver(true)
    this.data.showWelcomeScreen(false)
    this.data.showQuestionsScreen(true)
  }

  /** Function that redirect player to competion mode (log in is required) */
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

