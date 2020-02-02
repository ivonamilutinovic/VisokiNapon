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

  WelcomeScreen                       : boolean
  LogInScreen                         : boolean
  QuestionsScreen                     : boolean
  AnsweringScreen                     : boolean
  SignUpScreen                        : boolean
  TopListScreen                       : boolean
  ChooseModeScreen                    : boolean
  TenderScreen                        : boolean
  
  PracticeMode                        : boolean = false

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
  }
  
  tenderGame(){
    this.data.showChooseModeScreen(false)
    this.data.showTenderScreen(true)
  }

  fullGame(){
    this.data.changeBackToChoosingModeBoolean(false)
    this.data.showChooseModeScreen(false)
    this.data.showQuestionsScreen(true)
  }

  showTopList() {
    this.data.changeBackToChoosingModeBoolean(true)
    this.data.showChooseModeScreen(false)
    this.data.showTopListScreen(true)
  }

}

