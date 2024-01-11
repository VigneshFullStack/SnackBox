import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/models/user';
import { LoginService } from 'src/serivces/login.service';
import { isNullOrUndefined } from '../admin/login/login.component';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private http: HttpClient, private loginService: LoginService, public router: Router) { }
    private snackboxApi = environment.snackboxApiUrl;
    signIn(user: Login) {
        localStorage.setItem("userid", user.username!);
        const encodedPass = btoa(user.password!);
        console.log(encodedPass);
        localStorage.setItem("Userpassword", encodedPass!);
        return this.http
            .post<any>(`${this.snackboxApi}/Auth/Login`, user)
            .pipe(
                catchError(this.handleError)
            )
            .subscribe(
                (res: any) => {
                    console.log(res);
                    if (res) {
                        localStorage.setItem('access_token', res.token);
                        localStorage.setItem("islogin", "true");
                        localStorage.setItem('userDetails', JSON.stringify(res.user));
                        console.log(res.token);
                        this.router.navigate(['/admin']);
                    }
                    if (res.statusCode != 200) {
                        window.alert(res.message);
                    }
                });
    }
    logout() {
        let removeToken = localStorage.removeItem('access_token');
        let removeuser = localStorage.removeItem('userDetails');
        let islogin = localStorage.removeItem('islogin');
        if (removeToken == null && removeuser == null && islogin == null) {
            this.router.navigate(['login']);
        }
    }
    getUser() {
        return localStorage.getItem('userDetails');
    }
    isAuthenticatedUser(): boolean {
        var isLogin = localStorage.getItem('islogin') == "true" ? true : false;
        return isLogin;
    }

    handleError(error: any) {
        console.log(error);

        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;

        }
        window.alert("Service not available, Contact Administrator");
        return throwError(() => new Error(msg));
    }
}