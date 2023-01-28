import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { PropertyCardComponent } from './Components/property-card/property-card.component';
import { PropertyListComponent } from './Components/property-list/property-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PropertyCardComponent,
    PropertyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
