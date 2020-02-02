import { DataService } from '../data.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  
  WelcomeScreen                       : boolean
  LogInScreen                         : boolean
  QuestionsScreen                     : boolean
  AnsweringScreen                     : boolean
  SignUpScreen                        : boolean
  TopListScreen                       : boolean
  ChooseModeScreen                    : boolean
  TenderScreen                        : boolean
  
  Number                              : number
  CategoryArray                       : Array<number>
  QTextArray                          : Array<string>
  // QAnswerArray                     : Array<string>
  IsDisabledArray                     : Array<boolean>
  
  Indicator                           : boolean
  Counter                             : number
  flag                                : boolean = false
  ValueOfQuestion                     : number
  NumberOfQuestionPerRound            : number
  Field                               : number
  counterPerRound                     : number
  Correct                             : boolean

  constructor(private data : DataService) {}
  
  ngOnInit() {
    this.data.currentWelcomeScreen.subscribe(message => this.WelcomeScreen = message)
    this.data.currentLogInScreen.subscribe(message => this.LogInScreen = message)
    this.data.currentQuestionsScreen.subscribe(message => this.QuestionsScreen = message)
    this.data.currentAnsweringScreen.subscribe(message => this.AnsweringScreen = message)
    this.data.currentSignUpScreen.subscribe(message => this.SignUpScreen = message) 
    this.data.currentTopListScreen.subscribe(message => this.TopListScreen = message) 
    this.data.currentChooseModeScreen.subscribe(message => this.ChooseModeScreen = message) 	 
    this.data.currentTenderScreen.subscribe(message => this.TenderScreen = message)
    this.data.currentQNumber.subscribe(message => this.Number = message)
    this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
    // this.data.NizOdgovoraM.subscribe(message => this.Odgovori = message)
    this.data.currentIsDisabledArray.subscribe(message => this.IsDisabledArray = message)
    this.data.currentIndicator.subscribe(message => this.Indicator = message)
    this.data.currentCounter.subscribe(message => this.Counter = message)
    this.data.currentValueOfQuestion.subscribe(message => this.ValueOfQuestion = message)
    this.data.currentcounterPerRound.subscribe(message => this.counterPerRound = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentNumberOfQuestionPerRound.subscribe(message => this.NumberOfQuestionPerRound = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
  }
  
  processClick(i: number){
    
    this.IsDisabledArray[i] = true                    // player clicked on button
    this.data.changeIsDisabledArray(this.IsDisabledArray) 

    if(this.Indicator == true){                       // case when user choose to answer on question
      this.Indicator = false
      this.data.changeIndicator(this.Indicator)
      
      this.counterPerRound++
      this.data.changecounterPerRound(this.counterPerRound)
      
      this.Number = i                                // Number gets order number of question in arrays
      this.data.changeQNumber(this.Number)
      
      this.ValueOfQuestion = this.CategoryArray[this.Number] * 10000
      this.data.changeValueOfQuestion(this.ValueOfQuestion)
      
      this.CategoryArray[i] = -1                     // we set CategoryArray[i] when user choosed to answer on ith question 
      this.data.changeCategoryArray(this.CategoryArray)
      
      this.flag = false                           
      
      this.data.showQuestionsScreen(false)
      this.data.showAnsweringScreen(true)  
    }

    /* the player enters in new round */
    else if(this.NumberOfQuestionPerRound - this.counterPerRound - 1 < 0 && this.Counter == 0){
      for(var i = 0; i < this.Field; i++)
        this.IsDisabledArray[i] = !this.IsDisabledArray[i];
      this.data.changeIsDisabledArray(this.IsDisabledArray);

      this.flag = true
      this.Counter = 0
      this.data.changeCounter(this.Counter)
      
      this.Indicator = true
      this.data.changeIndicator(this.Indicator)
    }

    /* case when user opens the last question in that round */
    else if(this.Counter == (this.NumberOfQuestionPerRound - this.counterPerRound - 1)){            
      for(var i = 0; i < this.Field; i++)
        this.IsDisabledArray[i] = !this.IsDisabledArray[i];
      this.data.changeIsDisabledArray(this.IsDisabledArray);

      this.flag = true
      this.Counter = 0
      this.data.changeCounter(this.Counter)
      
      this.Indicator = true
      this.data.changeIndicator(this.Indicator)
    }else{
      this.Counter++
      this.data.changeCounter(this.Counter)
    }                                                       
  }
}
