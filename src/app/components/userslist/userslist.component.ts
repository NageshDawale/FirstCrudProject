import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  [x: string]: any;

  p: number = 1;
  Users: any;
  FirstName: any;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users = res;
    });
  } 

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Do you want to delete?')) {
      this.crudService.delete(id).subscribe((res: any) => {
        this.Users.splice(i, 1);
      })
    }
  }
  search() {
    if (this.FirstName == "") {
      this.ngOnInit();
    } else {
      this.Users = this.Users.filter((res: { FirstName: string; }) => {
        return res.FirstName.toLocaleLowerCase().match(this.FirstName.toLocaleLowerCase());
      });
    }
  }

  key: String = 'id';
  revers: boolean = false;
  sort(key: String) {
    this.key = key;
    this.revers = !this.revers;
  }

}


