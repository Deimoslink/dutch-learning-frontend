import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WordsTableComponent implements OnInit {

  wordsPerPage = 5;
  totalWords: number;
  totalPages: number;
  words = [];

  constructor(private api: ApiService) { }

  refreshNumber(e) {
    this.getWords(this.wordsPerPage, e + 1);
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

  ngOnInit() {
    this.getWords(this.wordsPerPage, 1);
  }

}
