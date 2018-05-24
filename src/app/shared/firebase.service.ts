import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FirebaseService {

  constructor(private http: Http) { }

  saveNewWord(newWord) {
    const body = JSON.stringify(newWord);
    return this.http.post('https://testfirebaseproject-39110.firebaseio.com/words.json', body).map(res => res.json());
  }

}
