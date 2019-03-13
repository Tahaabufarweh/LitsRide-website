import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';  
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';
import { User } from '../modelInterfaces';


//import { User } from 'app/ModelInterfaces/ModelInterface';

const baseUrl = 'api/Users/'
const getUserRoute = 'GetUser/';
const signupRoute = 'SignUp';
const signinRoute = 'signin';
const getUsersRoute = 'GetAllUsers';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {

    }
  getUserDetialsById(id) {
    return this.httpClient.get(baseUrl + getUserRoute + id);
  }

  
  getUsers(pageNo,pageSize) {
    return this.httpClient.get(baseUrl + getUsersRoute + "?PageNo=" + pageNo + "&PageSize=" + pageSize);
  }

    createUser(user: User) {
        return this.httpClient.post(baseUrl + signupRoute, JSON.stringify(user), httpOptions);
    }

    login(user) {
    return this.httpClient.post(baseUrl + "Login", JSON.stringify(user), httpOptions)
     }

}
