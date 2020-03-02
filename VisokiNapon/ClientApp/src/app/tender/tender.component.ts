import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel} from '@aspnet/signalr';


@Component({
    selector:    'app-tender',
    templateUrl: './tender.component.html',
    styleUrls:   ['./tender.component.css']
})

export class TenderComponent implements OnInit {
   
  hubConnection: HubConnection;

  WelcomeScreen                       : boolean
  LogInScreen                         : boolean
  QuestionsScreen                     : boolean
  AnsweringScreen                     : boolean
  SignUpScreen                        : boolean
  TopListScreen                       : boolean
  ChooseModeScreen                    : boolean
  TenderScreen                        : boolean
  CurrentUser                         : string

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
    
    this.data.currentUser.subscribe(message => this.CurrentUser = message);

    this.hubConnection = new HubConnectionBuilder().configureLogging(LogLevel.Debug).withUrl("/chatHub", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }).build();

    this.hubConnection
    .start()
    .then(() => console.log("Connection Started!"))
    .catch(err => console.log("Error while establishing a connection :( "));

    var i = 1
    this.hubConnection.on("ReceiveMessageVN2Tender", (user, questionMessage, questionValueMessage) => {
      var questionMsg = questionMessage.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var valueMsg = questionValueMessage.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const br1 = document.createElement("br");
      const br2 = document.createElement("br");
      const br3 = document.createElement("br");
      const br4 = document.createElement("br");
      const br5 = document.createElement("br");
      
      const span1 = document.createElement("span");
      const span2 = document.createElement("span");
      const span3 = document.createElement("span");

      var div = document.createElement("div");
      var divId = "div" + i
      div.setAttribute("id", divId);
      div.setAttribute("class", "div_with_margins");
      
      span1.innerHTML = "<b>Korisničko ime:</b> &nbsp;"
      div.appendChild(span1);
      var label = document.createElement("label");
      label.innerText = user;
      label.id = "vnPlayerUsernameId" + i;
      div.appendChild(label);
      div.appendChild(br1);

      span2.innerHTML = "<b>Pitanje:</b> &nbsp;"
      div.appendChild(span2);
      label = document.createElement("label");
      label.innerText = questionMsg;
      label.id = "tenderHelpQuestionId" + i;
      div.appendChild(label);
      div.appendChild(br2);

      span3.innerHTML = "<b>Vrednost pitanja:</b> &nbsp;"
      div.appendChild(span3);
      label = document.createElement("label");
      label.innerText = valueMsg;
      label.id = "tenderHelpValueOfQuestionId" + i;
      div.appendChild(label);
      div.appendChild(br3);

      var input = document.createElement("input");
      input.id = "tenderHelpAnswerId" + i;
      input.setAttribute("placeholder", "Unesite odgovor...");
      input.setAttribute("type", "text");
      input.setAttribute("class", "tender_input");
      input.required = true;
      div.appendChild(input);
      div.appendChild(br4);

      input = document.createElement("input");
      input.id = "tenderHelprequestedAmountMessageId" + i;
      input.setAttribute("placeholder", "Unesite traženu sumu...");
      input.setAttribute("class", "tender_input");
      input.setAttribute("type", "number");
      input.min = "0";
      input.max = questionValueMessage;
      input.required=true;
      div.appendChild(input);
      div.appendChild(br5);

      var button = document.createElement("button");
      button.type = "submit"
      button.id = i.toString();
      button.innerText = "Pošaljite odgovor";
      button.setAttribute("class", "tender_button");
      
      // Tender player sends the answer and the offered amount to 'Visoki Napon' Player
      button.addEventListener("click", event => {
        const index = button.id;
        var vnPlayerUsername = (document.getElementById("vnPlayerUsernameId" + index) as HTMLInputElement).innerText;
        var answerMessage = (document.getElementById("tenderHelpAnswerId" + index) as HTMLInputElement).value;
        var requestedAmountElement = (document.getElementById("tenderHelprequestedAmountMessageId" + index) as HTMLInputElement);
        var requestedAmountMessage = requestedAmountElement.value;
        
        if(answerMessage == "" || requestedAmountMessage ==""){
          alert("Both inputs are required")
        }
        else if(parseInt(requestedAmountMessage) < parseInt(requestedAmountElement.min) || parseInt(requestedAmountMessage) > parseInt(requestedAmountElement.max)){
          alert("Amount must be between " + requestedAmountElement.min + " and " + requestedAmountElement.max)
        }
        else{
          var div = document.getElementById(divId);
          div.remove();

          this.hubConnection.invoke("SendMessageTender2VN", this.CurrentUser, vnPlayerUsername, answerMessage, requestedAmountMessage.toString()).catch(function (err) {
            return console.error(err.toString());
        });  
        }    
      });
      div.appendChild(button);
      document.getElementById("main_div").appendChild(div);

      i++;
    });

    // This also means that the help is accepted so we can delete div component related to help to that user
    this.hubConnection.on("ReceiveMessageChangeTenderSum", (user, TenderAmountMessage) => {
      if(user == this.CurrentUser){
        var amountLabel = document.getElementById("tenderAmountId");
        var amount = parseInt(amountLabel.innerText) + parseInt(TenderAmountMessage);
        amountLabel.innerText = amount.toString();
      }

    });
  }

  quitTenderGame(){
    this.data.showTenderScreen(false);
    this.data.showChooseModeScreen(true);
  }
}
