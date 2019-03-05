import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FilteringComponent } from '../filtering/filtering.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isNullOrUndefined, error } from 'util';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss']
})
/** trips component*/
export class TripsComponent implements OnInit {

  public allTrips;
    /** trips ctor */
  fileNameDialogRef: MatDialogRef<FilteringComponent>;

  constructor(public dialog: MatDialog, private tripsService: TripsService, public translate: TranslateService, private authService: AuthService, private router: Router) {
    this.authService.checkLogin();
  }


  ngOnInit() {
    this.tripsService.getAllTrips().subscribe(response => {
      this.allTrips = response;
    }, error => {
      console.log(error)
      })
  }
  
  openDialog() {
    this.fileNameDialogRef = this.dialog.open(FilteringComponent);
  }
    
}
