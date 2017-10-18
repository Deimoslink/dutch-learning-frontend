import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BASE_URL} from '../../environments/constants';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {

  baseURL = environment.envName === 'prod' ? BASE_URL : 'http://localhost:3000';

  constructor(private http: Http) { }

  saveNewWord(newWord): Observable<any> {
    return this.http.post(this.baseURL + '/words', newWord);
  }

  deleteWord(id): Observable<any> {
    return this.http.delete(this.baseURL + '/words/' + id);
  }

  getWords(limit, page): Observable<any> {
    return this.http.get(this.baseURL + '/words?_limit=' + limit + '&_page=' + page);
  }

  countFilteredWords(type): Observable<any> {
    return this.http.get(this.baseURL + '/words?part=' + type + '&_start=0&_limit=1');
  }

  getRandomWord(type, number): Observable<any> {
    return this.http.get(this.baseURL + '/words?part=' + type + '&_start=' + number + '&_limit=1');
  }

  getFilteredWords(type): Observable<any> {
    return this.http.get(this.baseURL + '/words?part=' + type);
  }

}
