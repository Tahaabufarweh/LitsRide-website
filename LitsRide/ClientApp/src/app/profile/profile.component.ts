import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { $ } from 'protractor';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import { DataSource, ArrayDataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { User } from '../modelInterfaces';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


/** profile component*/
export class ProfileComponent implements OnInit {
 
  displayedColumns = ['fullName', 'username', 'email', 'password'];  
  url: string = "http://i.pravatar.cc/500?img=7";
  user = {} as any;
 
  /** profile ctor */
  RatingDialogRef: MatDialogRef<RatingComponent>;
  CompleteDialogRef: MatDialogRef<CompleteProfileComponent>;
  constructor(public dialog: MatDialog, private userService: UserService, public translate: TranslateService, private authService: AuthService, private router: ActivatedRoute) {
    this.authService.checkLogin();
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');
  }

  ngOnInit() {
    this.router.params.subscribe(param => { 
      this.userService.getUserDetialsById(param.id).subscribe(response => {
      this.user = response;
      console.log(this.user);
    })
    })
  }
 
  tripElements = ['From', 'To', 'Start Time', 'Status', 'Is Arrived'];
  requestElements = ['Request Date', 'Passenger Note', 'Status', 'Payment Method'];
  ratingElements = ['Username', 'Rate', 'Note'];
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

  

}


  
