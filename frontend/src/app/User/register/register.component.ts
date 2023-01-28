import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup;

  constructor(fb:FormBuilder){
    this.registerForm = fb.group({
      Name:['',Validators.required],
      Email:['',Validators.required],
      Password:['',Validators.required],
      ConfirmPassword:['',Validators.required],
      Mobile:['',Validators.required],
    })
  }

  get fc(){
    return this.registerForm.controls;
  }
  register(){
    console.log(`the name is ${this.fc.Name.value}`)
  }
  cancel(){
    this.registerForm.reset();
  }
}
