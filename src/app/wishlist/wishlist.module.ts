import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WishlistRoutingModule } from './wishlist-routing.mosule';
import { WishlistComponent } from './wishlist.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
      WishlistComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WishlistRoutingModule
  ],
  providers: []
})
export class WishlistModule { }
