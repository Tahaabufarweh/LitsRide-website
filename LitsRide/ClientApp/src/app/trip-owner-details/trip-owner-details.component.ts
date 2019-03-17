import { Component, Input, OnInit } from '@angular/core';
import { TripDetailsComponent } from '../trip-details/trip-details.component';
import { TranslateService } from '@ngx-translate/core';
import { TripRequestService } from '../services/trip-request.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-trip-owner-details',
    templateUrl: './trip-owner-details.component.html',
    styleUrls: ['./trip-owner-details.component.scss']
})
/** trip-owner-details component*/
export class TripOwnerDetailsComponent implements OnInit {
  @Input() requests;
  public tripRequests;
  /** trip-owner-details ctor */
  constructor(private userService: UserService,
    public translate: TranslateService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private requestService: TripRequestService, 
    private notificationService: NotificationService) {

  }
  ngOnInit() {
    this.tripRequests = this.requests;
    console.log(this.requests)
  }

  acceptOrReject(requestId, status)
  {
    console.log(requestId);
    this.requestService.AcceptOrApproveRequest(Number(requestId), Number(status));
  }
  deleteRequest(requestId, status) {
    console.log(requestId);
    this.requestService.AcceptOrApproveRequest(Number(requestId), Number(status));
  }
}
