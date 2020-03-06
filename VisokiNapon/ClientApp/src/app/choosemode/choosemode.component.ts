import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable} from 'rxjs';


@Component({
  selector:    'app-choosemode',
  templateUrl: './choosemode.component.html',
  styleUrls:   ['./choosemode.component.css']
})

export class ChooseModeComponent implements OnInit {

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
  
  /** Indicator whether PractiseMode is choosen or not */
  PracticeMode                         : boolean = false
  /** Array of categories of questions */
  CategoryArray                        : Array<number>
  /** Array of text of questions */
  QTextArray                           : Array<string>
  /** Contains list of questions got from server */
  questions                            : any[]  //$: Observable<QuestionM[]>;
  // ques                                 : string[]

  /** Array of indicators whether question is opened or not */
  IsDisabledArray		   : Array<boolean>

  constructor(private data: DataService, private http: HttpClient,  private makeqService : MakeqService) {}
  
  ngOnInit() {
    this.data.currentWelcomeScreen.subscribe(message => this.WelcomeScreen = message)
    this.data.currentLogInScreen.subscribe(message => this.LogInScreen = message)
    this.data.currentQuestionsScreen.subscribe(message => this.QuestionsScreen = message)
    this.data.currentAnsweringScreen.subscribe(message => this.AnsweringScreen = message)
  	this.data.currentSignUpScreen.subscribe(message => this.SignUpScreen = message) 
  	this.data.currentTopListScreen.subscribe(message => this.TopListScreen = message) 
    this.data.currentChooseModeScreen.subscribe(message => this.ChooseModeScreen = message) 	 
  	this.data.currentTenderScreen.subscribe(message => this.TenderScreen = message)
    this.data.currentPracticeMode.subscribe(message => this.PracticeMode = message)
  	this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
	  this.data.currentIsDisabledArray.subscribe(message => this.IsDisabledArray = message)
    this.makeqService.getQuestions().subscribe(questions => this.questions = questions);
  }
  
  /** Function activates when user choose to play as tender player */
  tenderGame(){
    this.data.showChooseModeScreen(false)
    this.data.showTenderScreen(true)
  }

  /** Function activates when user choose to play classic Visoki napon quiz */
  fullGame(){
	  
	  var i = 0
      
   	for(const item of this.questions ){
      this.CategoryArray[i] = item["category"]
      // this.Ids[i]=item["id"]
      this.QTextArray[i] = item["text"]
	    this.IsDisabledArray[i] = false
      i++ 
	  }	

    this.data.changeCategoryArray(this.CategoryArray)
    this.data.changeQTextArray(this.QTextArray)	
    this.data.changeIsDisabledArray(this.IsDisabledArray)

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
    this.data.changeusedTenderHelp(false)
    this.data.changeGameOver(true)
    this.data.changeBackToChoosingModeBoolean(false)
    this.data.showChooseModeScreen(false)
    this.data.showQuestionsScreen(true)
  }

  /** Function shows top list of players */
  showTopList() {
    this.data.changeBackToChoosingModeBoolean(true)
    this.data.showChooseModeScreen(false)
    this.data.showTopListScreen(true)
  }
}

