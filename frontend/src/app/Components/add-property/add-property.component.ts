import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPairValueKey } from 'src/app/model/IPairValueKey';
import { IPropertyBase } from 'src/app/model/ipropertyBase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { HouseService } from 'src/app/Services/house.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent {
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  addProp!:FormGroup;
  property = new Property();

  cities!:any[];
  propertyView:IPropertyBase={
    id: 0,
    sellRent: 0,
    name: '',
    propertyType: '',
    furnishingType: '',
    price: 0,
    bhk: 0,
    builtArea: 0,
    city: '',
    readyToMove: false,
    Image: ''
  }
  propertyTypes!:Array<IPairValueKey>;
  furnishType!:Array<IPairValueKey>;
  constructor(fb:FormBuilder,private houseService:HouseService,private router:Router,private alertify:AlertifyService){
    houseService.getPropertyType().subscribe((propertyTypes)=>{
      this.propertyTypes = propertyTypes;
    })
    houseService.getfurnishingType().subscribe((furnishType)=>{
      this.furnishType = furnishType
    })
    houseService.GetAllCities().subscribe((cities)=>{
      this.cities = cities
    })
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
          AOP: [0],
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
mapProperty(): void {
  this.property.sellRent = +this.fc.BasicInfo.SellRent;
  this.property.bhk = this.fc.BasicInfo.BHK;
  this.property.propertyTypeId = this.fc.BasicInfo.PType;
  this.property.name = this.fc.BasicInfo.Name;
  this.property.CityId = this.fc.BasicInfo.City;
  this.property.furnishingTypeId = this.fc.BasicInfo.FType;
  this.property.price = this.fc.PriceInfo.Price;
  this.property.security = this.fc.PriceInfo.Security;
  this.property.maintenance = this.fc.PriceInfo.Maintenance;
  this.property.builtArea = this.fc.PriceInfo.BuiltArea;
  this.property.carpetArea = this.fc.PriceInfo.CarpetArea;
  this.property.floorNo = this.fc.AddressInfo.FloorNo;
  this.property.totalFloors = this.fc.AddressInfo.TotalFloor;
  this.property.address = this.fc.AddressInfo.Address;
  this.property.address2 = this.fc.AddressInfo.LandMark;
  this.property.readyToMove =JSON.parse(this.fc.OtherInfo.RTM);
  this.property.age = this.fc.OtherInfo.AOP;
  this.property.gated = JSON.parse(this.fc.OtherInfo.Gated);
  this.property.mainEntrance = this.fc.OtherInfo.MainEntrance;
  this.property.estPossessionOn = new Date(this.fc.OtherInfo.PossessionOn);
  this.property.description = this.fc.OtherInfo.Description;
}
  selectTab(tabId: number) {
      this.formTabs.tabs[tabId].active = true;
  }
  onSubmit(){
    this.mapProperty()
    this.houseService.AddProperty(this.property).subscribe((property:any)=>{
      if(property.sellRent == 1)
      this.router.navigateByUrl('/')
      else
      this.router.navigateByUrl('/rent')

      this.alertify.success('PROPERTY Addad')
    })
  }  
}
