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
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.SignUpForm = this.formBuilder.group({
      Username: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      FirstName: ['',Validators.required],
      LastName: ['',Validators.required],
      Email: ['',Validators.required],
      Phone: [''],
      DOB: [''],
      UserId: ['',Validators.required],
      Gender: [''],
      Password: ['',Validators.required],
      VerifyPassword: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit():any{
    this.crudService.AddUser(this.SignUpForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        alert("User Added In Database")
        this.ngZone.run(() => this.router.navigateByUrl('/login'))
      }, (err) => {
        console.log(err);
    });
  }

}
