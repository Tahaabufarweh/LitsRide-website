import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';
import {  Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


const baseUrl = 'api/Reports/'
const getReportRoute = 'AllReports';
const adsUrl = 'api/Users/';
const getAdsRoute = 'GetAllAds';

const postAdRoute = 'CreateNewAd/';
@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  
  getReports(pageNo, pageSize) {
    return this.httpClient.get(baseUrl + getReportRoute + "?PageNo=" + pageNo + "&PageSize=" + pageSize);
  }

  getAds() {
    return this.httpClient.get(adsUrl + getAdsRoute);
  }

  CreateAd(ad, file: File) {
    const formData: FormData = new FormData();
    formData.append('File', file);
    console.log(formData);
    return this.httpClient.post(adsUrl + postAdRoute + JSON.stringify(ad) + formData, httpOptions);
   
  }
}
