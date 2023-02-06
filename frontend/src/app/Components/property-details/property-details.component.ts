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
  public mainphotoUrl!:string;
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
  changePrimaryPhoto(url:string){
    this.mainphotoUrl = url;
  }
  getPropertyPhotos():NgxGalleryImage[]{
    const PhotoUrl: NgxGalleryImage[] = [];
    for(var photo of this.property.photos!){
      if(photo.isPrimaty) this.mainphotoUrl = photo.imageUrl;
      else{
        PhotoUrl.push(
          {
            small: photo.imageUrl,
            medium:  photo.imageUrl,
            big:  photo.imageUrl
          }
        );
      }
    }
    return PhotoUrl;
  }
}


