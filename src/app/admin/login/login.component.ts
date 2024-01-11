import { Component, OnInit } from '@angular/core';
import { Login, MailRequest, User } from 'src/models/user';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/serivces/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private loginService: LoginService) { }

  isShown: boolean = false;
  userLogin: Login = {} as Login;
  userReq: Login = {} as Login;
  userRegister: User = {} as User;
  show: boolean = false;
  show1: boolean = false;
  show2: boolean = false;
  show_eye: boolean = true;
  show_eye1: boolean = true;
  show_eye2: boolean = true;
  email: string = "";
  companyCode: string = "";
  mailRequest: MailRequest = {} as MailRequest;
  adminMail: string = "naveen.kumar@euroland.com"
  PassResetError: boolean = false;
  PassResetsuccess: boolean = false;
  submitted: boolean = false;
  MailLoading: boolean = false;
  ngOnInit() {
    //this.authService.RemoveLocalStorage();
    let signUp = <HTMLElement>document.getElementById("sign-up");
    let signIn = <HTMLElement>document.getElementById("sign-in");
    let loginIn = <HTMLElement>document.getElementById("login-in");
    let loginUp = <HTMLElement>document.getElementById("login-up");
    signUp.addEventListener("click", () => {
      loginIn.classList.remove('block')
      loginUp.classList.remove('none')

      loginIn.classList.add('none');
      loginUp.classList.add('block');
    });
    signIn.addEventListener("click", () => {
      //remove classes if exist
      loginIn.classList.remove('none')
      loginUp.classList.remove('block')
      //add classes
      loginIn.classList.add('block')
      loginUp.classList.add('none')
    });

  }

  showPassword(x?: number) {
    if (x == 1) {
      this.show1 = !this.show1;
      this.show_eye1 = !this.show_eye1;
    } else if (x == 2) {
      this.show2 = !this.show2;
      this.show_eye2 = !this.show_eye2;
    } else {
      this.show = !this.show;
      this.show_eye = !this.show_eye;
    }
  }

  loginUser() {
    console.log(this.userLogin);
    this.authService.signIn(this.userLogin);

    // if (success) {
    //   this.router.navigate(['/admin']);
    //   // Redirect or perform other actions after successful login
    // } else {
    //   console.log('Login failed');
    //   // Handle failed login (display an error message, for example)
    // }
  }

  registerUser() {
    console.log(this.userRegister);
    if (isNullOrUndefined(this.userRegister.username)) {
      return;
    }
    else if (isNullOrUndefined(this.userRegister.password)) {
      return
    }
    else if (isNullOrUndefined(this.userRegister.confirmpassword)) {
      return
    }
    else if (!isNullOrUndefined(this.userRegister.confirmpassword) && !isNullOrUndefined(this.userRegister.password)) {
      if (this.userRegister.confirmpassword != this.userRegister.password) {
        return;
      } else {
        console.log("this.userRegister :", this.userRegister);
        this.userReq.password = this.userRegister.password;
        this.userReq.username = this.userRegister.username;
        this.userReq.role = "Admin";
        this.loginService.createUser(this.userReq).subscribe((result: any) => {
          console.log("create :", result);
          this.userReq = {} as Login;
          this.ngOnInit();
        })
      }
    }

  }
}
export function isNullOrUndefined(value: any) {
  return value === null || value === undefined || value === '';
}