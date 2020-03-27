import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MakeqService {

  constructor(private http: HttpClient) {
  }
  
  /** Function which gets questions for player from server */
  getQuestions() : Observable<any> {
    return this.http.get('/api/v3/questions')
  }
  
}
