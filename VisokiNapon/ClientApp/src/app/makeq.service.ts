import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { QuestionM } from '../app/models/QuestionM';


@Injectable({
  providedIn: 'root'
})
export class MakeqService {
  //myAppUrl: string;

  /*httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };*/

  constructor(private http: HttpClient) { 
    //this.myAppUrl = environment.appUrl;
  }
  
  getQuestions() : Observable<any> {
    return this.http.get('/api/v3/questions')/*.map(res => res.json())
    .subscribe(result => log.result);*/
  }

  /*postAnswer(odg : string){
    return this.http.post('/api/v3/answer/compId', JSON.stringify(odg))
      }
  */
 
}
