import { Component, OnInit, OnDestroy } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { Subscription } from 'rxjs';
import { BookModel } from '../models/book.model';
import { BookModalModeEnum } from '../enums/book-modal-mode.enum';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  
  wishlistRemoveBookSubscription: Subscription;
  wishlist: BookModel[] = [];
  modalMode = BookModalModeEnum.WISHLIST;
  selectedBook: BookModel;
  
  constructor(private wishlistService: WishlistService,
    private ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService) { 
    }
    
    ngOnInit() {
      this.wishlist = this.wishlistService.getWishlist();
      this.wishlistRemoveBookSubscription = this.wishlistService.wishlistRemoveBookSubject.subscribe((book: BookModel) => {
        this.wishlist.splice(this.wishlist.findIndex(item => item.id == book.id ), 1);
      })
    }
    
    
    onSelectBook(book: BookModel) {
      this.selectedBook = book;
      this.ngxSmartModalService.getModal("cardModalIdentifier").open();
    }
    
    onClickRemoveFromWishlist(book: BookModel) {
      if (this.wishlistService.removeFromWishlist(book)) {
        this.toastr.success("Removed From Wishlist",book.title);
      }
    }

    ngOnDestroy(): void {
      this.wishlistRemoveBookSubscription.unsubscribe();
    }
  }
  