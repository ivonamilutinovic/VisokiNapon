import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

/** Auxiliary structure for generating top list */
interface topListStruct{
  /** Players username */
  username : string;
  /** Players max amount won */
  maxAmount: number;
}

@Component({
    selector      : 'app-toplist',
    templateUrl   : './toplist.component.html',
    styleUrls     : ['./toplist.component.css']
})


export class ToplistComponent implements OnInit {
    
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
  /** Indicator for redirecting user to the screen from which he came. 
   *  Explanation: There are only two ways to enter to the TopList screen -
   *  after the game is over and user's score is placed in the
   *  top list or from button 'Top lista' from ChoosingMode screen.
  */
  BackToChoosingModeBoolean   	    	: boolean = true 
  /** Server's answer on request for getting top list */
  TopList                             : any
  /** Array of players from the top list */
  BestCompetitorsArray                : Array<topListStruct>
  
  
  constructor(private data: DataService, private makeqService: MakeqService, private http: HttpClient) {
    this.TopList = []
    this.BestCompetitorsArray = [{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},
    {username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},
    {username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},
    {username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0},{username: "",maxAmount:0}];  

   }
  
  async ngOnInit() {
  
    this.data.currentWelcomeScreen.subscribe(message => this.WelcomeScreen = message)
    this.data.currentLogInScreen.subscribe(message => this.LogInScreen = message)
    this.data.currentQuestionsScreen.subscribe(message => this.QuestionsScreen = message)
    this.data.currentAnsweringScreen.subscribe(message => this.AnsweringScreen = message)
    this.data.currentSignUpScreen.subscribe(message => this.SignUpScreen = message) 
    this.data.currentTopListScreen.subscribe(message => this.TopListScreen = message) 
    this.data.currentChooseModeScreen.subscribe(message => this.ChooseModeScreen = message) 	 
    this.data.currentTenderScreen.subscribe(message => this.TenderScreen = message)
    this.data.currentBackToChoosingModeBoolean.subscribe(message => this.BackToChoosingModeBoolean = message)
    
    this.GetTopList();
  }

  /** Function gets top list of players from server */
  GetTopList(){
    
    this.http.get('/api/v3/toplist').subscribe(result => {this.TopList = result
    
      var i = 0
      for(const item of this.TopList){
        this.BestCompetitorsArray[i].username = item["username"]
        this.BestCompetitorsArray[i].maxAmount = item["maxAmount"]
        i++
      }    
    })    
  }

  /** Function redirects player to appropriate screen (component) */
  backToPriviousScreen(){
    if(this.data.currentBackToChoosingModeBoolean){
      this.data.showTopListScreen(false)
      this.data.showChooseModeScreen(true)
    }else{
      this.data.showTopListScreen(false)
      this.data.showWelcomeScreen(true)
    }
  }
}
