import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './Components/add-property/add-property.component';
import { PropertyDetailsComponent } from './Components/property-details/property-details.component';
import { PropertyListComponent } from './Components/property-list/property-list.component';
import { AuthGuard } from './Guard/auth.guard';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';

const routes: Routes = [
  {path:'',component:PropertyListComponent},
  {path:'rent',component:PropertyListComponent},
  {path:'dashboard',component:PropertyListComponent},
  {path:'add-property',component:AddPropertyComponent,canActivate:[AuthGuard]},
  {path:'property-details/:id',component:PropertyDetailsComponent},
  {path:'rent/property-details/:id',component:PropertyDetailsComponent},
  {path:'dashboard/property-details/:id',component:PropertyDetailsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
