import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {
  propertyId!:number;
  constructor(route:ActivatedRoute){
    route.params.subscribe((param)=>{
      this.propertyId = param.id
    })
  }

}
