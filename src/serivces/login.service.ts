import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private snackboxApi = environment.snackboxApiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.snackboxApi}/Auth/User`, this.httpOptions)
      .pipe(
        catchError(err => this.errorHandler(err))
      )
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.snackboxApi}/Menu/GetMenu?categoryId=${id}`, this.httpOptions)
      .pipe(
        catchError(err => this.errorHandler(err))
      )
  }

  Login(login: Login): Observable<any> {
    return this.http.post(`${this.snackboxApi}/Auth/Login/`, login, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createUser(login: Login): Observable<any> {
    return this.http.post(this.snackboxApi + '/Auth/Register/', login, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any) {
    // this.messageService.clear();
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
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
