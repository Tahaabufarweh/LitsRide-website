import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
/** profile component*/
export class ProfileComponent {
    /** profile ctor */
  fileNameDialogRef: MatDialogRef<RatingComponent>;
  constructor(public dialog: MatDialog, public translate: TranslateService) {

    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }
  openDialog() {
    this.fileNameDialogRef = this.dialog.open(RatingComponent);


  }
  ngOnInit() {
  }
}
