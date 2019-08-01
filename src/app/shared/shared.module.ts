import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    BookCardComponent,
    BookModalComponent,
  ],
  imports: [
      CommonModule,
      NgxSmartModalModule.forRoot()
    ],
  exports: [
    LoadingSpinnerComponent,
    CommonModule,
    BookCardComponent,
    BookModalComponent,
  ]
})
export class SharedModule {}
