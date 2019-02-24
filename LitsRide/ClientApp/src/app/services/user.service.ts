import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
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
    constructor(private httpClient: HttpClient) {

    }
    getUserById(id) {
        return this.httpClient.get(baseUrl + id);
    }

    //createUser(user: User) {
    //    return this.httpClient.post(baseUrl + signupRoute, JSON.stringify(user), httpOptions);
    //}

    login(user) {
        return this.httpClient.post(baseUrl, JSON.stringify(user), httpOptions);
         }

}
