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

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent implements AfterViewInit{
  /** admin ctor */

  
  public allTrips;
  public allUsers;
  public allReports;
  
  data;

  totalusers ;
  isLoadingResults = true;
  isRateLimitReached = false;
  constructor(private authService: AuthService,
    private tripsService: TripsService,
    public translate: TranslateService,
    public userService: UserService,
    public adminService: AdminService,
    private router: Router,) {
      this.authService.checkLogin();
  }
  ngOnInit() {
    this.fillTable({}, 1, 10);
    this.getAllOwners(1,2);
    
  }
  onPageChanged(page: PageEvent) {
    console.log(page);
    this.getAllOwners(page.pageIndex + 1, page.pageSize)
  }

  fillTable(filter = {} as any, pageNo, pageSize) {
    this.tripsService.getAllTrips(filter, pageNo, pageSize).subscribe(response => {
      this.allTrips = response;
      console.log(this.allTrips);
      this.tripDataSource = new MatTableDataSource(this.allTrips.trips);
      this.tripDataSource.paginator = this.paginator2;
      this.tripDataSource.sort = this.sort2;
    }, error => {
      console.log(error)
      })

    //this.userService.getUsers().subscribe(response => {
    //  this.allUsers = response;
    //  this.dataSource = new MatTableDataSource(this.allUsers);
    //  this.dataSource.paginator = this.paginator;
    //  this.dataSource.sort = this.sort;
    //  console.log(this.dataSource);
    //}, error => {
    //  console.log(error)
    //  })

    this.adminService.getReports().subscribe(response => {
      this.allReports = response;
      this.reportDataSource = new MatTableDataSource(this.allReports);
      this.reportDataSource.paginator = this.paginator3;
      this.reportDataSource.sort = this.sort3;
      console.log(this.reportDataSource);
    }, error => {
      console.log(error)
    })
  }
  searchTrip()
  {
    this.fillTable({}, 1, 10);
  }
 
  usersColumns: string[] = ['ID', 'Username', 'FullName', 'Email', 'Country', 'Gender', 'Mobile'];
  displayedColumns: string[] = ['ID', 'driverId', 'fromDest', 'toDest', 'isArrived', 'startTime', 'arriveTime'];
  reportColumns: string[] = ['ID', 'userId', 'reportedUser', 'reportType', 'note'];
  dataSource = this.data;
  tripDataSource;
  reportDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator2: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;

  @ViewChild(MatPaginator) paginator3: MatPaginator;
  @ViewChild(MatSort) sort3: MatSort;
  public getAllOwners(pageno, pagesize) {
    this.userService.getUsers(pageno, pagesize).subscribe(res => {
        this.allUsers = res;
      this.dataSource = new MatTableDataSource(this.allUsers.users);
      this.dataSource.paginator = this.paginator;
      this.totalusers = this.allUsers.totalUsers;
      console.log(this.totalusers);
      console.log(this.dataSource)
    }), error => {
      console.log("failedd");
      }

  }
  ngAfterViewInit(): void {
   
    
  }
  
  applyUserFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyTripFilter(filterValue: string) {
    this.tripDataSource.filter = filterValue.trim().toLowerCase();
    if (this.tripDataSource.paginator) {
      this.tripDataSource.paginator.firstPage();
    }
  }
}


