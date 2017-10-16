import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiService} from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newWord = {
    eng: '',
    rus: '',
    ned: '',
    part: ''
  };
  words = [];
  public wordForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {

    this.wordForm = fb.group({
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
      console.log(res);
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

  getWords() {
    this.api.getWords().subscribe(res => {
      console.log(res._body);
      this.words = JSON.parse(res._body);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {

  }

}
