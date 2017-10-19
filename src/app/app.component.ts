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
  public checkWordForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {

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


  checkRandomWord(e) {
    e.preventDefault();
    console.log('check random word');
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

  ngOnInit() {
  }

}
