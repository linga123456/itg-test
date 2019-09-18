import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
// Base url
baseurl = 'https://itg-prd-recruit.appspot.com/api';
  constructor(protected httpClient: HttpClient) { 
    
  }
  //Get Vehicle by it's id
  GetVehicle(id: string): Observable<any> {
    return this.httpClient.get(this.baseurl + '/vehicle/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET All Vehicles
  GetVehicles(): Observable<any> {
    return this.httpClient.get(this.baseurl + '/vehicles/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }
   // Error handling
   errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
