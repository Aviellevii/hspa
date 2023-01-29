import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertyBase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  addProp!:FormGroup;
  propertyView:IPropertyBase={
    Id: 0,
    SellRent: 0,
    Name: '',
    PType: '',
    FType: '',
    Price: 0,
    BHK: 0,
    BuiltArea: 0,
    City: '',
    RTM: false,
    Image: ''
  }
  propertyTypes:Array<string>=["House","APARTMET","Duplex"];
  furnishType:Array<string>=["Fully","Semi","Unfurnished"];
  constructor(fb:FormBuilder){
    this.addProp = fb.group({
      BasicInfo: fb.group({
          SellRent: ['1' , Validators.required],
          BHK: [null, Validators.required],
          PType: [null, Validators.required],
          FType: [null, Validators.required],
          Name: [null, Validators.required],
          City: [null, Validators.required]
      }),

      PriceInfo: fb.group({
          Price: [null, Validators.required],
          BuiltArea: [null, Validators.required],
          CarpetArea: [null],
          Security: [0],
          Maintenance: [0],
      }),

      AddressInfo: fb.group({
          FloorNo: [null],
          TotalFloor: [null],
          Address: [null, Validators.required],
          LandMark: [null],
      }),

      OtherInfo: fb.group({
          RTM: [null, Validators.required],
          PossessionOn: [null, Validators.required],
          AOP: [null],
          Gated: [null],
          MainEntrance: [null],
          Description: [null]
      })
  });
  }
  get fc(){
    return this.addProp.value;
  }
  get BasicInfo() {
    return this.addProp.controls.BasicInfo;
}

get PriceInfo() {
    return this.addProp.controls.PriceInfo;
}

get AddressInfo() {
    return this.addProp.controls.AddressInfo;
}

get OtherInfo() {
    return this.addProp.controls.OtherInfo;
}
  selectTab(tabId: number) {
      this.formTabs.tabs[tabId].active = true;
  }
  onSubmit(){
    console.log('sellrent '+this.addProp.value.BasicInfo.SellRent)
  }
    
}