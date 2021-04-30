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

  getId: any;
  updateForm: FormGroup;
  isExpand:boolean=true;
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
      UserId: [''],
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
        UserId: res['UserId'],
        Gender: res['Gender'],
        Password: res['Password']
      });
    });

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


}
