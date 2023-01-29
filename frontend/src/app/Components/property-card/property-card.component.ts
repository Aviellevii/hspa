import { Component, Input } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertyBase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent {
  @Input() property!:IPropertyBase;
  @Input() hiddenIcon!:boolean;
}
