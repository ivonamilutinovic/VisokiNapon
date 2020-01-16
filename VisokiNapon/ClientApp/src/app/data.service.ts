import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class DataService {

  constructor() { }

  private defaultScreen1 = new BehaviorSubject<boolean>(true);
  currentScreen1 = this.defaultScreen1.asObservable();
  changeScreen1(message: boolean) {
    this.defaultScreen1.next(message)
  }


  private defaultScreen2 = new BehaviorSubject<boolean>(false);
  currentScreen2 = this.defaultScreen2.asObservable();
  changeScreen2(message: boolean) {
    this.defaultScreen2.next(message)
  }


  private defaultScreen3 = new BehaviorSubject<boolean>(false);
  currentScreen3 = this.defaultScreen3.asObservable();
  changeScreen3(message: boolean) {
    this.defaultScreen3.next(message)
  }

  private defaultScreen4 = new BehaviorSubject<boolean>(false);
  currentScreen4 = this.defaultScreen4.asObservable();
  changeScreen4(message: boolean) {
    this.defaultScreen4.next(message)
  }
  
  private defaultScreen5 = new BehaviorSubject<boolean>(false);
  currentScreen5 = this.defaultScreen5.asObservable();
  changeScreen5(message: boolean) {
    this.defaultScreen5.next(message)
  }

/*private i :number;
  private j : number
  private k : number;

  for (i > 0; this.i--){
      var j = Math.floor(Math.random() * this.i);
      var k = this.arrayNumbersS[j];
      this.arrayNumbersS[j] = this.arrayNumberS[this.i - 1];
      this.arrayNumbersS[this.i - 1] = k;
  }*/

  private defaultCategoryArrayC : Array<number> = [0, 0, 0, 0, 
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0];
  private defaultCategoryArray = new BehaviorSubject<Array<number>>(this.defaultCategoryArrayC)
  currentCategoryArray = this.defaultCategoryArray.asObservable();
  changeCategoryArray(message: Array<number>){
    this.defaultCategoryArray.next(message)
  }

  removeFromArray(message: number) {
    this.defaultCategoryArrayC.splice(message, 1);
    this.defaultCategoryArray.next(this.defaultCategoryArrayC)

    this.defaultQTextArrayC.splice(message, 1);
    this.defaultQTextArray.next(this.defaultQTextArrayC)
    
    //this.defaultQAnswerArrayC.splice(message, 1);
    //this.defaultQAnswerArray.next(this.defaultQAnswerArrayC)
    
    this.defaultBooleanArrayC.splice(message, 1);
    this.defaultBooleanArray.next(this.defaultBooleanArrayC)
  }
  
  private defaultQTextArrayC =["?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?"]
  private defaultQTextArray = new BehaviorSubject<Array<string>>(this.defaultQTextArrayC)
  currentQTextArray = this.defaultQTextArray.asObservable();
  changeQTextArray(message: Array<string>){
    this.defaultQTextArray.next(message)
  }
  
  /*private defaultQAnswerArrayC = [...]
  private defaultQAnswerArray = new BehaviorSubject<Array<string>>(this.defaultQAnswerArrayC)
  currentQAnswerArray = this.defaultQAnswerArray.asObservable();
  changeQAnswerArray(message: Array<string>){
    this.defaultQAnswerArray.next(message)
  }*/

  private defaultBooleanArrayC : Array<boolean> = [false, false, false, false, 
                                                   false, false, false, false,
                                                   false, false, false, false,
                                                   false, false, false, false,
                                                   false, false, false, false,
                                                   false, false];
  private defaultBooleanArray = new BehaviorSubject<Array<boolean>>(this.defaultBooleanArrayC)
  currentBooleanArray = this.defaultBooleanArray.asObservable();
  changeBooleanArray(message: Array<boolean>){
    this.defaultBooleanArray.next(message)
  }

  private defaultCounterC : number = 0;
  private defaultCounter = new BehaviorSubject<number>(this.defaultCounterC)
  currentCounter = this.defaultCounter.asObservable();
  changeCounter(message: number){
   this.defaultCounter.next(message)
  }

  private defaultIndicatorC : boolean = false;
  private defaultIndicator = new BehaviorSubject<boolean>(this.defaultIndicatorC)
  currentIndicator = this.defaultIndicator.asObservable();
  changeIndicator(message: boolean){
    this.defaultIndicator.next(message)
  }

  private defaultQNumberC : number = -1
  private defaultQNumber = new BehaviorSubject<number>(this.defaultQNumberC);
  currentQNumber = this.defaultQNumber.asObservable();
  changeQNumber(message: number) {
    this.defaultQNumber.next(message)
  }

  private defaultSumC : number = 0
  private defaultSum = new BehaviorSubject<number>(this.defaultSumC);
  currentSum = this.defaultSum.asObservable();
  changeSum(message: number) {
    this.defaultSum.next(message)
  }

  private defaultValueOfQuestionC : number = 0
  private defaultValueOfQuestion = new BehaviorSubject<number>(this.defaultValueOfQuestionC);
  currentValueOfQuestion = this.defaultValueOfQuestion.asObservable();
  changeValueOfQuestion(message: number) {
    this.defaultValueOfQuestion.next(message)
  }

  private defaultNumberOfQuestionPerRoundC : number = 5
  private defaultNumberOfQuestionPerRound = new BehaviorSubject<number>(this.defaultNumberOfQuestionPerRoundC);
  currentNumberOfQuestionPerRound = this.defaultNumberOfQuestionPerRound.asObservable();
  changeNumberOfQuestionPerRound(message: number) {
    this.defaultNumberOfQuestionPerRound.next(message)
  }

  private defaultFieldC : number = 16
  private defaultField = new BehaviorSubject<number>(this.defaultFieldC);
  currentField = this.defaultField.asObservable();
  changeField(message: number) {
    this.defaultField.next(message)
  }

  private defaultcounterPerRoundC : number = 0
  private defaultcounterPerRound = new BehaviorSubject<number>(this.defaultcounterPerRoundC);
  currentcounterPerRound = this.defaultcounterPerRound.asObservable();
  changecounterPerRound(message: number) {
    this.defaultcounterPerRound.next(message)
  }

  private defaultGuaranteedSumC : number = 0
  private defaultGuaranteedSum = new BehaviorSubject<number>(this.defaultGuaranteedSumC);
  currentGuaranteedSum = this.defaultGuaranteedSum.asObservable();
  changeGuaranteedSum(message: number) {
    this.defaultGuaranteedSum.next(message)
  }

  private defaultEndOfGameC : number = 0
  private defaultEndOfGame = new BehaviorSubject<number>(this.defaultEndOfGameC);
  currentEndOfGame = this.defaultEndOfGame.asObservable();
  changeEndOfGame(message: number) {
    this.defaultEndOfGame.next(message)
  }

  private defaultCorrectC : boolean = true
  private defaultCorrect = new BehaviorSubject<boolean>(this.defaultCorrectC);
  currentCorrect = this.defaultCorrect.asObservable();
  changeCorrect(message: boolean) {
    this.defaultCorrect.next(message)
  }

  private defaultusedReplaceQuestionHelp1C : boolean = false
  private defaultusedReplaceQuestionHelp1 = new BehaviorSubject<boolean>(this.defaultusedReplaceQuestionHelp1C);
  currentusedReplaceQuestionHelp1 = this.defaultusedReplaceQuestionHelp1.asObservable();
  changeusedReplaceQuestionHelp1(message: boolean) {
    this.defaultusedReplaceQuestionHelp1.next(message)
  }

  private defaultusedReplaceQuestionHelp2C : boolean = false
  private defaultusedReplaceQuestionHelp2 = new BehaviorSubject<boolean>(this.defaultusedReplaceQuestionHelp2C);
  currentusedReplaceQuestionHelp2 = this.defaultusedReplaceQuestionHelp2.asObservable();
  changeusedReplaceQuestionHelp2(message: boolean) {
    this.defaultusedReplaceQuestionHelp2.next(message)
  }

  private GameOverC : boolean = true
  private defaultGameOver = new BehaviorSubject<boolean>(this.GameOverC);
  currentGameOver = this.defaultGameOver.asObservable();
  changeGameOver(message: boolean) {
    this.defaultGameOver.next(message)
  }

}
