import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

// const httpOpt = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Accept': 'application/json, text/plain'
//   })
// };


@Component({
    selector:    'app-tender',
    templateUrl: './tender.component.html',
    styleUrls:   ['./tender.component.css']
})

export class TenderComponent implements OnInit {
   
  WelcomeScreen                       : boolean
  LogInScreen                         : boolean
  QuestionsScreen                     : boolean
  AnsweringScreen                     : boolean
  SignUpScreen                        : boolean
  TopListScreen                       : boolean
  ChooseModeScreen                    : boolean
  TenderScreen                        : boolean
  
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
  }

}
