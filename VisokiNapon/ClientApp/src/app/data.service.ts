import { Injectable } from '@angular/core';
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

/*private i :number;
  private j : number
  private k : number;

  for (i > 0; this.i--){
      var j = Math.floor(Math.random() * this.i);
      var k = this.arrayNumbersS[j];
      this.arrayNumbersS[j] = this.arrayNumberS[this.i - 1];
      this.arrayNumbersS[this.i - 1] = k;
  }*/
  private defaultCategoryArrayC : Array<number> = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                         "?","?","?","?"]
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

  private defaultBooleanArrayC : Array<boolean> = [ false, false, false, false, false, false, false, false,
     false, false, false, false, false, false, false, false ];
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

  private defaultPriceC : number = 0
  private defaultPrice = new BehaviorSubject<number>(this.defaultPriceC);
  currentPrice = this.defaultPrice.asObservable();
  changePrice(message: number) {
    this.defaultPrice.next(message)
  }

  private defaultRoundC : number = 5
  private defaultRound = new BehaviorSubject<number>(this.defaultRoundC);
  currentRound = this.defaultRound.asObservable();
  changeRound(message: number) {
    this.defaultRound.next(message)
  }

  private defaultFieldC : number = 16
  private defaultField = new BehaviorSubject<number>(this.defaultFieldC);
  currentField = this.defaultField.asObservable();
  changeField(message: number) {
    this.defaultField.next(message)
  }

  private defaultcounterC : number = 0
  private defaultcounter = new BehaviorSubject<number>(this.defaultcounterC);
  currentcounter = this.defaultcounter.asObservable();
  changecounter(message: number) {
    this.defaultcounter.next(message)
  }

  private defaultGuaranteedSumC : number = 0
  private defaultGuaranteedSum = new BehaviorSubject<number>(this.defaultGuaranteedSumC);
  currentGuaranteedSum = this.defaultGuaranteedSum.asObservable();
  changeGuaranteedSum(message: number) {
    this.defaultGuaranteedSum.next(message)
  }

  private defaultEndC : number = 0
  private defaultEnd = new BehaviorSubject<number>(this.defaultEndC);
  currentEnd = this.defaultEnd.asObservable();
  changeEnd(message: number) {
    this.defaultEnd.next(message)
  }

  private defaultCorrectC : boolean = true
  private defaultCorrect = new BehaviorSubject<boolean>(this.defaultCorrectC);
  currentCorrect = this.defaultCorrect.asObservable();
  changeCorrect(message: boolean) {
    this.defaultCorrect.next(message)
  }


}
