import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FilteringComponent } from '../filtering/filtering.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
/** trips component*/
export class TripsComponent {
    /** trips ctor */
  fileNameDialogRef: MatDialogRef<FilteringComponent>;
  constructor(public dialog: MatDialog, public translate: TranslateService) {

    translate.use(InternationalizationService.lang);
  }

  openDialog() {
    this.fileNameDialogRef = this.dialog.open(FilteringComponent);


  }
    
}
