import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { properties } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly api;

  constructor(private http:HttpClient) { 
    this.api = 'https://localhost:7221/api/City'
  }

  GetAllCities():Observable<any[]>{
    return this.http.get<any[]>(this.api);
  }
  GetAllHouse(){
    return properties;
  }
  SellOrRent(SR:number){
    return this.GetAllHouse().filter(house=>house.SellRent === SR);
  }
  GetHouseById(id:number){
    return this.GetAllHouse().find(house=>house.Id == id);
  }
}
