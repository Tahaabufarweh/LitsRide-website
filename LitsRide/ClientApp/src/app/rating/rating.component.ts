import { Component } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
/** rating component*/
export class RatingComponent {
  ratingValue;
  constructor() { this.ratingValue = 10; }

}
