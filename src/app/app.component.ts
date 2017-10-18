import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiService} from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  partsOfSpeech = ['pronoun', 'noun', 'verb', 'adjective', 'adverb', 'subordinate', 'preposition'];
  newWord = {
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  checkWord = {
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  wordsPerPage = 5;
  totalWords: number;
  totalPages: number;
  words = [];
  public addWordForm: FormGroup;
  public checkWordForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {

    this.addWordForm = fb.group({
      'eng': new FormControl({value: null, disabled: false},
        Validators.required),
      'rus': new FormControl({value: null, disabled: false},
        Validators.required),
      'ned': new FormControl({value: null, disabled: false},
        Validators.required),
      'part': new FormControl({value: null, disabled: false},
        Validators.required)
    });

    this.checkWordForm = fb.group({
      'eng': new FormControl({value: null, disabled: false},
        Validators.required),
      'rus': new FormControl({value: null, disabled: false},
        Validators.required),
      'ned': new FormControl({value: null, disabled: false},
        Validators.required),
      'part': new FormControl({value: null, disabled: false},
        Validators.required)
    });
  }

  sendWord() {
    this.api.saveNewWord(this.newWord).subscribe(res => {
      this.words.push(JSON.parse(res._body));
      this.newWord = {
        eng: '',
        rus: '',
        ned: '',
        part: ''
      };
    }, err => {
      console.log(err);
    });
  }


  checkRandomWord(e) {
    e.preventDefault();
    console.log('check random word');
  }

  deleteWord(id) {
    this.api.deleteWord(id).subscribe(res => {
      console.log(res);
      this.words.forEach((el, index) => {
        if (el.id === id) {
          this.words.splice(index, 1);
          return;
        }
      });
    }, err => {
      console.log(err);
    });
  }

  getWords(limit, page) {
    this.api.getWords(limit, page).subscribe(res => {
      this.totalWords = res.headers.get('x-total-count');
      this.totalPages = Math.ceil(this.totalWords / this.wordsPerPage);
      this.words = JSON.parse(res._body);
      console.log('total pages', this.totalPages);
    }, err => {
      console.log(err);
    });
  }

  randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  getRandomWord(e, type) {
    e.preventDefault();
    this.api.countFilteredWords(type).subscribe(res => {
      let totalElems = res.headers.get('x-total-count');
      let random = this.randomInteger(0, totalElems - 1);
      this.api.getRandomWord(type, random).subscribe(res2 => {
        console.log(JSON.parse(res2._body)[0]);
        this.checkWord = JSON.parse(res2._body)[0];
      }, err2 => { console.log(err2); });
    }, err => { console.log(err); });
  }

  refreshNumber(e) {
    this.getWords(this.wordsPerPage, e + 1);
  }

  ngOnInit() {
    this.getWords(this.wordsPerPage, 1);
  }

}
