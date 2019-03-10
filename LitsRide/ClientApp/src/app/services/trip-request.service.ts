import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'api/TripRequests/'
const rola = 'NewRequest/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class TripRequestService {
  constructor(private http: HttpClient) {

  }
  rideTrip(id: number) {
    return this.http.get(baseUrl + rola + id);

  }
}
