import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup;
  isSubmit:boolean = false;
  constructor(fb:FormBuilder,private router:Router,private accountService:AccountService){
    this.loginForm = fb.group({
      Email:['',Validators.required],
      Password:['',Validators.required],
    })
  }

  get fc(){
    return this.loginForm.controls;
  }
  login(){
    if(this.loginForm.invalid){
      this.isSubmit = true;
      return;
    }
    
    this.accountService.login({username:this.loginForm.value.Email,password:this.loginForm.value.Password}).subscribe(()=>{
      this.router.navigateByUrl('/');
    })
  }
  cancel(){
    this.loginForm.reset();
  }
}
