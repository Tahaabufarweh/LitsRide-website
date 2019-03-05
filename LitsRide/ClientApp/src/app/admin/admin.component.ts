import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent {
  /** admin ctor */
  constructor(private authService: AuthService) {
      this.authService.checkLogin();
    }
}
