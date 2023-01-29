import { Injectable } from '@angular/core';
import { properties } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor() { }

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
