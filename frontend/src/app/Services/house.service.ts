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
}
