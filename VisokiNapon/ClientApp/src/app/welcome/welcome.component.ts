import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionM } from './../models/questionm';
import { MakeqService } from '../makeq.service';
import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
/*const httpOpt = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain'
  })
};*/

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {
  Screen1 : boolean
  Screen2 : boolean
  Screen3 : boolean
  Screen4 : boolean
  Screen5 : boolean
  CategoryArray : Array<number>
  QTextArray : Array<string>
  questions: any[]  //$: Observable<QuestionM[]>;
  ques: string[]
  //private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  /*postData = {
    test: 'my content'
  }*/
  
  constructor(private data : DataService, private makeqService : MakeqService) {
    //this.http.post('/api/v1/answer', JSON.stringify('log'), httpOpt).toPromise().then(data=>{console.log(data);
   // })
   }
  ngOnInit() {
    this.data.currentScreen1.subscribe(message => this.Screen1 = message)
    this.data.currentScreen2.subscribe(message => this.Screen2 = message)
    this.data.currentScreen3.subscribe(message => this.Screen3 = message)
    this.data.currentScreen4.subscribe(message => this.Screen4 = message)
	  this.data.currentScreen5.subscribe(message => this.Screen5 = message)
    this.data.currentCategoryArray.subscribe(message => this.CategoryArray = message)
    this.data.currentQTextArray.subscribe(message => this.QTextArray = message)
    this.makeqService.getQuestions().subscribe(questions => this.questions = questions);
    //this.makeqService.postAnswer().subscribe(response => console.log("response from POST", response));
  }
  
  practice(){
    //this.makeqService.validate_user(...).subscribe(res => console.log(res))
    var i=0
    for(const item of this.questions ){
      this.CategoryArray[i]=item["category"]
      //this.Ids[i]=item["id"]
      this.QTextArray[i]=item["text"]
      i++
    }

    this.data.changeCategoryArray(this.CategoryArray)
    this.data.changeQTextArray(this.QTextArray)
    
    this.data.changeScreen1(false)
    this.data.changeScreen3(true)
  }

  compete(){
    this.data.changeScreen1(false)
    this.data.changeScreen2(true)
  }
}

