import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RequestOptions } from '@angular/http';

const baseUrl = 'api/Trips/'
const getAllTripsRoute = 'GetTripsSearch';
const getTaskAssigneesByIdRoute = 'GetTaskAssigneesById/';
const createNewTripRoute = 'CreateNewTrip';
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

  getAllTrips(filter, pageNo, pageSize) {
    console.log(pageNo)
    console.log(pageSize)
    return this.httpClient.post(baseUrl + getAllTripsRoute + "?PageNo=" + pageNo + "&PageSize=" + pageSize, JSON.stringify(filter), httpOptions)
    }

    getAllTripsBySearchParams(params) {
        return this.httpClient.post(baseUrl, JSON.stringify(params), httpOptions);
    }

    getTripById(id) {
        return this.httpClient.get(baseUrl + id);
    }

    createNewTrip(trip) {
      return this.httpClient.post(baseUrl + createNewTripRoute, JSON.stringify(trip), httpOptions);
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
