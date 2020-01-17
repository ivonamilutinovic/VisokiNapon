import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  Screen1 : boolean
  Screen2 : boolean
  Screen3 : boolean
  Screen4 : boolean
  Screen5 : boolean
  s_h1 : boolean = false
  message : string = ""
  signupmessage : string = ""
  response : any
  CategoryArray : Array<number>
  QTextArray : Array<string>
  questions: any[]  //$: Observable<QuestionM[]>;
  ques: string[]
  
  constructor(private data : DataService, private http: HttpClient,  private makeqService : MakeqService) { }
  

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


  changeToLogin(){
		this.data.changeScreen5(false)
		this.data.changeScreen2(true)
  }

  checkSignUpInfo(uemail: string, uname: string, usurname: string, usr: string, pass : string , confpass : string){
	  
	var objSignup = {
	  email : uemail,
	  name: uname,
	  surname: usurname,
      username: usr,
      password: pass,
	  confirmpassword : confpass
     }  
	
	const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('/api/v3/register/', objSignup, {
            headers: headerOptions
    }).subscribe(t=> {console.log("resenje ",t," ", typeof(t)) 
    this.response =t

    if(this.response== true){
	    var i=0
		for(const item of this.questions ){
			this.CategoryArray[i]=item["category"]
			//this.Ids[i]=item["id"]
			this.QTextArray[i]=item["text"]
			i++
		}

		this.data.changeCategoryArray(this.CategoryArray)
		this.data.changeQTextArray(this.QTextArray)
	
		this.data.changeScreen5(false)
		this.data.changeScreen3(true)
    }
    else {
		this.signupmessage = "Email adresa je vec registrovana ili je uneti username zauzet. " +  
							"Pokusajte ponovo!"
		/* ispisacemo mu zasto je odbijen signup, npr. zauzet username, ili vec postoji mail */
    //  this.data.changeScreen2(false)
    //  this.data.changeScreen3(true)
    }
  }) 	
  }

}
