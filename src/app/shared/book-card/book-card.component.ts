import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { BookModalModeEnum } from 'src/app/enums/book-modal-mode.enum';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: BookModel;
  @Input() modalMode: BookModalModeEnum;

  @Output() selectBookEvent = new EventEmitter<BookModel>();
  @Output() removeBookEvent = new EventEmitter<BookModel>();

  readonly WISHLIST = BookModalModeEnum.WISHLIST;
  constructor() { }

  ngOnInit() {
  }

  onClickCard() {
    this.selectBookEvent.emit(this.book);
  }

  onClickRemoveBook() {
    this.removeBookEvent.emit(this.book);
  }
}
