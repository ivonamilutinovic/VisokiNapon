import { Component } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Visoki Napon';
  Screen1 : boolean
  Screen2 : boolean
  Screen3 : boolean
  Screen4 : boolean
  Screen5 : boolean
  
  constructor(private data : DataService) { }
  
  ngOnInit() {
    this.data.currentScreen1.subscribe(message => this.Screen1 = message)
    this.data.currentScreen2.subscribe(message => this.Screen2 = message)
    this.data.currentScreen3.subscribe(message => this.Screen3 = message)
    this.data.currentScreen4.subscribe(message => this.Screen4 = message)
	this.data.currentScreen5.subscribe(message => this.Screen5 = message)
  }
  
}
