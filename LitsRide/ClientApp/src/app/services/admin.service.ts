import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';


const baseUrl = 'api/Reports/'
const getReportRoute = 'AllReports';
@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  
  getReports() {
    return this.httpClient.get(baseUrl + getReportRoute);
  }
}
