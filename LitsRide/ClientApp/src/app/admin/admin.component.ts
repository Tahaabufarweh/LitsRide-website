import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PageEvent, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from 'selenium-webdriver/http';
import { User } from '../modelInterfaces';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent {
  /** admin ctor */

  
  public allTrips;
  public all;
  public allUsers;
  public users;
  public allReports;
  public totalReports;
  public reports;
  totalusers;
  filter = new FormControl("");
  constructor(private authService: AuthService,
    private tripsService: TripsService,
    public translate: TranslateService,
    public userService: UserService,
    public adminService: AdminService,
    private router: Router,) {
      this.authService.checkLogin();
  }
  ngOnInit() {
    this.getAlltrips({}, 1, 5);
    
    this.getAllUsers(this.filter.value, 1, 5);
    this.getAllreports(1, 5);
    
  }
  

  public getAlltrips(filter = {} as any, pageNo, pageSize) {
    this.tripsService.getAllTrips(filter, pageNo, pageSize).subscribe(response => {
      this.all = response;
      this.allTrips = this.all.trips;
      console.log(this.allTrips);

    }, error => {
      console.log(error)
    })
  }
    
  public getAllreports(pageNo, pageSize) {
    this.adminService.getReports(pageNo, pageSize).subscribe(response => {
      this.allReports = response;
      this.reports = this.allReports.reports;
      this.totalReports = this.allReports.totalReports;
      console.log(this.allReports);
      console.log(this.totalReports);
    }, error => {
      console.log("failed")
    })
  }
  
 rce;
 
  public getAllUsers(filter,pageno, pagesize) {
    this.userService.getUsers(filter,pageno, pagesize).subscribe(res => {
      this.allUsers = res;
      this.users = this.allUsers.users;
      this.totalusers = this.allUsers.totalUsers;
      console.log(this.totalusers);
      console.log(this.users);

   
    }), error => {
      console.log("failedd");
      }

  }
  onPageChanged(page: PageEvent) {
    console.log(page);
    this.getAllUsers(this.filter.value, page.pageIndex + 1, page.pageSize)
  }

  tripsPageChanged(page: PageEvent) {
    console.log(page);
    this.getAlltrips({}, page.pageIndex + 1, page.pageSize)
  }

  reportsPageChanged(page: PageEvent) {
    console.log(page);
    this.getAllreports(page.pageIndex + 1, page.pageSize)
  }
  
  
  applyUserFilter(filterValue: string) {
    
    this.getAllUsers(filterValue.trim().toLowerCase(),1,2);
    
  }

 
  
}


