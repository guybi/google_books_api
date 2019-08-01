import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { BookListComponent } from './book-list/book-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BooksComponent,
    SearchComponent,
    BookListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule,
    SharedModule,
  ],  
  providers: [ 
  ],
})
export class BooksModule { }
