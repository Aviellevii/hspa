import { Component } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  loggedinUser!:string;
  constructor(private account:AccountService){
    account.userObservable.subscribe((user)=>{
      this.loggedinUser = user.userName
    })
  }
  onLogout(){
    this.account.logout();
  }
  

  loggedin(){
    if(!this.account.curnnetUser.token) 
      return false;
    return true;
  }
}
