import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = []
  isUpdate:Boolean=false;
  selectedUser:any;


  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      dob: ['', Validators.required],
      sno:['']
    })
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.users = JSON.parse(sessionStorage.getItem('usersData'));
    if(!this.users) this.users= [];

  }

  submitForm() {
    console.log(this.userForm.value)
    let obj =this.userForm.value;
    if(!this.isUpdate){
      obj['sno']= this.users.length+1;
      this.users.push(obj);
    }
    else{
      Object.assign(this.users.find(b => b.sno === obj.sno),obj);
    }
     sessionStorage.setItem('usersData',JSON.stringify(this.users))
     this.resetForm();

  }

  resetForm() {
    this.userForm.reset();
    this.isUpdate =false;
  }

  updateUser(user){
    this.isUpdate =true;
    this.userForm.patchValue({
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      contactNumber:user.contactNumber,
      dob:user.dob,
      sno:user.sno
    })

  }
  deleteUser(user){
    let index =this.users.findIndex(x=>x.sno == user.sno);
    this.users.splice(index,1);
    sessionStorage.setItem('usersData',JSON.stringify(this.users))
  }

}
