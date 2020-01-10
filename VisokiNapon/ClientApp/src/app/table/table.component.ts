import { DataService } from '../data.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {
  
  Screen1                          : boolean
  Screen2                          : boolean
  Screen3                          : boolean
  Screen4                          : boolean
  Screen5                          : boolean
  
  Number                           : number
  CategoryArray                    : Array<number>
  QTextArray                       : Array<string>
  //QAnswerArray                   : Array<string>
  BooleanArray                     : Array<boolean>

  Indicator                        : boolean
  Counter                          : number
  flag                             : boolean = false
  ValueOfQuestion                  : number
  NumberOfQuestionPerRound         : number
  Field                            : number
  counterPerRound                  : number
  case                             : number = 0
  Correct                          : boolean

  constructor(private data : DataService) { }
  
  ngOnInit() {
    this.data.currentScreen1.subscribe(message => this.Screen1 = message)
    this.data.currentScreen2.subscribe(message => this.Screen2 = message)
    this.data.currentScreen3.subscribe(message => this.Screen3 = message)
    this.data.currentScreen4.subscribe(message => this.Screen4 = message)
	  this.data.currentScreen5.subscribe(message => this.Screen5 = message)
    this.data.currentQNumber.subscribe(message => this.Number = message)
    this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
    //this.data.NizOdgovoraM.subscribe(message => this.Odgovori = message)
    this.data.currentBooleanArray.subscribe(message => this.BooleanArray = message)
    this.data.currentIndicator.subscribe(message => this.Indicator = message)
    this.data.currentCounter.subscribe(message => this.Counter = message)
    this.data.currentValueOfQuestion.subscribe(message => this.ValueOfQuestion = message)
    this.data.currentcounterPerRound.subscribe(message => this.counterPerRound = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentNumberOfQuestionPerRound.subscribe(message => this.NumberOfQuestionPerRound = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
  }
  
  processClick(i: number){
    
    this.BooleanArray[i] = true                       // player clicked on button
    this.data.changeBooleanArray(this.BooleanArray) 
    if(this.Indicator == true){                       // case when user choose to answer on question
      this.Indicator = false
      this.data.changeIndicator(this.Indicator)
      
      this.counterPerRound++
      this.data.changecounterPerRound(this.counterPerRound)
      
      this.Number = i                                // Number gets order number of question in arrays
      this.data.changeQNumber(this.Number)
      
      this.ValueOfQuestion = this.CategoryArray[this.Number] * 10000
      this.data.changeValueOfQuestion(this.ValueOfQuestion)
      
      this.CategoryArray[i] = -1                   // we set CategoryArray[i] when user choosed to answer on ith question 
      this.data.changeCategoryArray(this.CategoryArray)
      
      this.flag = false                           
      
      this.data.changeScreen3(false)
      this.data.changeScreen4(true)  
    }

    /* the player enters in new round */
    else if(this.NumberOfQuestionPerRound - this.counterPerRound - 1 < 0 && this.Counter == 0){
      for(var i = 0; i < this.Field; i++)
        this.BooleanArray[i] = !this.BooleanArray[i];
      this.data.changeBooleanArray(this.BooleanArray);

      this.flag = true
      this.Counter = 0
      this.data.changeCounter(this.Counter)
      
      this.Indicator = true
      this.data.changeIndicator(this.Indicator)
    }

    /* case when user opens the last question in that round */
    else if(this.Counter == (this.NumberOfQuestionPerRound - this.counterPerRound - 1)){            
      for(var i = 0; i < this.Field; i++)
        this.BooleanArray[i] = !this.BooleanArray[i];
      this.data.changeBooleanArray(this.BooleanArray);

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
