import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { $ } from 'protractor';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})


/** profile component*/
export class ProfileComponent {
  url: string = "http://i.pravatar.cc/500?img=7";
  
    /** profile ctor */
  RatingDialogRef: MatDialogRef<RatingComponent>;
  CompleteDialogRef: MatDialogRef<CompleteProfileComponent>;
  constructor(public dialog: MatDialog, public translate: TranslateService) {

    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }
  openRatingDialog() {
    this.RatingDialogRef = this.dialog.open(RatingComponent);


  }

  openCompleteDialog() {
    this.CompleteDialogRef = this.dialog.open(CompleteProfileComponent);


  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

 
  ngOnInit() {
  }
}

