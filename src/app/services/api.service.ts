import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.BASE_PATH;

  constructor(private http: HttpClient) {}

  // GET method to fetch data
  getData(endpoint: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}${endpoint}`)
      .pipe(catchError(this.handleError)); // Error handling
  }

  // POST method to send data
  postData(endpoint: string, payload: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}${endpoint}`, payload)
      .pipe(catchError(this.handleError));
  }

  // PUT method to update data
  updateData(endpoint: string, payload: any): Observable<any> {
    return this.http
      .put(`${this.baseUrl}${endpoint}`, payload)
      .pipe(catchError(this.handleError));
  }

  // DELETE method to remove data
  deleteData(endpoint: string): Observable<any> {
    return this.http
      .delete(`${this.baseUrl}${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
