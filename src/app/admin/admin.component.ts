import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Login, User } from 'src/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  userDetail: Login = {} as Login;

  ngOnInit() {
    this.userDetail = JSON.parse(this.authService.getUser()!);
    console.log("this.userDetail : ", this.userDetail);

  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
