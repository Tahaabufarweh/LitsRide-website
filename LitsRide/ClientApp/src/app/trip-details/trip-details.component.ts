import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  constructor(public translate: TranslateService, private authService: AuthService) {
    this.authService.checkLogin()

  }

  ngOnInit() {
  }

}
