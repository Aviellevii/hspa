import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/Services/house.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Property } from 'src/app/model/property';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {
  property!:Property;
  public mainurl!:string;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  constructor(route:ActivatedRoute,houseService:HouseService){
    route.params.subscribe((param)=>{
      houseService.GetHouseProperty(param.id).subscribe((property) =>{
        this.property = property;
        this.property.age = houseService.getYearDifference((property.estPossessionOn!).toString()); 

        this.galleryOptions = [
          {
            width: '100%',
            height: '465px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
          },

        ];

        this.galleryImages = this.getPropertyPhotos();
      })
    })
  }
  getPropertyPhotos(): NgxGalleryImage[] {
    const photoUrls: NgxGalleryImage[] = [];
    for (const photo of this.property.photos!) {
      if(photo.isPrimary) {this.mainurl = photo.imageUrl}
            photoUrls.push(
                {
                    small: photo.imageUrl,
                    medium: photo.imageUrl,
                    big: photo.imageUrl
                }
            );
    }
    return photoUrls;
  }
}


