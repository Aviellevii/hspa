import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { properties } from 'src/data';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly api;

  constructor(private http:HttpClient) { 
    this.api = 'https://localhost:7221/api/'
  }

  GetAllCities():Observable<any[]>{
    return this.http.get<any[]>(`${this.api}City`);
  }
  GetAllHouse(){
    return properties;
  }
  SellOrRent(SR:number){
    return this.http.get<Property[]>(`${this.api}Property/type/${SR}`);
  }
  GetHouseById(id:number){
    return this.GetAllHouse().find(house=>house.Id == id);
  }
}
