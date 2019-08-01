import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  
  private user: UserModel;
  
  authenticatedSubject = new Subject<boolean>();
  authenticatedSubscription: Subscription;
  constructor() { }
  
  setUser(user: UserModel) {
    this.user = user;
  }
  
  getUser() {
    return this.user;
  }
  
  login() {
    this.authenticatedSubject.next(true);
  }
}
