import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  Screen1 : boolean
  Screen2 : boolean
  Screen3 : boolean
  Screen4 : boolean
  
  constructor(private data : DataService) { }
  
  ngOnInit() {
    this.data.currentScreen1.subscribe(message => this.Screen1 = message)
    this.data.currentScreen2.subscribe(message => this.Screen2 = message)
    this.data.currentScreen3.subscribe(message => this.Screen3 = message)
    this.data.currentScreen4.subscribe(message => this.Screen4 = message)
  }
  checkLoginInfo(){
    this.data.changeScreen2(false)
    this.data.changeScreen3(true)
  }

}
