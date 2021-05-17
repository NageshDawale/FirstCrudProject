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
  url: any;
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

    let i = sessionStorage.getItem('image');
      console.log('session value'+i);
      this.updateForm.value.file=i;
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
  file!: string;
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

  logout() {
    if (window.confirm('Do you want to Logout?')) {
      sessionStorage.clear();
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
      console.log("user logout successfull...");
    }  
    }


    // file upload
   onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url


      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        //store image from base 64 format 
       // console.log("my ts file url is " + this.url);
        sessionStorage.setItem('image', this.url)
        // console.log('File value in onselect'+this.newuserForm.value.file);


      }
    }
  }


}
