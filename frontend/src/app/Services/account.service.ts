import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from '../model/IUser';
import { User } from '../model/user';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly api;
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private alertify:AlertifyService) {
    this.api = 'https://localhost:7221/api/Account';
    this.userObservable = this.userSubject.asObservable();
   }

   public get curnnetUser():any{
    return this.userSubject.value;
   }

   login(userLogin:IUser){
    return this.http.post<any>(`${this.api}/login`,userLogin).pipe(
      tap({
        next:(User)=>{
          this.SetUserToLocalStorage(User);
          this.userSubject.next(User);
          this.alertify.success(`Welcome ${User.userName}`);
        },error:()=>{
          this.alertify.error('login failed');
        }
      })
    )
   }

   register(userLogin:IUser){
    return this.http.post<any>(`${this.api}/register`,userLogin).pipe(
      tap({
        next:()=>{
          this.alertify.success(`register success please login`);
        },error:()=>{
          this.alertify.error('login failed');
        }
      })
    )
   }

   logout(){
    this.userSubject.next(new User());
     localStorage.removeItem('User');
     window.location.reload();
   }
   private SetUserToLocalStorage(user:User){
    localStorage.setItem('User',JSON.stringify(user));
  }
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem('User');
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
