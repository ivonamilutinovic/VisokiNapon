import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable()
export class DataService {

  constructor() {}

  /** BehaviorSubject */
  private defaultWelcomeScreen = new BehaviorSubject<boolean>(true);
  /** Observable of defaultWelcomeScreen */
  currentWelcomeScreen = this.defaultWelcomeScreen.asObservable();
  /** Function changes the current value of defaultWelcomeScreen variable to value given as argument */
  showWelcomeScreen(message: boolean) {
    this.defaultWelcomeScreen.next(message)
  }

  /** BehaviorSubject */
  private defaultLogInScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultLogInScreen */
  currentLogInScreen = this.defaultLogInScreen.asObservable();
  /** Function changes the current value of defaultLogInScreen variable to value given as argument */
  showLogInScreen(message: boolean) {
    this.defaultLogInScreen.next(message)
  }

  /** BehaviorSubject */
  private defaultQuestionsScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultQuestionsScreen */
  currentQuestionsScreen = this.defaultQuestionsScreen.asObservable();
  /** Function changes the current value of defaultQuestionsScreen variable to value given as argument */
  showQuestionsScreen(message: boolean) {
    this.defaultQuestionsScreen.next(message)
  }

  /** BehaviorSubject */
  private defaultAnsweringScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultAnsweringScreen */
  currentAnsweringScreen = this.defaultAnsweringScreen.asObservable();
  /** Function changes the current value of defaultAnsweringScreen variable to value given as argument */
  showAnsweringScreen(message: boolean) {
    this.defaultAnsweringScreen.next(message)
  }

  /** BehaviorSubject */
  private defaultSignUpScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultSignUpScreen */
  currentSignUpScreen = this.defaultSignUpScreen.asObservable();
  /** Function changes the current value of defaultSignUpScreen variable to value given as argument */
  showSignUpScreen(message: boolean) {
    this.defaultSignUpScreen.next(message)
  }
  
  /** BehaviorSubject */
  private defaultTopListScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultTopListScreen */
  currentTopListScreen = this.defaultTopListScreen.asObservable();
  /** Function changes the current value of defaultTopListScreen variable to value given as argument */
  showTopListScreen(message: boolean) {
    this.defaultTopListScreen.next(message)
  }

  /** BehaviorSubject */
  private defaultChooseModeScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultChooseModeScreen */
  currentChooseModeScreen = this.defaultChooseModeScreen.asObservable();
  /** Function changes the current value of defaultChooseModeScreen variable to value given as argument */
  showChooseModeScreen(message: boolean) {
    this.defaultChooseModeScreen.next(message)
  }

  /** BehaviorSubject */
  private defaultTenderScreen = new BehaviorSubject<boolean>(false);
  /** Observable of defaultTenderScreen */
  currentTenderScreen = this.defaultTenderScreen.asObservable();
  /** Function changes the current value of defaultTenderScreen variable to value given as argument */
  showTenderScreen(message: boolean) {
    this.defaultTenderScreen.next(message)
  }

  
  // private i :number;
  // private j : number
  // private k : number;

  // for (i > 0; this.i--){
  //     var j = Math.floor(Math.random() * this.i);
  //     var k = this.arrayNumbersS[j];
  //     this.arrayNumbersS[j] = this.arrayNumberS[this.i - 1];
  //     this.arrayNumbersS[this.i - 1] = k;
  // }

  /** The initial value for defaultCategoryArray array */
  private defaultCategoryArrayC : Array<number> = [0, 0, 0, 0, 
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0];
  /** BehaviorSubject */
  private defaultCategoryArray = new BehaviorSubject<Array<number>>(this.defaultCategoryArrayC)
  /** Observable of defaultCategoryArray */
  currentCategoryArray = this.defaultCategoryArray.asObservable();
  /** Function changes the current value of defaultCategoryArray array to value given as argument */
  changeCategoryArray(message: Array<number>){
    this.defaultCategoryArray.next(message)
  }

  /** Function removes all data for answered question */
  removeFromArray(message: number) {
    this.defaultCategoryArrayC.splice(message, 1);
    this.defaultCategoryArray.next(this.defaultCategoryArrayC)

    this.defaultQTextArrayC.splice(message, 1);
    this.defaultQTextArray.next(this.defaultQTextArrayC)
    
    // this.defaultQAnswerArrayC.splice(message, 1);
    // this.defaultQAnswerArray.next(this.defaultQAnswerArrayC)
    
    this.defaultIsDisabledArrayC.splice(message, 1);
    this.defaultIsDisabledArray.next(this.defaultIsDisabledArrayC)
  }
  
  /** The initial value for defaultQTextArray array */
  private defaultQTextArrayC =["?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?"]
  /** BehaviorSubject */
  private defaultQTextArray = new BehaviorSubject<Array<string>>(this.defaultQTextArrayC)
  /** Observable of defaultQTextArray */ 
  currentQTextArray = this.defaultQTextArray.asObservable();
  /** Function changes the current value of defaultQTextArray array to value given as argument */
  changeQTextArray(message: Array<string>){
    this.defaultQTextArray.next(message)
  }
  
  // private defaultQAnswerArrayC = [...]
  // private defaultQAnswerArray = new BehaviorSubject<Array<string>>(this.defaultQAnswerArrayC)
  // currentQAnswerArray = this.defaultQAnswerArray.asObservable();
  // changeQAnswerArray(message: Array<string>){
  //   this.defaultQAnswerArray.next(message)
  // }

  /** The initial value for defaultIsDisabledArray array */
  private defaultIsDisabledArrayC : Array<boolean> = [false, false, false, false, 
                                                      false, false, false, false,
                                                      false, false, false, false,
                                                      false, false, false, false,
                                                      false, false, false, false,
                                                      false, false];
  /** BehaviorSubject */
  private defaultIsDisabledArray = new BehaviorSubject<Array<boolean>>(this.defaultIsDisabledArrayC)
  /** Observable of defaultIsDisabledArray  */ 
  currentIsDisabledArray = this.defaultIsDisabledArray.asObservable();
  /** Function changes the current value of defaultIsDisabledArray array to value given as argument */
  changeIsDisabledArray(message: Array<boolean>){
    this.defaultIsDisabledArray.next(message)
  }

  /** The initial value for defaultCounter variable */
  private defaultCounterC: number = 0;
  /** BehaviorSubject */
  private defaultCounter = new BehaviorSubject<number>(this.defaultCounterC)
  /** Observable of defaultCounter */
  currentCounter = this.defaultCounter.asObservable();
  /** Function changes the current value of defaultCounter variable to value given as argument */
  changeCounter(message: number){
   this.defaultCounter.next(message)
  }

  /** The initial value for defaultUser variable */
  private defaultUserC: string = "";
  /** BehaviorSubject */
  private defaultUser = new BehaviorSubject<string>(this.defaultUserC)
  /** Observable of defaultUser */
  currentUser = this.defaultUser.asObservable();
  /** Function changes the current value of defaultUser variable to value given as argument */
  changeUser(message: string){
   this.defaultUser.next(message)
  }

  /** The initial value for defaultIndicator variable */
  private defaultIndicatorC: boolean = false;
  /** BehaviorSubject */
  private defaultIndicator = new BehaviorSubject<boolean>(this.defaultIndicatorC)
  /** Observable of defaultIndicator */
  currentIndicator = this.defaultIndicator.asObservable();
  /** Function changes the current value of defaultIndicator variable to value given as argument */
  changeIndicator(message: boolean){
    this.defaultIndicator.next(message)
  }

  /** The initial value for defaultQNumber variable */
  private defaultQNumberC: number = -1
  /** BehaviorSubject */
  private defaultQNumber = new BehaviorSubject<number>(this.defaultQNumberC);
  /** Observable of defaultQNumber */
  currentQNumber = this.defaultQNumber.asObservable();
  /** Function changes the current value of defaultQNumber variable to value given as argument */
  changeQNumber(message: number) {
    this.defaultQNumber.next(message)
  }

  /** The initial value for defaultSum variable */
  private defaultSumC: number = 0
  /** BehaviorSubject */
  private defaultSum = new BehaviorSubject<number>(this.defaultSumC);
  /** Observable of defaultSum */
  currentSum = this.defaultSum.asObservable();
  /** Function changes the current value of defaultSum variable to value given as argument */
  changeSum(message: number) {
    this.defaultSum.next(message)
  }

  /** The initial value for defaultValueOfQuestion variable */
  private defaultValueOfQuestionC: number = 0
  /** BehaviorSubject */
  private defaultValueOfQuestion = new BehaviorSubject<number>(this.defaultValueOfQuestionC);
  /** Observable of defaultValueOfQuestion */
  currentValueOfQuestion = this.defaultValueOfQuestion.asObservable();
  /** Function changes the current value of defaultValueOfQuestion variable to value given as argument */
  changeValueOfQuestion(message: number) {
    this.defaultValueOfQuestion.next(message)
  }

  /** The initial value for defaultNumberOfQuestionPerRound variable */
  private defaultNumberOfQuestionPerRoundC: number = 5
  /** BehaviorSubject */
  private defaultNumberOfQuestionPerRound = new BehaviorSubject<number>(this.defaultNumberOfQuestionPerRoundC);
  /** Observable of defaultNumberOfQuestionPerRound */
  currentNumberOfQuestionPerRound = this.defaultNumberOfQuestionPerRound.asObservable();
  /** Function changes the current value of defaultNumberOfQuestionPerRound variable to value given as argument */
  changeNumberOfQuestionPerRound(message: number) {
    this.defaultNumberOfQuestionPerRound.next(message)
  }

  /** The initial value for defaultField variable */
  private defaultFieldC: number = 16
  /** BehaviorSubject */
  private defaultField = new BehaviorSubject<number>(this.defaultFieldC);
  /** Observable of defaultField */
  currentField = this.defaultField.asObservable();
  /** Function changes the current value of defaultField variable to value given as argument */
  changeField(message: number) {
    this.defaultField.next(message)
  }

  /** The initial value for defaultcounterPerRound variable */
  private defaultcounterPerRoundC: number = 0
  /** BehaviorSubject */
  private defaultcounterPerRound = new BehaviorSubject<number>(this.defaultcounterPerRoundC);
  /** Observable of defaultcounterPerRound */
  currentcounterPerRound = this.defaultcounterPerRound.asObservable();
  /** Function changes the current value of defaultcounterPerRound variable to value given as argument */
  changecounterPerRound(message: number) {
    this.defaultcounterPerRound.next(message)
  }

  /** The initial value for defaultGuaranteedSum variable */
  private defaultGuaranteedSumC: number = 0
  /** BehaviorSubject */
  private defaultGuaranteedSum = new BehaviorSubject<number>(this.defaultGuaranteedSumC);
  /** Observable of defaultGuaranteedSum */
  currentGuaranteedSum = this.defaultGuaranteedSum.asObservable();
  /** Function changes the current value of defaultGuaranteedSum variable to value given as argument */
  changeGuaranteedSum(message: number) {
    this.defaultGuaranteedSum.next(message)
  }

  /** The initial value for defaultEndOfGame variable */
  private defaultEndOfGameC: number = 0
  /** BehaviorSubject */
  private defaultEndOfGame = new BehaviorSubject<number>(this.defaultEndOfGameC);
  /** Observable of defaultEndOfGame */
  currentEndOfGame = this.defaultEndOfGame.asObservable();
  /** Function changes the current value of defaultEndOfGame variable to value given as argument */
  changeEndOfGame(message: number) {
    this.defaultEndOfGame.next(message)
  }

  /** The initial value for defaultCorrect variable */
  private defaultCorrectC: boolean = true
  /** BehaviorSubject */
  private defaultCorrect = new BehaviorSubject<boolean>(this.defaultCorrectC);
  /** Observable of defaultCorrect */
  currentCorrect = this.defaultCorrect.asObservable();
  /** Function changes the current value of defaultCorrect variable to value given as argument */
  changeCorrect(message: boolean) {
    this.defaultCorrect.next(message)
  }

  /** The initial value for defaultusedReplaceQuestionHelp1 variable */
  private defaultusedReplaceQuestionHelp1C: boolean = false
  /** BehaviorSubject */
  private defaultusedReplaceQuestionHelp1 = new BehaviorSubject<boolean>(this.defaultusedReplaceQuestionHelp1C);
  /** Observable of defaultusedReplaceQuestionHelp1 */
  currentusedReplaceQuestionHelp1 = this.defaultusedReplaceQuestionHelp1.asObservable();
  /** Function changes the current value of defaultusedReplaceQuestionHelp1 variable to value given as argument */
  changeusedReplaceQuestionHelp1(message: boolean) {
    this.defaultusedReplaceQuestionHelp1.next(message)
  }

  /** The initial value for defaultusedReplaceQuestionHelp2 variable */
  private defaultusedReplaceQuestionHelp2C : boolean = false
  /** BehaviorSubject */
  private defaultusedReplaceQuestionHelp2 = new BehaviorSubject<boolean>(this.defaultusedReplaceQuestionHelp2C);
  /** Observable of defaultusedReplaceQuestionHelp2 */
  currentusedReplaceQuestionHelp2 = this.defaultusedReplaceQuestionHelp2.asObservable();
  /** Function changes the current value of defaultusedReplaceQuestionHelp2 variable to value given as argument */
  changeusedReplaceQuestionHelp2(message: boolean) {
    this.defaultusedReplaceQuestionHelp2.next(message)
  }

  /** The initial value for defaultusedTenderHelp variable */
  private defaultusedTenderHelpC : boolean = false
  /** BehaviorSubject */
  private defaultusedTenderHelp = new BehaviorSubject<boolean>(this.defaultusedTenderHelpC);
  /** Observable of defaultusedTenderHelp */
  currentusedTenderHelp = this.defaultusedTenderHelp.asObservable();
  /** Function changes the current value of defaultusedTenderHelp variable to value given as argument */
  changeusedTenderHelp(message: boolean) {
    this.defaultusedTenderHelp.next(message)
  }
  
  /** The initial value for defaultGameOver variable */
  private GameOverC : boolean = true
  /** BehaviorSubject */
  private defaultGameOver = new BehaviorSubject<boolean>(this.GameOverC);
  /** Observable of defaultGameOver */
  currentGameOver = this.defaultGameOver.asObservable();
  /** Function changes the current value of defaultGameOver variable to value given as argument */
  changeGameOver(message: boolean) {
    this.defaultGameOver.next(message)
  }
  
  /** The initial value for defaultBackToChoosingModeBoolean variable */
  private BackToChoosingModeBooleanC : boolean = false
  /** BehaviorSubject */
  private defaultBackToChoosingModeBoolean = new BehaviorSubject<boolean>(this.BackToChoosingModeBooleanC);
  /** Observable of defaultBackToChoosingModeBoolean */
  currentBackToChoosingModeBoolean = this.defaultBackToChoosingModeBoolean.asObservable();
  /** Function changes the current value of defaultBackToChoosingModeBoolean variable to value given as argument */
  changeBackToChoosingModeBoolean(message: boolean) {
    this.defaultBackToChoosingModeBoolean.next(message)
  }

  /** The initial value for defaultPracticeMode object */
  private PracticeModeC : boolean = false
  /** BehaviorSubject */
  private defaultPracticeMode = new BehaviorSubject<boolean>(this.PracticeModeC);
  /** Observable of defaultPracticeMode */
  currentPracticeMode = this.defaultPracticeMode.asObservable();
  /** Function changes the current value of defaultPracticeMode variable to value given as argument */
  changePracticeMode(message: boolean) {
    this.defaultPracticeMode.next(message)
  }
}

