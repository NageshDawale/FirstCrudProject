import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  loginDetails: any;

  loginform: any;


  constructor(private fb: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private ngZone: NgZone) {
    this.createForm();
    this.logindata = new Array<any>();

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  createForm() {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    });
  }


  //  if(this.loginForm.valid){
  //    this.crudService.loginAuthentication(this.loginForm.value).subscribe(result =>{
  //      if(result.success){
  //        console.log(result);
  //        alert(result.message);
  //      }else{
  //        alert(result.message);
  //      }
  //    })
  //  }

  //   loginProcess(){
  //     this.crudService.loginAuthentication(this.loginForm.value).subscribe(() => {
  //         console.log('user login successfully!')
  //         alert("User Login Successful")
  //         this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
  //       }, (err) => {
  //         console.log(err);
  //     });

  //  }
  logindata: Array<any>;

  login() {

    this.crudService.loginAuthentication(this.loginForm.value).subscribe((data) => {
      this.logindata = data;
      let user = this.loginForm.value;
      let mytoken = data.token;
      sessionStorage.setItem("token", mytoken);
      sessionStorage.setItem("username", user.Username);



      this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
      alert("User Login Successful")

    }, (err) => {
      alert("please fill the correct username and password")
      console.log(err);
    });

  }

  // 

  // username= new FormControl('', [Validators.required]);
  //   password= new FormControl('', [Validators.required]);
  // login(): any {
  //     console.log("inside login");
  //     //console.log(this.myform.value);
  //     this.crudService.login(this.loginform.value).
  //       subscribe((res: { username: string | FormControl; password: FormControl; message: any; token: string; }) => {
  //         this.loginDetails = res;
  //         console.log(this.loginDetails);
  //         if (res.username != this.username || res.password != this.password) {

  //           console.log(res.message);
  //           //set username and token from localstorage
  //           let token = sessionStorage.setItem('userToken', res.token);
  //           let uname = sessionStorage.setItem('userName', res.username);

  //           // after login then navigate page from dashborad 
  //           if (token !== res.token || uname !== res.username) {
  //             this.router.navigateByUrl('/graphmodule')
  //             alert('login succesfull');
  //           }
  //           else {
  //             alert('user not logged in');

  //             this.router.navigateByUrl('')

  //           }
  //         }

  //         else if (!res.username) {
  //           console.log("invalid username");
  //           this.getErrorMessage();
  //         } else if (!res.password) {
  //           console.log("invalid password");
  //           this.getEmailErrorMessage();
  //         } else {
  //           console.log("username & password  incorrect");
  //         }


  //       })



  //   }
  //   getErrorMessage() {
  //     throw new Error('Method not implemented.');
  //   }
  //   getEmailErrorMessage() {
  //     throw new Error('Method not implemented.');
  //   }

}
