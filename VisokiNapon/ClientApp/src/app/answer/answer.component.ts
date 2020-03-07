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
  /** Index of current chosen question */
  Number                               : number              
  /** Array which elements indicating whether the question is opend or not */
  IsDisabledArray                      : Array<boolean>       
  /** Array with questions categories */
  CategoryArray                        : Array<number> 
  /** Array with text of questions */       
  QTextArray                           : Array<string>   
  // QAnswerArray                      : Array<string>  
  /** Contains information about value of question */
  ValueOfQuestion                      : number
  /** Contains information how much money did player earn */
  Sum                                  : number   
  /** Indicates whether the game is over */            
  GameNotOver                             : boolean = true     
  /** Indicates whether the player has used the first replace question help */ 
  usedReplaceQuestionHelp1             : boolean    
  /** Indicates whether the player has used the second replace question help */
  usedReplaceQuestionHelp2             : boolean  
  /** Contains information about number of questions in current round */            
  NumberOfQuestionPerRound             : number               
  /** Number of fields */
  Field                                : number               
  /** Counts how much questions has the player opened in current round */
  counterPerRound                      : number               
  /** Guaranteed sum that player will get */
  GuaranteedSum                        : number    
  /** Indicator whether the player answered on all questions */           
  EndOfGame                            : number 
  /** Tells whether to hide label in html or not */              
  Correct                              : boolean             

  /** Contains server's response */   
  response                             : any

  /** Ability of using helps */
  helps                                : boolean = true      
  
  /** Boolean for operations with time and action on time */
  timeBool                             : any	
  /** Boolean for operations with time and action on time */			          
  infoBool                             : any	        
  /** Tells whether to use timer in combination with help1 */			  
  help1                                : boolean = false
  /** Tells whether to use timer in combination with help2 */      
  help2                                : boolean = false  
  /** Contains youtube video id */    
  video_id                             : string	= ""
  /** Text of question when Visoki Napon field is choosen */		      	  
  trimedQuestion                       : string     	
  /** Indicates which div from html is shown */			  
  show                                 : boolean = true  
  /** Tells whether Visoki napon field was choosen */ 	  
  youtube                              : boolean = false     

  /** Tells whether timer for Visoki napon field is active or not */ 	  
  youtubeTime                          : boolean = false      
  
  /** Indicator whether PractiseMode is choosen or not */
  PracticeMode                         : boolean
  /** Server's response on players get top list request */
  TopList                              : any[]
  /** Username of current logged user */
  CurrentUser                          : string

  /** Hub conection for SignalR */
  hubConnection                        : HubConnection
  /** Indicates which div from html is shown */
  TenderHelp                           : boolean = false
  /** Indicates whether the player has used tender help */
  usedTenderHelp                       : boolean
  /** Indicates which div from html is shown */
  AcceptedOffer                        : boolean = false
  /** Indicates divs of tender player offers */
  DivIndex                             : number  = 1 
  
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
    this.data.currentGameNotOver.subscribe(message => this.GameNotOver = message)
    this.data.currentIsDisabledArray.subscribe(message => this.IsDisabledArray = message)
    this.data.currentValueOfQuestion.subscribe(message => this.ValueOfQuestion = message);
    this.data.currentcounterPerRound.subscribe(message => this.counterPerRound = message);
    this.data.currentField.subscribe(message => this.Field = message);
    this.data.currentNumberOfQuestionPerRound.subscribe(message => this.NumberOfQuestionPerRound = message);
    this.data.currentGuaranteedSum.subscribe(message => this.GuaranteedSum = message);
    this.data.currentEndOfGame.subscribe(message => this.EndOfGame = message);
    this.data.currentCorrect.subscribe(message => this.Correct = message);
  
    this.data.currentusedReplaceQuestionHelp1.subscribe(message => this.usedReplaceQuestionHelp1 = message);
    this.data.currentusedReplaceQuestionHelp2.subscribe(message => this.usedReplaceQuestionHelp2 = message);
  
    this.data.currentPracticeMode.subscribe(message => this.PracticeMode = message);
    this.data.currentUser.subscribe(message => this.CurrentUser = message);

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
        this.youtubeTime = true;
        this.show = true;
        this.helps = false;
        this.timeBool = setTimeout(function () {
          this.youtubeTime = false;
          this.GameNotOver = false
          this.data.changeGameNotOver(this.GameNotOver)
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
        this.GameNotOver = false
        this.data.changeGameNotOver(this.GameNotOver)
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

  /** Function for checking player's answer on server side - 
  * when player enters his answer, this funcition is called */
  checkAnswer(value: string){
    this.youtubeTime = false;  

    var obj = {
      tex: this.QTextArray[this.Number],
      ans: value
    }
    // const body = JSON.stringify(obj);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('/api/v3/answer/', obj, {
      headers: headerOptions
    }).subscribe(async t => {
      this.response = t

      // var obj = JSON.parse(this.response)
      // var bool_value = this.response == "true" ? true : false
      
      // this.cat = this.CategoryArray[this.Number]
      // var formthis.data: Formthis.data = new Formthis.data();
      // formthis.data.append('text', this.QTextArray[this.Number])
      // formthis.data.append('ans',this.ans)
      // formthis.data.set('cat', String(this.Number))

      if (this.response == true) {
        this._correctAnswerPart1()
        clearTimeout(this.infoBool)
        clearTimeout(this.timeBool)
        this._correctAnswerPart2()

        /* Case when the competitor wins */
        if (this.EndOfGame == 16) {
          this._gameWon()
          this.helps = false
          this.help1 = false
          this.help2 = false
          clearTimeout(this.infoBool)
          clearTimeout(this.timeBool)

          // Changing the screen after 3 seconds
          await this.timer(3000);
          
          // Showing the top list if the user is logged in and its new score is in the top list
          if(!this.PracticeMode)            
            this._topList()
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
        this._wrongAnswer();
        this.helps = false
        this.help1 = false
        this.help2 = false
        clearTimeout(this.infoBool)
        clearTimeout(this.timeBool)

        // Changing the screen after 3 seconds
        await this.timer(3000);

        // Showing the top list if the user is logged in and its new score needs to be in the top list
        if(!this.PracticeMode)
          this._topList()
        else{
          this.data.showAnsweringScreen(false)
          this.data.showWelcomeScreen(true)
        }
      }
    })
  }

  /** Function that manages players tender help request */
  tender() {
    /* Stopping timing */
    clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)

    this.TenderHelp = true;
    var questionMessage = document.getElementById("questionId").innerText;
    var questionValueMessage = document.getElementById("questionValueId").innerText;
    
    /* Sends it to the tender player */
    this.hubConnection.invoke("SendMessageVN2Tender", this.CurrentUser, questionMessage, questionValueMessage).catch(function (err) {
      return console.error(err.toString());
    });

    /* Receiving the offer from tender player */
    this.hubConnection.on("ReceiveMessageTender2VN", (tenderPlayerUsername, vnPlayerUsername, answerMessage, requestedAmountMessage) => {
      if(vnPlayerUsername === this.CurrentUser){
        /* creating html elements */
        const br1 = document.createElement("br");
        const br2 = document.createElement("br");

        const span1 = document.createElement("span");
        span1.innerHTML = "<b>Korisničko ime tender igrača:</b> &nbsp;"
        const span2 = document.createElement("span");
        span2.innerHTML = "<b>Ponuđen iznos:</b> &nbsp;"

        var div = document.createElement("div");
        div.setAttribute("id","div" + this.DivIndex);
        div.setAttribute("class", "div_with_margins");

        div.appendChild(span1);
        var label1 = document.createElement("label");
        label1.innerText = tenderPlayerUsername;
        label1.id = "tenderHelpUsernameArrivedId";
        div.appendChild(label1);
        div.appendChild(br1);
  
        div.appendChild(span2);
        var label2 = document.createElement("label");
        label2 = document.createElement("label");
        label2.innerText = requestedAmountMessage;
        label2.id = "tenderHelpRequestedSumArrivedId";
        div.appendChild(label2);
        div.appendChild(br2);
        
        var button = document.createElement("button");
        button.id = "sendButtonId2";
        button.innerText = "Prihvatite ponudu";
        button.setAttribute("class", "tender_button");

        button.addEventListener("click", event => {          
          this._AcceptOffer(answerMessage, requestedAmountMessage, tenderPlayerUsername);
          event.preventDefault();
        });
        div.appendChild(button);
        
        document.getElementById("tenderHelpDivId").appendChild(div);
        this.DivIndex++;
      }
    });
    
  }


  /** Function which manages first replace question help - 
  * when player clicks on button for first replace question help, this funcition is called  */
  replaceQuestion1() {

    this.usedReplaceQuestionHelp1 = true
    this.data.changeusedReplaceQuestionHelp1(this.usedReplaceQuestionHelp1)

    this.help1 = true
	  this.help2 = false

    var category = this.CategoryArray[this.Number]
    this.QTextArray[this.Number] = this.QTextArray[this.QTextArray.length - 6 + 2 * category - 1]
    this.data.changeQTextArray(this.QTextArray)

    clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)

    this.timeBool = setTimeout(function () {
      this.GameNotOver = false
      this.data.changeGameNotOver(this.GameNotOver)
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
    
  /** Function which manages first replace question help - 
   * when player clicks on button for second replace question help, this funcition is called  */
  replaceQuestion2(){

    this.usedReplaceQuestionHelp2 = true
    this.data.changeusedReplaceQuestionHelp2(this.usedReplaceQuestionHelp2)

    this.help2 = true
	  this.help1 = false

    var category = this.CategoryArray[this.Number]
    this.QTextArray[this.Number] = this.QTextArray[this.QTextArray.length - 6 + 2 * category]
    this.data.changeQTextArray(this.QTextArray)

    clearTimeout(this.infoBool)
    clearTimeout(this.timeBool)

    this.timeBool = setTimeout(function () {
      this.GameNotOver = false
      this.data.changeGameNotOver(this.GameNotOver)
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

   /** Function which manages actions when player accepts tender-players offer  */
  _AcceptOffer(answerMessage: string, requestedAmountMessage: string, tenderPlayerUsername: string){
    
    // Setting parametars 
    this.AcceptedOffer = true; 
    this.usedTenderHelp = true;
    this.data.changeusedTenderHelp(this.usedTenderHelp);

    var answerMsg = answerMessage.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");    
  
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

    var obj = {
      tex: this.QTextArray[this.Number],
      ans: answerMsg,
    }

    // Checking answer accuracy
    this.http.post('/api/v3/answer/', obj, {
      headers: headerOptions
    }).subscribe(async t => {
      this.response = t

      if(this.response == true){
        /** Setting html components */
        var feedbackLabel = document.getElementById("tenderFeedbackId");
        feedbackLabel.innerText = "Odgovor je tačan!";
        
        var tenderAnswerLabel = document.getElementById("tenderAnswerId");
        tenderAnswerLabel.innerText = answerMsg; 
        
        await this.timer(3000);

        /* Changing the value of question and sending information to tender user that his offer is accepted */ 
        this.ValueOfQuestion = this.ValueOfQuestion - parseInt(requestedAmountMessage);
        this.data.changeValueOfQuestion(this.ValueOfQuestion);
        this.hubConnection.invoke("SendMessageChangeTenderSum", tenderPlayerUsername,
         requestedAmountMessage.toString()).then(() => {this.hubConnection.stop().then(() => console.log("Connection Stopped!"))}).catch(function (err) {
          return console.error(err.toString());
        });

        for (var i = 0; i < this.Field; i++)
          this.IsDisabledArray[i] = false;
        this.data.changeIsDisabledArray(this.IsDisabledArray);

        // All questions on witch player has answerd are deleting from CategoryArray.          
        this._correctAnswerPart1();
        this._correctAnswerPart2();
        
        /* Case when the competitor wins */
        if (this.EndOfGame == 16) {
          this._gameWon();
          // Changing the screen after 3 seconds
          await this.timer(3000);
          
          // showing the top list if the user is logged in and its new score is in the top list
          if(!this.PracticeMode)            
            this._topList();
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
    }else{/* Case when the tender player gave the wrong answer */
        var feedbackLabel = document.getElementById("tenderFeedbackId");
        feedbackLabel.innerText = "Odgovor je pogrešan!";
        
        var tenderAnswerLabel = document.getElementById("tenderAnswerId");
        tenderAnswerLabel.innerText = answerMsg; 
        
        this._wrongAnswer();

        // Changing the screen after 3 seconds
        await this.timer(3000);
        
        // showing the top list if the user is logged in and its new score is in the top list
        this._topList();

        this.hubConnection.stop().then(() => console.log("Connection Stopped!")).catch(function (err) {
          return console.error(err.toString());
        });
      }
    })
  }

  /** Function that applies first set of actions when player's answer is correct */
  _correctAnswerPart1(){
    for (var i = 0; i < this.Field; i++)
      this.IsDisabledArray[i] = false;
    this.data.changeIsDisabledArray(this.IsDisabledArray);

    //  All questions on which player has answered are deleting from CategoryArray.  
    if (this.counterPerRound == this.NumberOfQuestionPerRound) {  
      for (var i = this.Field - 1; i >= 0; i--)
        if (this.CategoryArray[i] < 0)
          this.data.removeFromArray(i)
      
      // If the number of the round became one, we are entering in one more round.
      this.NumberOfQuestionPerRound--
      this.data.changeNumberOfQuestionPerRound(this.NumberOfQuestionPerRound)
      this.counterPerRound = 0
      this.data.changecounterPerRound(this.counterPerRound)
      if (this.NumberOfQuestionPerRound == 0)
        this.NumberOfQuestionPerRound = 1
    }
  }

  /** Function that applies second set of actions when player's answer is correct */
  _correctAnswerPart2(){
    if (this.QTextArray[this.Number].indexOf("#!!#") >= 0)
    this.Sum = this.Sum * 2
    else
      this.Sum = this.Sum + this.ValueOfQuestion
    this.data.changeSum(this.Sum)
    this.EndOfGame++
    this.data.changeEndOfGame(this.EndOfGame)
    this.Correct = false
    this.data.changeCorrect(this.Correct)
  }

  /** Function that applies set of actions when player's answer is wrong */
  _wrongAnswer(){
    if (this.QTextArray[this.Number].indexOf("#!!#") >= 0){
      this.Sum = 0
      this.GuaranteedSum = 0
      this.data.changeGuaranteedSum(this.GuaranteedSum)  
    }else{
      this.Sum = this.GuaranteedSum
    }
    this.data.changeSum(this.Sum)
    this.GameNotOver = false
    this.data.changeGameNotOver(this.GameNotOver)
  }

  /** Function that applies set of actions when player won the game, i.e. player has answered correct on all questions */
  _gameWon(){
    this.GameNotOver = false
    this.data.changeGameNotOver(this.GameNotOver)
    this.GuaranteedSum = this.Sum
  }

  /** Function which gets top-list of players from server on player's request */
  _topList(){
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    // todo ovde kreirati headeropcije
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

}
