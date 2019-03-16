import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-trip-owner-details',
    templateUrl: './trip-owner-details.component.html',
    styleUrls: ['./trip-owner-details.component.scss']
})
/** trip-owner-details component*/
export class TripOwnerDetailsComponent {
  @Input() requests;

    /** trip-owner-details ctor */
    constructor() {

    }
}
