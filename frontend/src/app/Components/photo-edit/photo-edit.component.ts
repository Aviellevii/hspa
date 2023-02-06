import { Component,EventEmitter,Input, Output } from '@angular/core';
import { Photo } from 'src/app/model/photo';
import { Property } from 'src/app/model/property';
import { HouseService } from 'src/app/Services/house.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent {
  @Input() property!:Property;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();
  constructor(private houeseService:HouseService){

  }

  mainPhotoChanged(url:string){
    this.mainPhotoChangedEvent.emit(url);
  }
  deletePhotoBtn(propId:number,photo:Photo){
    this.houeseService.DeletePhoto(propId,photo.publicId).subscribe(()=>{
      this.property.photos = this.property.photos?.filter(p=> p.publicId !== photo.publicId)
    })
  }
  setPrimarybtn(propId:number,photo:Photo){
    this.houeseService.SetPrimary(propId,photo.publicId).subscribe(()=>{
      this.mainPhotoChanged(photo.imageUrl);
      this.property.photos?.forEach(p=>{
        if(p.isPrimaty) p.isPrimaty = false;
        if(p.publicId == photo.publicId) p.isPrimaty = true
      })
    })
  }
}
