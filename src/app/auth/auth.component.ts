import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoading = false;
  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = false;
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const userName = form.value.userName;
    this.isLoading = true;
    setTimeout(()=> {
      let user = new UserModel();
      user.userName = userName;
      this.authService.setUser(user);
      this.authService.login()
      this.router.navigate(['/books']);
    },500)
    form.reset();
  }


}
