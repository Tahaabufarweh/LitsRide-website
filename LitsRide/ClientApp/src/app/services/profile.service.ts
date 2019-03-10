import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
const baseUrl = 'api/Users/'
const postFileRoute = 'PostFile/{userId}';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  saveProfilePic(id, fileName)
  {
    return this.httpClient.post(baseUrl + postFileRoute + id + fileName,httpOptions);
  }
}
