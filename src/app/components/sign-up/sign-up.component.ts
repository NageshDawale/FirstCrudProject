import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  SignUpForm!: FormGroup;
  gender: any = ['male', 'female'];
  Role: any = ['admin', 'manager', 'engineer'];
  submitted = false;
  url: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute
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
     // profilepic: ['', Validators.required]
    }, {
      validators: this.MustMatch('Password', 'VerifyPassword')
    })
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
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    }, (err) => {
      console.log(err);
    });
  }


 

  //signupdata: Array<any> = [];

  //  signup(){

  //    this.crudService.AddUser(this.SignUpForm.value).subscribe((data) => {
  //      //this.signupdata=data;
  //      //console.log("return api fetch data is" +data.token);
  //      //let mytoken=data.token;
  //      //sessionStorage.setItem("token",mytoken);

  //     //console.log('user login successfully!')

  //     this.ngZone.run(() => this.router.navigateByUrl('/login'))
  //     alert("User Login Successful")
  //   }, (err) => {
  //     alert("username password is incorrect")
  //     console.log(err);
  // });

  //  }

}
