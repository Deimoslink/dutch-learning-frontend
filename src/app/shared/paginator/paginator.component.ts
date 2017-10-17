import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() number;
  @Input() totalPages;
  @Output() refreshNumber: EventEmitter<any> = new EventEmitter();

  sliceBtnsFrom = 0;
  sliceBtnsTo = 5;
  pagesArray = [];

  constructor() { }

  refreshView() {
    if (this.totalPages > 5) { // happens when there are more than 5 pages
      if (this.number <= 2) { // if page 1 or 2 selected
        this.sliceBtnsFrom = 0; // then it doesn't make shift in the button array
        this.sliceBtnsTo = 5; // it sets the button array at its start
      }
      if (this.number > 2) { // if pages from middle selected
        this.sliceBtnsFrom = this.number - 2; // then is moves the button array so that the current page could be right in the middle
        this.sliceBtnsTo = this.number + 3;
      }
      if (this.number >= this.totalPages - 2) { // if the last or previous to the last page selected
        this.sliceBtnsFrom = this.totalPages - 5; // then it doesn't make shift in in the button array
        this.sliceBtnsTo = this.totalPages; // it sets the button array at its end
      }
    } else { // happens when there are less than 5 pages
      this.sliceBtnsFrom = 0; // it shows the entire button array
      this.sliceBtnsTo = this.totalPages;
    }
    this.refreshNumber.emit(this.number);
  }


  changePage(num) {
    if (num < 0) {
      this.number = 0;
      return;
    }
    if (num > this.totalPages - 1) {
      return;
    }
    if (num === this.number) {
      return;
    }
    this.number = num;
    this.refreshView();
  }


  ngOnInit() {
  }

  ngOnChanges() {
    this.pagesArray = Array(this.totalPages).fill('').map((x, i) => i);
    this.refreshView();
  }

}
