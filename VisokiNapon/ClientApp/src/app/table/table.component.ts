import { DataService } from '../data.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  Screen1 : boolean
  Screen2 : boolean
  Screen3 : boolean
  Screen4 : boolean
  Screen5 : boolean
  
  Number : number
  CategoryArray : Array<number>
  QTextArray : Array<string>
  //QAnswerArray : Array<string>
  BooleanArray : Array<boolean>

  Indicator : boolean
  Counter : number
  flag : boolean = false
  Price : number
  Round : number
  Field : number
  counter : number
  case : number = 0
  Correct : boolean
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
    this.data.currentPrice.subscribe(message => this.Price = message)
    this.data.currentcounter.subscribe(message => this.counter = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentRound.subscribe(message => this.Round = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
  }


  
  processClick(i: number){
    console.log(i+1)
    this.BooleanArray[i]=true
    this.data.changeBooleanArray(this.BooleanArray)
    if(this.Indicator==true){  //slucaj kada korisnik bira pitanje na koje odgovara
      this.Indicator = false
      this.data.changeIndicator(this.Indicator)
      this.counter++
      this.data.changecounter(this.counter)
      this.Number = i
      this.data.changeQNumber(this.Number)
      this.Price = this.CategoryArray[this.Number]*10000
      this.data.changePrice(this.Price)
      this.CategoryArray[i]=this.CategoryArray[i]-5
      this.data.changeCategoryArray(this.CategoryArray)
      this.flag = false
      this.data.changeScreen3(false)
      this.data.changeScreen4(true)
      
                                    
    }
    else if(this.Round - this.counter - 1 < 0 && this.Counter == 0){ //otvara 5 polja // 4 polja
      for(var i = 0; i < this.Field; i++){
        this.BooleanArray[i] = !this.BooleanArray[i];             //promeni omogucene/onemogucene dugmice
        this.data.changeBooleanArray(this.BooleanArray);
      }
      this.flag= true
      this.Counter=0
      this.data.changeCounter(this.Counter)
      this.Indicator=true
      this.data.changeIndicator(this.Indicator)
    }
    else if(this.Counter == (this.Round-this.counter-1)){                           //otvara peto polje
      for(var i =0;i<this.Field;i++){
        this.BooleanArray[i]=!this.BooleanArray[i];             //promeni omogucene/onemogucene dugmice
        this.data.changeBooleanArray(this.BooleanArray);
      }
      this.flag= true
      this.Counter=0
      this.data.changeCounter(this.Counter)
      this.Indicator=true
      this.data.changeIndicator(this.Indicator)
    }
    else{
      this.Counter++
      this.data.changeCounter(this.Counter)
    }                                                       
  }
}


