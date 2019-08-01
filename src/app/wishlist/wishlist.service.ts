import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistRemoveBookSubject = new Subject<BookModel>();
  private wishlist: BookModel[] = [];
  constructor() { }

  getWishlist() {
    return this.wishlist.slice();
  }

  pushTohWishlist(book: BookModel) {
    const bookAlreadyInWishlist = this.wishlist.findIndex(element => element.id == book.id);
    if (bookAlreadyInWishlist == -1) {
      this.wishlist.push(book);
    }
    return bookAlreadyInWishlist == -1; // added - return true; 
  }

  removeFromWishlist(book: BookModel) {
    const res: BookModel = this.wishlist.splice(this.wishlist.findIndex(element => element.id == book.id), 1)[0];
    this.wishlistRemoveBookSubject.next(book);
    return res.id == book.id;
  }
}
