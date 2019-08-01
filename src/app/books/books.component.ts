import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BooksService } from './books.service';
import { BookModel } from '../models/book.model';
import { Subscription } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { WishlistService } from '../wishlist/wishlist.service';
import { BookModalModeEnum } from '../enums/book-modal-mode.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
    userName: string;
    books: BookModel[];
    booksSubscription: Subscription;
    searchText: string;
    selectedBook: BookModel;

    cardModalIdentifier = "cardModalIdentifier";
    modalMode: BookModalModeEnum = BookModalModeEnum.BOOKLIST;

    constructor(private authService: AuthService, 
        private router: Router, 
        private bookService: BooksService,
        private wishlistService: WishlistService,
        private toastr: ToastrService,
        public ngxSmartModalService: NgxSmartModalService) {
            if (!this.authService.getUser()) {
                this.router.navigate(['/']);
                return;
            }
        }

    ngOnInit(): void {
        this.userName = this.authService.getUser().userName;
        this.booksSubscription = this.bookService.booksChanged.subscribe((books: BookModel[]) =>{
            this.books = books;
        })
        this.books = this.bookService.books;
        this.searchText = this.bookService.getSearchText();
    }

    onSearch($event) {
        if (!$event) {
            return;
        }
        this.bookService.search($event);
    }
    ngOnDestroy(): void {
        if(this.booksSubscription) {
            this.booksSubscription.unsubscribe();
        }
    }

    onSelectBook(book: BookModel) {
        this.selectedBook = book;
        this.ngxSmartModalService.getModal(this.cardModalIdentifier).open();
    }

    onClickAddToWishlist(book: BookModel) {
        let res = this.wishlistService.pushTohWishlist(book);
        res ? this.toastr.success("Added To Wishlist",book.title) : this.toastr.info("Already In Wishlist", book.title);
    }
}
