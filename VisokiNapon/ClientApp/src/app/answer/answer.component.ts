import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CountdownModule } from 'ngx-countdown';
import {Observable} from 'rxjs';
import { MakeqService } from '../makeq.service';
import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel} from '@aspnet/signalr';

// const HttpUploadOptions = {
//   headers: new HttpHeaders({ "Accept": "application/json" })
// }

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})


export class AnswerComponent implements OnInit {

  WelcomeScreen                        : boolean
  LogInScreen                          : boolean
  QuestionsScreen                      : boolean
  AnsweringScreen                      : boolean
  SignUpScreen                         : boolean
  TopListScreen                        : boolean
  ChooseModeScreen                     : boolean
  TenderScreen                         : boolean

  Number                               : number               /*** Number - ****/
  IsDisabledArray                      : Array<boolean>       /*** IsDisabledArray - array which elements indicates whether the question is opend or not ****/
  CategoryArray                        : Array<number>        /*** CategoryArray - array with categories which questions belong ****/
  QTextArray                           : Array<string>        /*** QTextArray - array with text of questions ***/
  // QAnswerArray                      : Array<string>        /*** ***/
  ValueOfQuestion                      : number
  Sum                                  : number               /*** Sum - how much money did player earn ***/
  GameOver                             : boolean = true       /*** indicates whether the player can write in the text field for ansewer ***/
  usedReplaceQuestionHelp1             : boolean              /*** indicates whether the player used the first replace question help ***/
  usedReplaceQuestionHelp2             : boolean              /*** indicates whether the player used the second replace question help ***/
  NumberOfQuestionPerRound             : number               /***  ***/
  Field                                : number               /***  ***/
  counterPerRound                      : number               /*** counts how much questions has the player opend in current round ***/
  GuaranteedSum                        : number               /***  ***/
  EndOfGame                            : number               /*** when EndOfGame becomes 16 it means that player answers on all questions ***/
  Correct                              : boolean              /*** tells whether to hide label in html or not ***/

  response                             : any

  helps                                : boolean = true       /*** ability of using helps ***/
  timeBool                             : any				          /*** boolean for operations with time and action on time ***/
  infoBool                             : any	        			  /*** boolean for operations with time and action on time ***/
  help1                                : boolean = false      /*** tells whether timer to use in combination with help1  ***/
  help2                                : boolean = false      /*** tells whether timer to use in combination with help2  ***/
  video_id                             : string			      	  /*** youtube video id ***/
  trimedQuestion                       : string     				  /*** Text of question when Visoki Napon field is choosen ***/
  public show                          : boolean = true   	  /*** tells whether to show youtube clip in html or not ***/
  youtube                              : boolean = false      /*** tells whether Visoki napon field was choosen  ***/
  
  PracticeMode                         : boolean
  TopList                              : any[]
  CurrentUser                          : string

  hubConnection                        : HubConnection
  TenderHelp                           : boolean = false
  usedTenderHelp                       : boolean = false 


  constructor(private data: DataService, private http: HttpClient, private makeqService : MakeqService) { }

  async timer(delay: number) {
    return new Promise(r => {
      setTimeout(r, delay);
    })
  }

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
    // this.data.QAnswerArray.subscribe(message => this.QAnswerArray = message)
    this.data.currentSum.subscribe(message => this.Sum = message)
    this.data.currentIsDisabledArray.subscribe(message => this.IsDisabledArray = message)
    this.data.currentValueOfQuestion.subscribe(message => this.ValueOfQuestion = message);
    this.data.currentcounterPerRound.subscribe(message => this.counterPerRound = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentNumberOfQuestionPerRound.subscribe(message => this.NumberOfQuestionPerRound = message);
    this.data.currentGuaranteedSum.subscribe(message => this.GuaranteedSum = message);
    this.data.currentEndOfGame.subscribe(message => this.EndOfGame = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
  
    this.data.currentusedReplaceQuestionHelp1.subscribe(message => this.usedReplaceQuestionHelp1 = message);
    this.data.currentusedReplaceQuestionHelp2.subscribe(message => this.usedReplaceQuestionHelp2 = message);
  
    this.data.currentPracticeMode.subscribe(message => this.PracticeMode = message);
    this.data.currentUser.subscribe(message => this.CurrentUser = message);

    this.TenderHelp = false
    this.data.currentusedTenderHelp.subscribe(message => this.usedTenderHelp = message);

    this.hubConnection = new HubConnectionBuilder().configureLogging(LogLevel.Debug).withUrl("/chatHub", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();

    this.hubConnection
    .start()
    .then(() => console.log("Connection Started!"))
    .catch(err => console.log("Error while establishing a connection :( "));

    if (this.QTextArray[this.Number].indexOf("#!!#") >= 0) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      this.video_id = this.QTextArray[this.Number].substring(0, this.QTextArray[this.Number].indexOf("#!!#"))
      this.trimedQuestion = this.QTextArray[this.Number].substring(this.QTextArray[this.Number].indexOf("#!!#") + 4)
      this.show = false;
      this.youtube = true;


      setTimeout(function () {
        this.show = true;
        this.helps = false;
        this.timeBool = setTimeout(function () {
        this.GameOver = false
        this.data.changeGameOver(this.GameOver)
        this.Sum = 0
        this.data.changeSum(this.Sum)

        // After 5 seconds, player is returned to the homepage
        this.infoBool = setTimeout(function () {
          this.data.showAnsweringScreen(false)
          this.data.showWelcomeScreen(true)
          }.bind(this), 5000);
        }.bind(this), 25000);
      }.bind(this), 40000);
    }
    else {
      this.timeBool = setTimeout(function () {
        this.GameOver = false
        this.data.changeGameOver(this.GameOver)
        this.Sum = 0
        this.data.changeSum(this.Sum)
        this.helps = false;

        // After 5 seconds, player is returned to the homepage
        this.infoBool = setTimeout(function () {
          this.data.showAnsweringScreen(false)
          this.data.showWelcomeScreen(true)
        }.bind(this), 5000);
      }.bind(this), 25000);
    }
  }

  /*** 
   * When player enters his answer this funcition is called
   * Arguments:
   *      value : string  -  text of question on which player answers
  ***/
  checkAnswer(value: string): void {
    var obj = {
      tex: this.QTextArray[this.Number],
      ans: value
    }

    // const body = JSON.stringify(obj);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('/api/v3/answer/', obj, {
      headers: headerOptions
    }).subscribe(async t => {
      console.log("solution ", t, " ", typeof (t))

      this.response = t

      // var obj = JSON.parse(this.response)
      // var bool_value = this.response == "true" ? true : false
      
      // this.cat = this.CategoryArray[this.Number]
      // var formData: FormData = new FormData();
      // formData.append('text', this.QTextArray[this.Number])
      // formData.append('ans',this.ans)
      // formData.set('cat', String(this.Number))

      if (this.response == true) {
        
        for (var i = 0; i < this.Field; i++)
          this.IsDisabledArray[i] = false;
        this.data.changeIsDisabledArray(this.IsDisabledArray);

        /* 
         All questions on witch player has answerd are deleting from CategoryArray.  
        */
        if (this.counterPerRound == this.NumberOfQuestionPerRound) {  
          for (var i = this.Field - 1; i >= 0; i--)
            if (this.CategoryArray[i] < 0)
              this.data.removeFromArray(i)
          
          /* 
           If the number of the round became one, we are entering in one more round.
          */
          this.NumberOfQuestionPerRound--
          this.data.changeNumberOfQuestionPerRound(this.NumberOfQuestionPerRound)
          this.counterPerRound = 0
          this.data.changecounterPerRound(this.counterPerRound)
          if (this.NumberOfQuestionPerRound == 0)
            this.NumberOfQuestionPerRound = 1
        }

        clearTimeout(this.infoBool)
        clearTimeout(this.timeBool)

        if (this.QTextArray[this.Number].indexOf("#!!#") >= 0)
          this.Sum = this.Sum * 2
        else
          this.Sum = this.Sum + this.ValueOfQuestion
          this.data.changeSum(this.Sum)
          this.EndOfGame++
          this.data.changeEndOfGame(this.EndOfGame)
          this.Correct = false
          this.data.changeCorrect(this.Correct)

        /* Case when the competitor wins */
        if (this.EndOfGame == 16) {
          console.log("end of a game");
          this.GameOver = false
          this.GuaranteedSum = this.Sum
          this.data.changeGameOver(this.GameOver)
          this.helps = false
          this.help1 = false
          this.help2 = false
          clearTimeout(this.infoBool)
          clearTimeout(this.timeBool)

          // Changing the screen after 3 seconds
          await this.timer(3000);
          
          // showing the top list if the user is logged in and its new score is in the top list
          if(!this.PracticeMode){
            
            this.http.post('/api/v3/updateTopList',{username: this.CurrentUser, maxAmount: this.GuaranteedSum}, {
                    headers: headerOptions
            }).subscribe(async t1 => {

              if(t1 == true){
                // we are showing the top list because the player is in the top 20
                this.data.showAnsweringScreen(false)
                this.data.showTopListScreen(true)
              }else{
                this.data.showAnsweringScreen(false)
                this.data.showWelcomeScreen(true)
              }
            })
            
          }
          else{
            this.data.showAnsweringScreen(false)
            this.data.showWelcomeScreen(true)
          }
          
        }else {
          this.data.showAnsweringScreen(false)
          this.data.showQuestionsScreen(true)
        }

        if (this.counterPerRound == 0) {
          this.GuaranteedSum = this.Sum
          this.data.changeGuaranteedSum(this.GuaranteedSum)
        }
      }
      else { /* case of wrong answer */
        this.GameOver = false
        this.data.changeGameOver(this.GameOver)
        this.Sum = this.GuaranteedSum
        this.data.changeSum(this.Sum)
        this.helps = false
        this.help1 = false
        this.help2 = false
        clearTimeout(this.infoBool)
        clearTimeout(this.timeBool)

        // Changing the screen after 3 seconds
        await this.timer(3000);

        // showing the top list if the user is logged in and its new score is in the top list
        if(!this.PracticeMode){
          this.http.post('/api/v3/updateTopList', {username: this.CurrentUser, maxAmount: this.GuaranteedSum}, {
                  headers: headerOptions
          }).subscribe(async t2 => {

            if(t2 == true){
              // we are showing the top list because the player is in the top 20
              this.data.showAnsweringScreen(false)
              this.data.showTopListScreen(true)
            }else{
              this.data.showAnsweringScreen(false)
              this.data.showWelcomeScreen(true)
            }
          })
          
        }
        else{
          this.data.showAnsweringScreen(false)
          this.data.showWelcomeScreen(true)
        }
      }
    })
  }

  /*** 
   * When player clicks on button for first replace question help, this funcition is called 
  ***/
  replaceQuestion1() {

    this.usedReplaceQuestionHelp1 = true
    this.data.changeusedReplaceQuestionHelp1(this.usedReplaceQuestionHelp1)

    this.help1 = true

    var category = this.CategoryArray[this.Number]
    this.QTextArray[this.Number] = this.QTextArray[this.QTextArray.length - 6 + 2 * category - 1]
    this.data.changeQTextArray(this.QTextArray)

    clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)

    this.timeBool = setTimeout(function () {
      this.GameOver = false
      this.data.changeGameOver(this.GameOver)
      this.Sum = 0
      this.data.changeSum(this.Sum)
      this.helps = false;

      // After 5 seconds, player is returned to the homepage
      this.infoBool = setTimeout(function () {
        this.data.showAnsweringScreen(false)
        this.data.showWelcomeScreen(true)
      }.bind(this), 5000);
    }.bind(this), 25000);
  }

  /*** 
   * When player clicks on button for second replace question help, this funcition is called 
  ***/
  replaceQuestion2() {

    this.usedReplaceQuestionHelp2 = true
    this.data.changeusedReplaceQuestionHelp2(this.usedReplaceQuestionHelp2)

    this.help2 = true

    var category = this.CategoryArray[this.Number]
    this.QTextArray[this.Number] = this.QTextArray[this.QTextArray.length - 6 + 2 * category]
    this.data.changeQTextArray(this.QTextArray)

    clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)

    this.timeBool = setTimeout(function () {
      this.GameOver = false
      this.data.changeGameOver(this.GameOver)
      this.Sum = 0
      this.data.changeSum(this.Sum)
      this.helps = false;

      // After 5 seconds, player is returned to the homepage
      this.infoBool = setTimeout(function () {
        this.data.showAnsweringScreen(false)
        this.data.showWelcomeScreen(true)
      }.bind(this), 5000);
    }.bind(this), 25000);
  }

  tender() {

    clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)

    this.TenderHelp = true;
    var questionMessage = (document.getElementById("questionId") as HTMLInputElement).innerText;
    var questionValueMessage = (document.getElementById("questionValueId") as HTMLInputElement).innerText;
    console.log("answer.ts: logovano: " + questionMessage + questionValueMessage)
    this.hubConnection.invoke("SendMessageVN2Tender", this.CurrentUser, questionMessage, questionValueMessage).catch(function (err) {
      return console.error(err.toString());
    });

    
    var vnUser = this.CurrentUser
    this.hubConnection.on("ReceiveMessageTender2VN", function (tenderPlayerUsername, vnPlayerUsername, answerMessage, requestedAmount) {
      var answerMsg = answerMessage.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      
      if(vnPlayerUsername === vnUser){
        document.getElementById("tenderHelpUsernameArrivedId").innerHTML = tenderPlayerUsername;
        document.getElementById("tenderHelpRequestedSumArrivedId").innerHTML = requestedAmount;
      }
    });

    this.usedTenderHelp = true;
    this.data.changeusedTenderHelp(this.usedTenderHelp);
  }
}
