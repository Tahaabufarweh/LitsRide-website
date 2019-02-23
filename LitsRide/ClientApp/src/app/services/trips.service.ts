import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'api/Users/'
const getTaskAssigneesByGroupIdRoute = 'GetTaskAssigneesByGroupId/';
const getTaskAssigneesByIdRoute = 'GetTaskAssigneesById/';
const createTaskAssigneeRoute = 'CreateTaskAssignee';
const deleteTaskAssigneeRoute = 'DeleteTaskAssignee/'
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class TripsService {
    constructor(private httpClient: HttpClient) {

    }

    getAllTrips() {
        return this.httpClient.get(baseUrl)
    }

    getAllTripsBySearchParams(params) {
        return this.httpClient.post(baseUrl, JSON.stringify(params), httpOptions);
    }

    getTripById(id) {
        return this.httpClient.get(baseUrl + id);
    }

    createNewTrip(trip) {
        return this.httpClient.post(baseUrl, JSON.stringify(trip), httpOptions);
    }

    editTrip(trip) {
        return this.httpClient.post(baseUrl, JSON.stringify(trip), httpOptions);
    }

    requestTrip(request) {
        return this.httpClient.post(baseUrl, JSON.stringify(request), httpOptions);
    }

    acceptRequest(id) {
        return this.httpClient.get(baseUrl + id);
    }
    
    rejectRequest(id) {
        return this.httpClient.get(baseUrl + id);
    }


}