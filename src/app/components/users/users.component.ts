import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isExpand: boolean = true;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {
    this.getUsername();
    this.getUserRole();
  }

  logout() {
    if (window.confirm('Do you want to Logout?')) {
    sessionStorage.clear();
    this.ngZone.run(() => this.router.navigateByUrl('/login'))
    console.log("user logout successfull...");
    }    
  }

  username!: string | null;
  getUsername(): void {

    this.username = sessionStorage.getItem('username');
    console.log('username ' + this.username);


  }

  //Get Users Role
  User: any = [];
  role!: string;
  getUserRole() {
    this.crudService.GetUsers().subscribe((res) => {
      this.User = res;
      console.log(this.User)

      //iterate through array
      this.User.forEach((value: any) => {

        if (value.Username == this.username) {
          this.role = value.Role;
          console.log(this.role);
        }

      });

    });

  }


}
