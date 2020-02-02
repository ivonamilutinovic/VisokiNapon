import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AnswerComponent } from './answer/answer.component';
import { ToplistComponent } from './toplist/toplist.component';
import { ChooseModeComponent } from './choosemode/choosemode.component';
import { TenderComponent } from './tender/tender.component';
import { MakeqService } from './makeq.service';
import { CountdownModule } from 'ngx-countdown';
import {YouTubePlayerModule} from '@angular/youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    WelcomeComponent,
    LoginComponent,
    AnswerComponent,
    SignupComponent,
    ToplistComponent,
    ChooseModeComponent,
    TenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
	  CountdownModule,
	  YouTubePlayerModule
  ],
  providers: [DataService, MakeqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
