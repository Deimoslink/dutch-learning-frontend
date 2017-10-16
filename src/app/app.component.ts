import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

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

  constructor(private fb: FormBuilder, private http: Http) {

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
    console.log(this.newWord);
    this.newWord = {
      eng: '',
      rus: '',
      ned: '',
      part: ''
    };
  }

  getWords() {
    console.log('get words');
  }

  ngOnInit() {

  }

}
