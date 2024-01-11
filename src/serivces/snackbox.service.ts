import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SnackboxService {

  private snackboxApi = environment.snackboxApiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(`${this.snackboxApi}/Menu/Categories`, this.httpOptions)
      .pipe(
        catchError(err => this.errorHandler(err))
      )
  }

  getCategoryById(id:number): Observable<any> {
    return this.http.get(`${this.snackboxApi}/Menu/GetMenu?categoryId=${id}`, this.httpOptions)
      .pipe(
        catchError(err => this.errorHandler(err))
      )
  }

  errorHandler(error: any) {
    // this.messageService.clear();
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } 
    else 
    {
      if (error.status == 401
        || error.status == 403) {
         console.log('You are unauthorized!')
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'UnAuthorized',
        //   detail: 'You are unauthorized!',
        //   life: 3000
        // });
      } else {
        // Display the error message using PrimeNG Toast
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'API Error',
        //   detail: 'Please contact the Administrator!',
        //   life: 3000
        // });
        console.log('API Error - Please contact the Administrator!')
      }      
    }

    // Log the detailed error message to the console
    console.error(errorMessage);

    return throwError(errorMessage);
  }
}
