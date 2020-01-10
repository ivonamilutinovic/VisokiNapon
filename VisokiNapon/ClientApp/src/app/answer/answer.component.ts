import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

/*const HttpUploadOptions = {
  headers: new HttpHeaders({ "Accept": "application/json" })
}*/

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})


export class AnswerComponent implements OnInit {

  Screen1 : boolean
  Screen2 : boolean
  Screen3 : boolean
  Screen4 : boolean
  Screen5 : boolean

  Number : number
  BooleanArray : Array<boolean>
  CategoryArray : Array<number>
  QTextArray : Array<string>
  //QAnswerArray : Array<string>
  Price : number
  Sum : number
  wrong : boolean = true
  Round : number
  Field : number
  counter : number
  GuaranteedSum : number
  End : number
  Correct : boolean

  response : any
  constructor(private data : DataService, private http: HttpClient) { }
  
  ngOnInit() {
    this.data.currentScreen1.subscribe(message => this.Screen1 = message)
    this.data.currentScreen2.subscribe(message => this.Screen2 = message)
    this.data.currentScreen3.subscribe(message => this.Screen3 = message)
    this.data.currentScreen4.subscribe(message => this.Screen4 = message)
	this.data.currentScreen5.subscribe(message => this.Screen5 = message)
    this.data.currentQNumber.subscribe(message => this.Number = message)
    this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
    //this.data.QAnswerArray.subscribe(message => this.QAnswerArray = message)
    this.data.currentSum.subscribe(message => this.Sum = message)
    this.data.currentBooleanArray.subscribe(message => this.BooleanArray = message)
    this.data.currentPrice.subscribe(message => this.Price = message);
    this.data.currentcounter.subscribe(message => this.counter = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentRound.subscribe(message => this.Round = message);
    this.data.currentGuaranteedSum.subscribe(message => this.GuaranteedSum = message);
    this.data.currentEnd.subscribe(message => this.End = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
  }

  
  checkAnswer(value : string): void {
    
    var obj = {
       tex: this.QTextArray[this.Number],
       ans: value
      }
    //const body = JSON.stringify(obj);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('/api/v3/answer/', obj, {
            headers: headerOptions
    }).subscribe(t=> {console.log("resenje ",t," ", typeof(t)) 
    this.response =t
    //var obj = JSON.parse(this.response)
    //var bool_value = this.response == "true" ? true : false
    /*
    //this.cat = this.CategoryArray[this.Number]
    var formData: FormData = new FormData();
    //formData.append('text', this.QTextArray[this.Number])
    formData.append('ans',this.ans)
    //formData.set('cat', String(this.Number))
*/
    if(this.response== true){
      for(var i =0; i<this.Field; i++){
        this.BooleanArray[i]=false;             
        this.data.changeBooleanArray(this.BooleanArray);
      }
      if(this.counter==this.Round){            //Brisu se izvucena polja, ide se na sledeci krug
                                              //kad Krug bude 1 treba da ga dva puta odradi
        for(var i =this.Field-1; i>=0; i--){
          if(this.CategoryArray[i]<0)
            this.data.removeFromArray(i)
        }
        this.Round--
        this.data.changeRound(this.Round)
        this.counter=0
        this.data.changecounter(this.counter)
        if(this.Round==0)
          this.Round=1
      }

      this.Sum= this.Sum + this.Price
      this.data.changeSum(this.Sum)
      this.End++
      this.data.changeEnd(this.End)
      this.Correct=false
      this.data.changeCorrect(this.Correct)
      if(this.End==16)
        this.wrong=false
        else{
      this.data.changeScreen4(false)
      this.data.changeScreen3(true)
      }
      if(this.counter==0){ 
        this.GuaranteedSum= this.Sum
        this.data.changeGuaranteedSum(this.GuaranteedSum)
      }
    }
    else {
      this.wrong = false
      this.Sum=0;
      this.data.changeSum(this.Sum);
    }}) 
  }
}