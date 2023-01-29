import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/Services/house.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent {
  property:any;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  constructor(route:ActivatedRoute,houseService:HouseService){
    route.params.subscribe((param)=>{
      this.property = houseService.GetHouseById(param.id);
    })

    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
     
    ];

    this.galleryImages = [
      {
        small: '../../../assets/internal-1.jpg',
        medium: '../../../assets/internal-1.jpg',
        big: '../../../assets/internal-1.jpg'
      },
      {
        small: '../../../assets/internal-2.jpg',
        medium: '../../../assets/internal-2.jpg',
        big: '../../../assets/internal-2.jpg'
      },
      {
        small: '../../../assets/internal-3.jpg',
        medium: '../../../assets/internal-3.jpg',
        big: '../../../assets/internal-3.jpg'
      },{
        small: '../../../assets/internal-4.jpg',
        medium: '../../../assets/internal-4.jpg',
        big: '../../../assets/internal-4.jpg'
      },
      {
        small: '../../../assets/internal-5.jpg',
        medium: '../../../assets/internal-5.jpg',
        big: '../../../assets/internal-5.jpg'
      }
    ];
  }
}


