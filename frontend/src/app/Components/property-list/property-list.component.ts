import { Component } from '@angular/core';
import { HouseService } from 'src/app/Services/house.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {

  properties:Array<any>=[]
  constructor(houseService:HouseService){
    this.properties = houseService.GetAllHouse();
  }
}
