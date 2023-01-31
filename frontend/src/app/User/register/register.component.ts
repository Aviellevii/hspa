import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup;

  constructor(fb:FormBuilder,private accountService:AccountService,private router:Router){
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
    this.accountService.register({username:this.registerForm.value.Email,password:this.registerForm.value.Password}).subscribe(()=>{
      this.router.navigateByUrl('/login');
    })
  }
  cancel(){
    this.registerForm.reset();
  }
}
