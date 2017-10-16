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

  getWords(): Observable<any> {
    return this.http.get(this.baseURL + '/words');
  }

}
