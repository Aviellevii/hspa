import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/Services/house.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {

  properties:Array<any>=[]
  constructor(houseService:HouseService,route:ActivatedRoute){
      if(route.snapshot.url.toString())
      this.properties = houseService.SellOrRent(2);
      else
      this.properties = houseService.SellOrRent(1);
      }
}
