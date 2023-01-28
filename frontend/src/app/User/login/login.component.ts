import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;

  constructor(fb:FormBuilder){
    this.loginForm = fb.group({
      Email:['',Validators.required],
      Password:['',Validators.required],
    })
  }

  get fc(){
    return this.loginForm.controls;
  }
  login(){
    console.log(`the name is ${this.fc.Email.value}`);
  }
  cancel(){
    this.loginForm.reset();
  }
}
