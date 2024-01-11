import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/serivces/login.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {


  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUsers().subscribe((result: any) => {
      // this.applicationUsers = result?.data ? result?.data as ApplicationUser[] : [] as ApplicationUser[];
    });

  }

}
