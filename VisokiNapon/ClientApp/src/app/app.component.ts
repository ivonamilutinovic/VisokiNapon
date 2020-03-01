import { Component } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Visoki Napon';
  WelcomeScreen       : boolean
  LogInScreen         : boolean
  QuestionsScreen     : boolean
  AnsweringScreen     : boolean
  SignUpScreen        : boolean
  TopListScreen       : boolean
  ChooseModeScreen    : boolean
  TenderScreen        : boolean

  constructor(private data: DataService) { }
  
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
