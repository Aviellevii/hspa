import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HouseService } from 'src/app/Services/house.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent {

  properties:Array<Property>=[]
  filteredValue = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';
  constructor(houseService:HouseService,route:ActivatedRoute){
      if(route.snapshot.url.toString())
      {
        houseService.SellOrRent(2).subscribe((property)=>{
          this.properties = property;
        })
      }
      
      else
      {
        houseService.SellOrRent(1).subscribe((property)=>{
          this.properties = property;
        })
      }
      
      }

      onCityFilterClear() {
        this.SearchCity = '';
        this.filteredValue = '';
      }
      
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
