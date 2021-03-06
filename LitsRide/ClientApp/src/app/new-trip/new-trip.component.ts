import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { TripsService } from '../services/trips.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { error } from 'util';


@Component({
    selector: 'app-new-trip',
    templateUrl: './new-trip.component.html',
    styleUrls: ['./new-trip.component.scss']
})
/** new-trip component*/
export class NewTripComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  test: Date = new Date();
  focus;
  focus1;
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @ViewChild("placesRef") placesRef1: GooglePlaceDirective;

  public handleFromAddressChange(address) {
 
    this.fromDestination.setValue(address.formatted_address)
  }

  public handleToAddressChange(address) {
   
    this.toDestination.setValue(address.formatted_address)
  }
  constructor(public translate: TranslateService, private tripsService: TripsService, private authService: AuthService, private route: Router, private notificationService: NotificationService) {
    this.authService.checkLogin();
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }

  ngOnInit() {

  }
  TripsForm = new FormGroup({
    fromDestination: new FormControl('', Validators.required),
    toDestination: new FormControl('', Validators.required),
    StartTime: new FormControl(new Date(), Validators.required),
    ExpectedArrivalTime: new FormControl(new Date()),
    Details: new FormControl(''),
    CarInfo: new FormControl('', Validators.required),
    Price: new FormControl(0),
    seatsNo: new FormControl(0, Validators.required),
    carNo: new FormControl('', Validators.required),
    driverId: new FormControl(0)
  })

  get fromDestination() {
    return this.TripsForm.get('fromDestination') as FormControl
  }
  get toDestination() {
    return this.TripsForm.get('toDestination') as FormControl
  }
  get StartTime() {
    return this.TripsForm.get('StartTime') as FormControl
  }
  get ExpectedArrivalTime() {
    return this.TripsForm.get('ExpectedArrivalTime') as FormControl
  }
  get Details() {
    return this.TripsForm.get('Details') as FormControl
  }
  get Price() {
    return this.TripsForm.get('Price') as FormControl
  }
  get CarInfo() {
    return this.TripsForm.get('CarInfo') as FormControl
  }
  get seatsNo() {
    return this.TripsForm.get('seatsNo') as FormControl
  }
  get carNo() {
    return this.TripsForm.get('carNo') as FormControl
  }
  get driverId() {
    return this.TripsForm.get('driverId') as FormControl
  }

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'short',
    defaultOpen: false
  }
  changeDate() {
    console.log("angular")
    console.log(this.TripsForm)
  }

  //setStartTime(event: Date) {

  //}

  //setExpectedArrivalTime(event: Date) {

  //}
  submitTrip() {
    
  
    this.driverId.setValue(this.authService.getLoggedInUserId());
    this.StartTime.setValue(new Date(this.StartTime.value));
    this.ExpectedArrivalTime.setValue(new Date(this.ExpectedArrivalTime.value));
    console.log(this.StartTime.value);
    console.log(this.ExpectedArrivalTime.value);
    console.log(JSON.stringify(this.TripsForm.value));
    this.tripsService.createNewTrip(this.TripsForm.value).subscribe(response => {
      console.log(response);
      this.notificationService.createNotificationService('success', 'Trip added', 'Your trip has been added successfully');
      this.route.navigate(["/trips"]);
    }, error => {
        this.notificationService.createNotificationService('danger', 'Erorr!', '');

      })
  }
}
