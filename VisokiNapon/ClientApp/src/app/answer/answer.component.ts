import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CountdownModule } from 'ngx-countdown';


/*const HttpUploadOptions = {
  headers: new HttpHeaders({ "Accept": "application/json" })
}*/

@Component({
  selector:    'app-answer',
  templateUrl: './answer.component.html',
  styleUrls:   ['./answer.component.css']
})


export class AnswerComponent implements OnInit{

  Screen1                  : boolean
  Screen2                  : boolean
  Screen3                  : boolean
  Screen4                  : boolean
  Screen5                  : boolean

  Number                   : number               /*** Number - ****/
  BooleanArray             : Array<boolean>       /*** BooleanArray - array which elements indicates whether the question is opend or not ****/
  CategoryArray            : Array<number>        /*** CategoryArray - array with categories which questions belong ****/
  QTextArray               : Array<string>        /*** QTextArray - array with text of questions ***/
  //QAnswerArray           : Array<string>        /*** ***/
  ValueOfQuestion          : number     
  Sum                      : number               /*** Sum - how much money did player earn ***/
  GameOver                 : boolean = true       /*** indicates whether the player can write in the text field for ansewer ***/ 
  usedReplaceQuestionHelp1 : boolean              /*** indicates whether the player used the first replace question help ***/
  usedReplaceQuestionHelp2 : boolean              /*** indicates whether the player used the second replace question help ***/ 
  NumberOfQuestionPerRound : number               /***  ***/
  Field                    : number               /***  ***/
  counterPerRound          : number               /*** counts how much questions has the player opend in current round ***/
  GuaranteedSum            : number               /***  ***/
  EndOfGame                : number               /*** when EndOfGame becomes 16 it means that player answers on all questions ***/
  Correct                  : boolean              /*** tells whether to hide label in html or not ***/   

  response                 : any
  
  constructor(private data : DataService, private http: HttpClient) { }
  
  async timer(delay: number) {
    return new Promise(r => {
        setTimeout(r, delay);
    })
  }

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
    this.data.currentValueOfQuestion.subscribe(message => this.ValueOfQuestion = message);
    this.data.currentcounterPerRound.subscribe(message => this.counterPerRound = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentNumberOfQuestionPerRound.subscribe(message => this.NumberOfQuestionPerRound = message);
    this.data.currentGuaranteedSum.subscribe(message => this.GuaranteedSum = message);
    this.data.currentEndOfGame.subscribe(message => this.EndOfGame = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);

    this.data.currentusedReplaceQuestionHelp1.subscribe(message => this.usedReplaceQuestionHelp1 = message);
    this.data.currentusedReplaceQuestionHelp2.subscribe(message => this.usedReplaceQuestionHelp2 = message);
  }

  /*** 
   * When player enters his answer this funcition is called
   * Arguments:
   *      value : string  -  text of question on which player answers
  ***/
  checkAnswer(value : string): void {
    var obj = {
      tex: this.QTextArray[this.Number],
      ans: value
    }

    //const body = JSON.stringify(obj);
    
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.post('/api/v3/answer/', obj, {
            headers: headerOptions
    }).subscribe(async t => {console.log("solution ", t, " ", typeof(t)) 
    
    this.response = t
    
    //var obj = JSON.parse(this.response)
    //var bool_value = this.response == "true" ? true : false
    /*
    //this.cat = this.CategoryArray[this.Number]
    var formData: FormData = new FormData();
    //formData.append('text', this.QTextArray[this.Number])
    formData.append('ans',this.ans)
    //formData.set('cat', String(this.Number))
*/
    if(this.response == true){
      for(var i = 0; i < this.Field; i++){
        console.log("Field tralala:" + this.Field +  " "  + i)
        console.log("i:" + i)
        this.BooleanArray[i] = false;             
      }this.data.changeBooleanArray(this.BooleanArray);
      
      /* 
       All questions on witch player has answerd are deleting from CategoryArray.  
      */
      if(this.counterPerRound == this.NumberOfQuestionPerRound){  

        for(var i = this.Field - 1; i >= 0; i--){
          if(this.CategoryArray[i] < 0)
            this.data.removeFromArray(i)
        }

        /* 
         If the number of the round became one, we are entering in one more round.
        */
        this.NumberOfQuestionPerRound--
        this.data.changeNumberOfQuestionPerRound(this.NumberOfQuestionPerRound)
        this.counterPerRound = 0
        this.data.changecounterPerRound(this.counterPerRound)
        if(this.NumberOfQuestionPerRound == 0)
          this.NumberOfQuestionPerRound = 1
      }

      this.Sum = this.Sum + this.ValueOfQuestion
      this.data.changeSum(this.Sum)
      this.EndOfGame++
      this.data.changeEndOfGame(this.EndOfGame)
      this.Correct = false
      this.data.changeCorrect(this.Correct)
      
      if(this.EndOfGame == 16){
        this.GameOver = false
        this.data.changeGameOver(this.GameOver)
        
        // After 5 seconds, player is returned to the homepage 
        await this.timer(5000);
        
        window.location.reload();
        //this.data.changeScreen4(false)
        //this.data.changeScreen1(true)
      }else{
        this.data.changeScreen4(false)
        this.data.changeScreen3(true)
      }
      
      if(this.counterPerRound == 0){ 
        this.GuaranteedSum = this.Sum
        this.data.changeGuaranteedSum(this.GuaranteedSum)
      }
    }
    else { /* case of wrong answer */
      this.GameOver = false
      this.data.changeGameOver(this.GameOver)
      this.Sum = 0
      this.data.changeSum(this.Sum)
      
      // After 5 seconds, player is returned to the homepage
      await this.timer(5000);
      
      window.location.reload();
      //this.data.changeScreen4(false)
      //this.data.changeScreen1(true)
    }})

  }

  /*** 
   * When player clicks on button for first replace question help, this funcition is called 
  ***/
  replaceQuestion1(){

    this.usedReplaceQuestionHelp1 = true
    this.data.changeusedReplaceQuestionHelp1(this.usedReplaceQuestionHelp2)

    var category = this.CategoryArray[this.Number]
    this.QTextArray[this.Number] = this.QTextArray[this.QTextArray.length - 6 + 2 * category - 1]
    this.data.changeQTextArray(this.QTextArray)
  }

  /*** 
   * When player clicks on button for second replace question help, this funcition is called 
  ***/
  replaceQuestion2(){

    this.usedReplaceQuestionHelp2 = true
    this.data.changeusedReplaceQuestionHelp2(this.usedReplaceQuestionHelp2)
    
    var category = this.CategoryArray[this.Number]
    this.QTextArray[this.Number] = this.QTextArray[this.QTextArray.length - 6 + 2 * category]
    this.data.changeQTextArray(this.QTextArray)
  }

  tender(){



  }
}