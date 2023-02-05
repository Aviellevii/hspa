import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { properties } from 'src/data';
import { IPairValueKey } from '../model/IPairValueKey';
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
  getPropertyType():Observable<IPairValueKey[]>{
    return this.http.get<IPairValueKey[]>(`${this.api}propertytype`);
  }
  getfurnishingType():Observable<IPairValueKey[]>{
    return this.http.get<IPairValueKey[]>(`${this.api}furnishingtype`);
  }
  SellOrRent(SR:number){
    return this.http.get<Property[]>(`${this.api}Property/type/${SR}`);
  }
  AddProperty(property:Property){
    return this.http.post(`${this.api}Property/add`,property);
  }
  GetHouseProperty(id:number):Observable<Property>{
  return this.http.get<Property>(`${this.api}Property/detail/${id}`);
}
getYearDifference(date: string): string {
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const now = new Date();
  const est = new Date(date);
  const differenceInMs = Math.abs(now.getTime() - est.getTime());
  const diff = Math.floor(differenceInMs / oneYear);
  if(diff == 0)
    return "less then year";
  return diff.toString();
}
}
