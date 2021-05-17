import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import {Chart} from 'node_modules/chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 67, 70, 75, 80, 85, 90], label: 'DMR' },
    { data: [50, 48, 47, 49, 52, 55, 60], label: '.DrySign' },
    { data: [52, 50, 28, 25, 45, 50, 65], label: 'DMR' },
  ];

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
  file!:string;
  getUserRole() {
    this.crudService.GetUsers().subscribe((res) => {
      this.User = res;
      console.log(this.User)

      //iterate through array
      this.User.forEach((value: any) => {

        if (value.Username == this.username) {
          this.role = value.Role;
          this.file = value.file;
          console.log(this.role);
        }

      });

    });

  }


}



