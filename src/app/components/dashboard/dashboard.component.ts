import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import {Chart} from 'node_modules/chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  
  public barChartData: ChartDataSets[] = [
    { data: [65, 67, 70, 75, 80, 90], label: 'PHP' },
    { data: [50, 48, 47, 49, 44, 40], label: '.Net' },
    { data: [40, 30, 28, 25, 22, 20], label: 'Java' },
  ];

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
