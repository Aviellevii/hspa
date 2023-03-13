import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PropertyCardComponent } from './Components/property-card/property-card.component';
import { PropertyListComponent } from './Components/property-list/property-list.component';
import { PropertyDetailsComponent } from './Components/property-details/property-details.component';
import { AddPropertyComponent } from './Components/add-property/add-property.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { SortPipe } from './Pipe/sort.pipe';
import { FilterPipe } from './Pipe/filter.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TokenInterceptor } from './token.interceptor';
import { PhotoEditComponent } from './Components/photo-edit/photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { GlobalErrorInterceptor } from './global-error.interceptor';
import { LoadingComponent } from './Components/loading/loading.component';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PropertyCardComponent,
    PropertyListComponent,
    PropertyDetailsComponent,
    AddPropertyComponent,
    LoginComponent,
    RegisterComponent,
    SortPipe,
    FilterPipe,
    PhotoEditComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:GlobalErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
