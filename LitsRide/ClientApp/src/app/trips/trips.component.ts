import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, PageEvent } from '@angular/material';
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
  public filter;
    /** trips ctor */
  fileNameDialogRef: MatDialogRef<FilteringComponent>;

  constructor(public dialog: MatDialog, private tripsService: TripsService, public translate: TranslateService, private authService: AuthService, private router: Router) {
    this.authService.checkLogin();
  }


  ngOnInit() {
    this.fillTable({}, 1, 10);
  }

  fillTable(filter = {} as any, pageNo , pageSize) {
    this.tripsService.getAllTrips(filter, pageNo, pageSize).subscribe(response => {
      this.allTrips = response;
    }, error => {
      console.log(error)
    })
  }

  navigateToDetails(id) { }
  rideTrip(id) { }

  onPageChanged(page: PageEvent) {
    console.log(page);
    this.fillTable({}, page.pageIndex + 1, page.pageSize)
  }


  openDialog() {
    this.fileNameDialogRef = this.dialog.open(FilteringComponent);
    this.fileNameDialogRef.afterClosed().subscribe(
      data => this.fillTable(data , 1 , 10)
    );    
  }
    
}
