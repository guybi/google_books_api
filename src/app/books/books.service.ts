import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';
import { WishlistService } from '../wishlist/wishlist.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  url = "https://www.googleapis.com/books/v1/volumes?q=";
  
  books: BookModel[];
  private searchText: string = '';
  booksChanged = new Subject<BookModel[]>();

  constructor(private httpClient: HttpClient, 
          private wishlistService: WishlistService) { 
  }

  search(text: string) {
    this.searchText = text;
    this.httpClient.get(this.url+text+`&maxResults=20`).subscribe((res: any) => {
      this.setBooks(res.items);
      this.booksChanged.next(this.books.slice());
    })  
  }

  setBooks(res) {
    this.books = res.map(book => {
      return {
        id: book.id,
        selfLink: book.selfLink,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publishedDate: book.volumeInfo.publishedDate,
        pageCount: book.volumeInfo.pageCount,
        categories: book.volumeInfo.categories,
        imageLinks: this.extractImage(book),
        language: book.volumeInfo.language,
      }
    })
  }

  extractImage(book) {
    if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail) {
      return book.volumeInfo.imageLinks.smallThumbnail;
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcB_AhqIKo-khmdiva0r9mobPEh0aGyU0GQcF23xug2jmwE8u6xw'
  }



  getSearchText() {
    return this.searchText;
  }

  setSearchText(searchText: string) {
    this.searchText = searchText;
  }

  addBookToWishlist(book: BookModel) {
    let res = this.wishlistService.pushTohWishlist(book);
    console.log(res);
  }
}
