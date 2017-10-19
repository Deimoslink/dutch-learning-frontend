import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiService} from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  partsOfSpeech = ['pronoun', 'noun', 'verb', 'adjective', 'adverb', 'subordinate', 'preposition'];
  langs = ['eng', 'rus', 'ned'];
  targetWordIsSet = false;
  checkDone = false;
  errorStatus = {
    eng: false,
    rus: false,
    ned: false
  };
  checkWord = {
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  targetWord = {
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  checkFilter = {
    eng: true,
    rus: true,
    ned: false
  };

  statistics = {
    mistakes: 0,
    rightAnswers: 0,
    wordsGenerated: 0,
    attempts: 0
  };

  public checkWordForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {

    this.checkWordForm = fb.group({
      'eng': new FormControl({value: null, disabled: false},
        Validators.required),
      'rus': new FormControl({value: null, disabled: false},
        Validators.required),
      'ned': new FormControl({value: null, disabled: false},
        Validators.required),
      'part': new FormControl({value: null, disabled: false})
    });
  }

  checkRandomWord(e) {
    e.preventDefault();
    console.log('check triggered');
    this.statistics.attempts++;
    let answers = [];
    this.langs.forEach(l => {
      this.errorStatus[l] = !(this.checkWord[l] === this.targetWord[l]);
      answers.push(!(this.checkWord[l] === this.targetWord[l]));
    });
    if (answers.some(el => {return el; })) {
      this.statistics.mistakes++;
    } else {
      this.statistics.rightAnswers++;
    }
    this.checkDone = true;
  }


  randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  filterTagretedWord(target) {
    this.langs.forEach(l => {
      if (this.checkFilter[l]) {
        this.checkWord[l] = target[l];
      } else {
        this.checkWord[l] = '';
      }
    });
  }

  getRandomWord(e, type) {
    e.preventDefault();
    this.api.countFilteredWords(type).subscribe(res => {
      let totalElems = res.headers.get('x-total-count');
      let random = this.randomInteger(0, totalElems - 1);
      this.api.getRandomWord(type, random).subscribe(res2 => {
        this.targetWord = JSON.parse(res2._body)[0];
        this.filterTagretedWord(this.targetWord);
        this.errorStatus = {
          eng: false,
          rus: false,
          ned: false
        };
        this.checkDone = false;
        this.targetWordIsSet = true;
        this.statistics.wordsGenerated++;
      }, err2 => { console.log(err2); });
    }, err => { console.log(err); });
  }

  ngOnInit() {
  }

}
