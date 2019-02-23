import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/login', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/admin', title: 'User Profile', icon: 'person', class: '' },
  { path: '/register', title: 'Login', icon: 'content_paste', class: '' },
  { path: '/new-trip', title: 'Trips', icon: 'content_paste', class: '' },
  { path: '/trips', title: 'signup', icon: 'library_books', class: '' },
  { path: '/profile', title: 'signup', icon: 'library_books', class: '' },
  { path: '/rating', title: 'signup', icon: 'library_books', class: '' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  title = 'app';
}
