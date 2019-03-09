import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseUrl = 'api/Rates/'
const createRate = 'InsertNewRate/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class RatingService {

  constructor(private http: HttpClient) {

    }

  createRate(rate) {
    return this.http.post(baseUrl + createRate, JSON.stringify(rate), httpOptions);
  }
}
