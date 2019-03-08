import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';
import { User } from '../modelInterfaces';
//import { User } from 'app/ModelInterfaces/ModelInterface';

const baseUrl = 'api/Users/'
const signupRoute = 'SignUp';
const signinRoute = 'signin';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {

    }
    getUserById(id) {
        return this.httpClient.get(baseUrl + id);
    }

    createUser(user: User) {
        return this.httpClient.post(baseUrl + signupRoute, JSON.stringify(user), httpOptions);
    }

  login(user) {
    return this.httpClient.post(baseUrl + "Login", JSON.stringify(user), httpOptions)
        
         }

}
