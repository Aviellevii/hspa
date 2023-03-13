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
  isSubmit:boolean = false;
  constructor(fb:FormBuilder,private accountService:AccountService,private router:Router){
    this.registerForm = fb.group({
      Name:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Password:['',[Validators.required,Validators.minLength(8)]],
      ConfirmPassword:['',Validators.required],
      Mobile:['',[Validators.required,Validators.maxLength(10)]],
    })
  }

  get fc(){
    return this.registerForm.controls;
  }
  register(){
    console.log(this.registerForm);
    if(this.registerForm.invalid){
      this.isSubmit = true;
      return;
    }

    this.accountService.register({username:this.registerForm.value.Email,password:this.registerForm.value.Password}).subscribe(()=>{
      this.router.navigateByUrl('/login');
    })
  }
  cancel(){
    this.registerForm.reset();
  }
}
