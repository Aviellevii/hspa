import { Component, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  @ViewChild('formTabs') formTabs!: TabsetComponent;

  propertyTypes:Array<string>=["House","APARTMET","Duplex"];
  furnishType:Array<string>=["Fully","Semi","Unfurnished"];
  selectTab(tabId: number) {
      this.formTabs.tabs[tabId].active = true;
  }
    
}
