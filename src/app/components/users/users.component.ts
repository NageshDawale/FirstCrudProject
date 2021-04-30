import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  isExpand:boolean=false;
  constructor(
    private ngZone:NgZone,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  logout(){
    alert("are you sure want to logout.....?");
    sessionStorage.clear();
    this.ngZone.run(() => this.router.navigateByUrl('/login'))
    console.log("user logout successfull...");
    
  }

}
