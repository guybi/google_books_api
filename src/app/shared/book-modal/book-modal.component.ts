import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookModel } from 'src/app/models/book.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BookModalModeEnum } from 'src/app/enums/book-modal-mode.enum';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {

  @Input() book: BookModel;
  @Input() modalMode: BookModalModeEnum = BookModalModeEnum.BOOKLIST;
  @Output() addToWishlistEvent = new EventEmitter<BookModel>();
  @Output() removeFromWishlistEvent = new EventEmitter<BookModel>();

  readonly BOOKLIST = BookModalModeEnum.BOOKLIST;
  readonly WISHLIST = BookModalModeEnum.WISHLIST;
  constructor(private ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
  }

  onClickAddToWishlist() {
    this.ngxSmartModalService.getModal("cardModalIdentifier").close();
    this.addToWishlistEvent.emit(this.book);
  }
  
  onClickRemoveBook() {
    this.ngxSmartModalService.getModal("cardModalIdentifier").close();
    this.removeFromWishlistEvent.emit(this.book);
  }


}
