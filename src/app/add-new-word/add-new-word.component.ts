import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-add-new-word',
  templateUrl: './add-new-word.component.html',
  styleUrls: ['./add-new-word.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNewWordComponent implements OnInit {
  partsOfSpeech = ['pronoun', 'noun', 'verb', 'adjective', 'adverb', 'subordinate', 'preposition'];
  newWord = {
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  public addWordForm: FormGroup;

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
  }

  sendWord() {
    this.api.saveNewWord(this.newWord).subscribe(res => {
      console.log('new word is ', JSON.parse(res._body));
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

  ngOnInit() {
  }

}
