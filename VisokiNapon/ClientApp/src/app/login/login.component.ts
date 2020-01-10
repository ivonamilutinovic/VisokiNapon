import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  Screen1                  : boolean
  Screen2                  : boolean
  Screen3                  : boolean
  Screen4                  : boolean
  Screen5                  : boolean
  s_h                      : boolean = false
  message                  : string = ""
  signupmessage            : string = ""
  response                 : any
  CategoryArray            : Array<number>
  QTextArray               : Array<string>
  questions                : any[]  //$: Observable<QuestionM[]>;
  ques                     : string[]
  
  constructor(private data : DataService, 
              private http : HttpClient,  
              private makeqService : MakeqService) { }
              
  ngOnInit() {
	  this.data.currentScreen1.subscribe(message => this.Screen1 = message)
    this.data.currentScreen2.subscribe(message => this.Screen2 = message)
    this.data.currentScreen3.subscribe(message => this.Screen3 = message)
    this.data.currentScreen4.subscribe(message => this.Screen4 = message)
	  this.data.currentScreen5.subscribe(message => this.Screen5 = message)
    this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
    this.makeqService.getQuestions().subscribe(questions => this.questions = questions);
  }


  checkLoginInfo(username : string, password : string){
  
    var objLogin = {
      user : username,
      pass : password
    }

    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.post('/api/v3/login/', objLogin, {
            headers: headerOptions
    }).subscribe(t => {console.log("solution ",t," ", typeof(t)) 
    
    this.response = t

    if(this.response == true){
      var i = 0
      
   		for(const item of this.questions ){
        this.CategoryArray[i] = item["category"]
        //this.Ids[i]=item["id"]
        this.QTextArray[i] = item["text"]
        i++
      }
      
      this.data.changeCategoryArray(this.CategoryArray)
      this.data.changeQTextArray(this.QTextArray)
    
      this.data.changeScreen2(false)
      this.data.changeScreen3(true)
    }
    else {
      this.message = "Uneli ste pogresan password ili username. Pokusajte ponovo! Zadovoljite sve uslove iz padajucih prozora!"
      /* ispisacemo mu zasto je odbijen login, npr. nema username-a, ili password-a */
      //  this.data.changeScreen2(false)
      //  this.data.changeScreen3(true)
    }
  }) 

  }

  changeToSignup(){
		this.data.changeScreen2(false)
		this.data.changeScreen5(true)
  }
}