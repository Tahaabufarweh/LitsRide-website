import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'api/TripRequests/'
const newRequest = 'NewRequest/';
const approveOrRejectRequestRoute = 'ApproveOrRejectRequest/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class TripRequestService {
  constructor(private http: HttpClient) {

  }
  createRate(ride, tripid) {
    console.log(tripid);
    return this.http.post(baseUrl + newRequest + "?tripid=" + tripid, JSON.stringify(ride), httpOptions);
  }

  AcceptOrApproveRequest(requestId, status) {
    this.http.get(baseUrl + approveOrRejectRequestRoute+"/"+ requestId+"/" + status);
  }

  
}
