import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/Services/alertify.service';
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
  constructor(private houseService:HouseService,route:ActivatedRoute,private alertify:AlertifyService){
      if(route.snapshot.url.toString() == 'rent')
      {
        houseService.SellOrRent(2).subscribe((property)=>{
          this.properties = property;
        })
      }
      else if(route.snapshot.url.toString() == 'dashboard'){
        houseService.GetMyProp().subscribe((property)=>{
          this.properties = property
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

  deleteProperty(id:number){
    this.houseService.DeleteHouseProperty(id).subscribe(()=>{
      this.alertify.success('Property Deleted');
      this.properties = this.properties.filter(prp=> prp.id !== id);
    })
  }
}
