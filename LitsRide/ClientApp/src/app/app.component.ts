import { Component, OnInit, Input } from '@angular/core';
import { InternationalizationService } from './services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  { path: '/new-trip', title:'New Trip', icon: 'directions_car', class: '' },
  { path: '/trips', title: 'Trips', icon: 'card_travel', class: '' },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menuItems: any[];
  
  @Input() themeColor = '';

  constructor(public translate: TranslateService, private authService: AuthService, private router: Router , private langService : InternationalizationService) {

    this.langService.getLanguage()
    this.authService.checkLogin();
  }
  
  isLoginOrSignUp() {
    if (this.router.url == "/register" || this.router.url == "/login") {
      return true;
    }
    return false;
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  setPrefLang(value) {
    this.langService.setLang(value)
  }

  title = 'app';
  isRtl() {
    return this.langService.isRtl();
  }
  
}
