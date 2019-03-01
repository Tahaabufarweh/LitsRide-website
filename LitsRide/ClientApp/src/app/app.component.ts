import { Component, OnInit, Input } from '@angular/core';
import { InternationalizationService } from './services/internationalization.service';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(public translate: TranslateService, private internationalizationService: InternationalizationService) {
    translate.addLangs(['en', 'fr', 'ar']);
    this.translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== undefined ? localStorage.getItem('lang') : 'en');

   }
  changelang(value) {
    console.log(value)
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }

  setPrefLang(value) {
    localStorage.setItem('lang', value);
  }

  title = 'app';
  isRtl() {
    
    return localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== undefined ?
      (localStorage.getItem('lang') !== "ar"? "ltr" : "rtl") : "ltr" ;
  }
  
}
