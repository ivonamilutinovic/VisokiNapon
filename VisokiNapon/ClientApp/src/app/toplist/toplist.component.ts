import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


// class topListStruct{
//   username : string;
//   maxAmount: number;

//   constructor(username: string = "", maxAmount: number = 0){
//     this.username = username
//     this.maxAmount = maxAmount
//   }
// }

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
    
  /*
   * :BackToChoosingModeBoolean: only two ways to enter in TopListScreen: after the game is over or from button from ChoosingModeScreen.
   *    This variable is talling us from witch screen we came so we can return back to that screen.
   */

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
  /** Indicator of redirecting screen */
  BackToChoosingModeBoolean   	    	: boolean = true 
  /** Servers answer on get top list request */
  TopList                             : any
  /** Array of players in top list */
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

  /** Function that get top list from server */
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

  /** Function that redirects to appropriate screen (component) */
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
