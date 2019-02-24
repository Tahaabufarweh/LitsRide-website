import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
/** profile component*/
export class ProfileComponent {
    /** profile ctor */
  fileNameDialogRef: MatDialogRef<RatingComponent>;
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.fileNameDialogRef = this.dialog.open(RatingComponent);


  }
  ngOnInit() {
  }
}
