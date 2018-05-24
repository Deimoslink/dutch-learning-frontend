import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-words-table',
  templateUrl: './words-table.component.html',
  styleUrls: ['./words-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WordsTableComponent implements OnInit {

  totalPages: number;
  words = [];
  list: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.list = db.list('/words', ref => ref.limitToFirst(5)).snapshotChanges();
  }

  refreshNumber(e) {

  }

  deleteWord(id) {
    this.db.list('/words').remove(id).then(res => console.log(res));
  }

  ngOnInit() {
    this.list.subscribe(res => {
      this.words = res.map(item => {
        const word = item.payload.toJSON();
        word['id'] = item.key;
        return word;
      });
    });
  }

}
