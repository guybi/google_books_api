import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  navbarOpen = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authenticatedSubject.subscribe(res => {
      this.isAuthenticated = res;
    })
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
