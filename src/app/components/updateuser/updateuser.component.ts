import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  Role: any = ['admin', 'manager', 'engineer'];
  gender: any = ['male', 'female'];
  getId: any;
  updateForm: FormGroup;
  isExpand: boolean = true;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {

    this.updateForm = this.formBuilder.group({
      // _id: [''],
      Username: [''],
      FirstName: [''],
      LastName: [''],
      Email: [''],
      Phone: [''],
      DOB: [''],
      Role: [''],
      Gender: [''],
      Password: ['']
    })
  }

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetUser(this.getId).subscribe(res => {
      this.updateForm.setValue({
        // _id: res['_id'],
        Username: res['Username'],
        FirstName: res['FirstName'],
        LastName: res['LastName'],
        Email: res['Email'],
        Phone: res['Phone'],
        DOB: res['DOB'],
        Role: res['Role'],
        Gender: res['Gender'],
        Password: res['Password']
      });
    });

    this.getUsername();
    this.getUserRole();
  }

  onUpdate(): any {
    this.crudService.updateuser(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users'))
        alert("user updated successfully");
      }, (err) => {
        console.log(err);
      });
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

  logout() {
    if (window.confirm('Do you want to Logout?')) {
      sessionStorage.clear();
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
      console.log("user logout successfull...");
    }  
    }

}
