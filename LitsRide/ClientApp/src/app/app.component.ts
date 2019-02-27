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
    const browserLang = translate.getBrowserLang();
    translate.use(InternationalizationService.lang);
  }
  changelang(value) {
    console.log(value)
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  title = 'app';
  isRtl() {
    return InternationalizationService.lang == 'ar' ? "rtl" : "ltr";
  }
  
}
