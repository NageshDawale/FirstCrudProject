import { Component, OnInit, NgZone } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
 

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  SignUpForm!: FormGroup;
  isExpand:boolean = true;
  Role: any = ['admin', 'manager', 'engineer'];
  gender: any = ['male', 'female'];
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private crudService: CrudService
  ) { }

  ngOnInit(): void {

    this.SignUpForm = this.formBuilder.group({
      Username: ['', Validators.required],
      FirstName: [''],
      LastName: [''],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      DOB: [''],
      Role: ['', Validators.required],
      Gender: [''],
      Password: ['', Validators.required],
      VerifyPassword: ['', Validators.required],
      profilepic: ['', Validators.required]
    }, {
      validators: this.MustMatch('Password', 'VerifyPassword')
    })

    this.getUsername();
    this.getUserRole();
  }

  get f() { return this.SignUpForm.controls }

  MustMatch(controlname: string, matchingcontrolname: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlname];
      const matchingcontrol = formGroup.controls[matchingcontrolname];

      if (matchingcontrol.errors && !matchingcontrol.errors.MustMatch) {
        return
      }
      if (control.value !== matchingcontrol.value) {
        matchingcontrol.setErrors({ MustMatch: true });
      } else {
        matchingcontrol.setErrors(null);
      }
    }
  }

  onSubmit(): any {
    this.submitted = true;
    if (this.SignUpForm.invalid)
      return;
    this.crudService.AddUser(this.SignUpForm.value).subscribe(() => {
      console.log('Data added successfully!')
      alert("User Added In Database")
      this.ngZone.run(() => this.router.navigateByUrl('/users'))
    }, (err) => {
      console.log(err);
    });
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
