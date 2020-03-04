import { Injectable }      from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable()
export class DataService {

  constructor() {}

  /** Default showing indicator value for welocme component */
  private defaultWelcomeScreen = new BehaviorSubject<boolean>(true);
  /** Current showing indicator value for welcome component */
  currentWelcomeScreen = this.defaultWelcomeScreen.asObservable();
  /** Function which changes showing indicator value for welocme component */
  showWelcomeScreen(message: boolean) {
    this.defaultWelcomeScreen.next(message)
  }

  /** Default showing indicator value for log in component */
  private defaultLogInScreen = new BehaviorSubject<boolean>(false);
  /** Current showing indicator value for log in component */
  currentLogInScreen = this.defaultLogInScreen.asObservable();
  /** Function which changes showing indicator value for log in component */
  showLogInScreen(message: boolean) {
    this.defaultLogInScreen.next(message)
  }

  /** Default showing indicator value for table component */
  private defaultQuestionsScreen = new BehaviorSubject<boolean>(false);
  /** Current showing indicator value for table component */
  currentQuestionsScreen = this.defaultQuestionsScreen.asObservable();
  /** Function which changes showing indicator value for table component */
  showQuestionsScreen(message: boolean) {
    this.defaultQuestionsScreen.next(message)
  }

  /** Default showing indicator value for answer component */
  private defaultAnsweringScreen = new BehaviorSubject<boolean>(false);
  /** Current showing indicator value for answer component */
  currentAnsweringScreen = this.defaultAnsweringScreen.asObservable();
  /** Function which changes showing indicator value for answer component */
  showAnsweringScreen(message: boolean) {
    this.defaultAnsweringScreen.next(message)
  }

  /** Default showing indicator value for sign up component */
  private defaultSignUpScreen = new BehaviorSubject<boolean>(false);
  /** Current showing indicator value for sign up component */
  currentSignUpScreen = this.defaultSignUpScreen.asObservable();
  /** Function which changes showing indicator value for sign up component */
  showSignUpScreen(message: boolean) {
    this.defaultSignUpScreen.next(message)
  }
  
  /** Default showing indicator value for toplist component */
  private defaultTopListScreen = new BehaviorSubject<boolean>(false);
  /** Current showing indicator value for toplist component */
  currentTopListScreen = this.defaultTopListScreen.asObservable();
  /** Function which changes showing indicator value for toplist component */
  showTopListScreen(message: boolean) {
    this.defaultTopListScreen.next(message)
  }

  /** Default showing indicator value for choosemode component */
  private defaultChooseModeScreen = new BehaviorSubject<boolean>(false);
  /** Current showing indicator value for choosemode component */
  currentChooseModeScreen = this.defaultChooseModeScreen.asObservable();
  /** Function which changes showing indicator value for choosemode component */
  showChooseModeScreen(message: boolean) {
    this.defaultChooseModeScreen.next(message)
  }

  private defaultTenderScreen = new BehaviorSubject<boolean>(false);
  currentTenderScreen = this.defaultTenderScreen.asObservable();
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

  /** Default initialised array of Question category */
  private defaultCategoryArrayC : Array<number> = [0, 0, 0, 0, 
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0, 0, 0,
                                                   0, 0];
  /** Default array of question category */
  private defaultCategoryArray = new BehaviorSubject<Array<number>>(this.defaultCategoryArrayC)
  /** Current array of question category  */
  currentCategoryArray = this.defaultCategoryArray.asObservable();
  /** Function which changes current array of question category */
  changeCategoryArray(message: Array<number>){
    this.defaultCategoryArray.next(message)
  }

  /** Function which manages all data for answered and available questions */
  removeFromArray(message: number) {
    this.defaultCategoryArrayC.splice(message, 1);
    this.defaultCategoryArray.next(this.defaultCategoryArrayC)

    this.defaultQTextArrayC.splice(message, 1);
    this.defaultQTextArray.next(this.defaultQTextArrayC)
    
    //this.defaultQAnswerArrayC.splice(message, 1);
    //this.defaultQAnswerArray.next(this.defaultQAnswerArrayC)
    
    this.defaultIsDisabledArrayC.splice(message, 1);
    this.defaultIsDisabledArray.next(this.defaultIsDisabledArrayC)
  }
  
  /** Default initialised array of text of questions */
  private defaultQTextArrayC =["?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?","?","?",
                               "?","?"]
  /** Default array of text of questions */
  private defaultQTextArray = new BehaviorSubject<Array<string>>(this.defaultQTextArrayC)
  /** Current array of text of questions  */ 
  currentQTextArray = this.defaultQTextArray.asObservable();
  /** Function which changes current array of text of questions */
  changeQTextArray(message: Array<string>){
    this.defaultQTextArray.next(message)
  }
  
  // private defaultQAnswerArrayC = [...]
  // private defaultQAnswerArray = new BehaviorSubject<Array<string>>(this.defaultQAnswerArrayC)
  // currentQAnswerArray = this.defaultQAnswerArray.asObservable();
  // changeQAnswerArray(message: Array<string>){
  //   this.defaultQAnswerArray.next(message)
  // }

  /** Default initialised array of indicator wheather the question is choosen or not */
  private defaultIsDisabledArrayC : Array<boolean> = [false, false, false, false, 
                                                      false, false, false, false,
                                                      false, false, false, false,
                                                      false, false, false, false,
                                                      false, false, false, false,
                                                      false, false];
  /** Default array of indicator wheather the question is choosen or not */             
  private defaultIsDisabledArray = new BehaviorSubject<Array<boolean>>(this.defaultIsDisabledArrayC)
  /** Current array of indicator wheather the question is choosen or not  */ 
  currentIsDisabledArray = this.defaultIsDisabledArray.asObservable();
  /** Function which changes current array of indicator wheather the question is choosen or not */
  changeIsDisabledArray(message: Array<boolean>){
    this.defaultIsDisabledArray.next(message)
  }

  /** Default initialised counter */
  private defaultCounterC: number = 0;
  /** Default counter */
  private defaultCounter = new BehaviorSubject<number>(this.defaultCounterC)
  /** Current conuter */
  currentCounter = this.defaultCounter.asObservable();
  /** Function which changes current counter */
  changeCounter(message: number){
   this.defaultCounter.next(message)
  }

  /** Default initialised user */
  private defaultUserC: string = "";
  /** Default user */
  private defaultUser = new BehaviorSubject<string>(this.defaultUserC)
  /** Current user */
  currentUser = this.defaultUser.asObservable();
  /** Function which changes current user */
  changeUser(message: string){
   this.defaultUser.next(message)
  }

  /** Default initialised indicator */
  private defaultIndicatorC: boolean = false;
  /** Default indicator */
  private defaultIndicator = new BehaviorSubject<boolean>(this.defaultIndicatorC)
  /** Current indicator */
  currentIndicator = this.defaultIndicator.asObservable();
  /** Function which changes current indicator */
  changeIndicator(message: boolean){
    this.defaultIndicator.next(message)
  }

  /** Default initialised number of question */
  private defaultQNumberC: number = -1
  /** Default number of question */
  private defaultQNumber = new BehaviorSubject<number>(this.defaultQNumberC);
  /** Current number of question */
  currentQNumber = this.defaultQNumber.asObservable();
  /** Function which changes current number of question */
  changeQNumber(message: number) {
    this.defaultQNumber.next(message)
  }

  /** Default initialised amount player has won */
  private defaultSumC: number = 0
  /** Default amount player has won */
  private defaultSum = new BehaviorSubject<number>(this.defaultSumC);
  /** Current amount player has won */
  currentSum = this.defaultSum.asObservable();
  /** Function which changes current amount player has won */
  changeSum(message: number) {
    this.defaultSum.next(message)
  }

  /** Default initialised value of question */
  private defaultValueOfQuestionC: number = 0
  /** Default value of question */
  private defaultValueOfQuestion = new BehaviorSubject<number>(this.defaultValueOfQuestionC);
  /** Current value of question */
  currentValueOfQuestion = this.defaultValueOfQuestion.asObservable();
  /** Function which changes current value of question */
  changeValueOfQuestion(message: number) {
    this.defaultValueOfQuestion.next(message)
  }

  /** Default initialised number of questions per round */
  private defaultNumberOfQuestionPerRoundC: number = 5
  /** Default number of questions per round */
  private defaultNumberOfQuestionPerRound = new BehaviorSubject<number>(this.defaultNumberOfQuestionPerRoundC);
  /** Current number of questions per round */
  currentNumberOfQuestionPerRound = this.defaultNumberOfQuestionPerRound.asObservable();
  /** Function which changes current number of questions per round */
  changeNumberOfQuestionPerRound(message: number) {
    this.defaultNumberOfQuestionPerRound.next(message)
  }

  /** Default initialised number of fields in choosing question table */
  private defaultFieldC: number = 16
  /** Default number of fields in choosing question table */
  private defaultField = new BehaviorSubject<number>(this.defaultFieldC);
  /** Current number of fields in choosing question table */
  currentField = this.defaultField.asObservable();
  /** Function which changes current number of questions per round */
  changeField(message: number) {
    this.defaultField.next(message)
  }

  /** Default initialised counter of questions per round */
  private defaultcounterPerRoundC: number = 0
  /** Default counter of questions per round */
  private defaultcounterPerRound = new BehaviorSubject<number>(this.defaultcounterPerRoundC);
  /** Current counter of questions per round */
  currentcounterPerRound = this.defaultcounterPerRound.asObservable();
  /** Function which changes current counter of questions per round */
  changecounterPerRound(message: number) {
    this.defaultcounterPerRound.next(message)
  }

  /** Default initialised guaranteed sum player has won */
  private defaultGuaranteedSumC: number = 0
  /** Default guaranteed sum player has won */
  private defaultGuaranteedSum = new BehaviorSubject<number>(this.defaultGuaranteedSumC);
  /** Current guaranteed sum player has won */
  currentGuaranteedSum = this.defaultGuaranteedSum.asObservable();
  /** Function which changes current guaranteed sum player has won */
  changeGuaranteedSum(message: number) {
    this.defaultGuaranteedSum.next(message)
  }

  /** Default initialised number which initialise end of the game */
  private defaultEndOfGameC: number = 0
  /** Default number which initialise end of the game */
  private defaultEndOfGame = new BehaviorSubject<number>(this.defaultEndOfGameC);
  /** Current number which initialise end of the game */
  currentEndOfGame = this.defaultEndOfGame.asObservable();
  /** Function which changes current number which initialise end of the game */
  changeEndOfGame(message: number) {
    this.defaultEndOfGame.next(message)
  }

  /** Default initialised indicator wheather the answer is correct or not */
  private defaultCorrectC: boolean = true
  /** Default indicator wheather the answer is correct or not */
  private defaultCorrect = new BehaviorSubject<boolean>(this.defaultCorrectC);
  /** Current indicator wheather the answer is correct or not */
  currentCorrect = this.defaultCorrect.asObservable();
  /** Function which changes current indicator wheather the answer is correct or not */
  changeCorrect(message: boolean) {
    this.defaultCorrect.next(message)
  }

  /** Default initialised indicator wheather the first replace question help has been used or not */
  private defaultusedReplaceQuestionHelp1C: boolean = false
  /** Default indicator wheather the first replace question help has been used or not */
  private defaultusedReplaceQuestionHelp1 = new BehaviorSubject<boolean>(this.defaultusedReplaceQuestionHelp1C);
 /** Current indicator wheather the first replace question help has been used or not */
  currentusedReplaceQuestionHelp1 = this.defaultusedReplaceQuestionHelp1.asObservable();
  /** Function which changes current indicator wheather the first replace question help has been used or not */
  changeusedReplaceQuestionHelp1(message: boolean) {
    this.defaultusedReplaceQuestionHelp1.next(message)
  }

  /** Default initialised indicator wheather the second replace question help has been used or not */
  private defaultusedReplaceQuestionHelp2C : boolean = false
  /** Default indicator wheather the second replace question help has been used or not */
  private defaultusedReplaceQuestionHelp2 = new BehaviorSubject<boolean>(this.defaultusedReplaceQuestionHelp2C);
  /** Current indicator wheather the second replace question help has been used or not */
  currentusedReplaceQuestionHelp2 = this.defaultusedReplaceQuestionHelp2.asObservable();
  /** Function which changes current indicator wheather the second replace question help has been used or not */
  changeusedReplaceQuestionHelp2(message: boolean) {
    this.defaultusedReplaceQuestionHelp2.next(message)
  }

  /** Default initialised indicator wheather the tender help has been used or not */
  private defaultusedTenderHelpC : boolean = false
  /** Default indicator wheather the tender help has been used or not */
  private defaultusedTenderHelp = new BehaviorSubject<boolean>(this.defaultusedTenderHelpC);
  /** Current indicator wheather the tender help has been used or not */
  currentusedTenderHelp = this.defaultusedTenderHelp.asObservable();
  /** Function which changes current indicator wheather the tender help has been used or not */
  changeusedTenderHelp(message: boolean) {
    this.defaultusedTenderHelp.next(message)
  }
  
  /** Default initialised indicator wheather the game is over or not */
  private GameOverC : boolean = true
  /** Default indicator wheather the game is over or not */
  private defaultGameOver = new BehaviorSubject<boolean>(this.GameOverC);
  /** Current indicator wheather the game is over or not */
  currentGameOver = this.defaultGameOver.asObservable();
  /** Function which changes current indicator wheather the game is over or not */
  changeGameOver(message: boolean) {
    this.defaultGameOver.next(message)
  }
  
  /** Default initialised indicator wheather to redirect player to choosing mode of game */
  private BackToChoosingModeBooleanC : boolean = false
  /** Default indicator wheather to redirect player to choosing mode of game */
  private defaultBackToChoosingModeBoolean = new BehaviorSubject<boolean>(this.BackToChoosingModeBooleanC);
  /** Current indicator wheather to redirect player to choosing mode of game */
  currentBackToChoosingModeBoolean = this.defaultBackToChoosingModeBoolean.asObservable();
  /** Function which changes current indicator wheather to redirect player to choosing mode of game */
  changeBackToChoosingModeBoolean(message: boolean) {
    this.defaultBackToChoosingModeBoolean.next(message)
  }

  /** Default initialised indicator wheather the player is in pratice mode or not */
  private PracticeModeC : boolean = false
  /** Default indicator wheather the player is in pratice mode or not */
  private defaultPracticeMode = new BehaviorSubject<boolean>(this.PracticeModeC);
  /** Current indicator wheather the player is in pratice mode or not */
  currentPracticeMode = this.defaultPracticeMode.asObservable();
  /** Function which changes current indicator wheather the player is in pratice mode or not */
  changePracticeMode(message: boolean) {
    this.defaultPracticeMode.next(message)
  }
}

