import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { ActivatedRoute } from '@angular/router';
import { TripRequestService } from '../services/trip-request.service';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {
  public Trip;
  constructor(public translate: TranslateService,
              private router: ActivatedRoute,
              private authService: AuthService,
    private tripService: TripsService,
    private tripRequestTrip: TripRequestService
  ) {
    this.authService.checkLogin()

  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.tripService.getTripById(params.id).subscribe(response => {
        this.Trip = response;
        console.log(this.Trip);
      })
    })
  }

  rideTrip() {
    this.tripRequestTrip.rideTrip(this.Trip.id).
  }
}
