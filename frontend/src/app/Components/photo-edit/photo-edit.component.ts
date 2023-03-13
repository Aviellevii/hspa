import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/model/photo';
import { Property } from 'src/app/model/property';
import { AccountService } from 'src/app/Services/account.service';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { HouseService } from 'src/app/Services/house.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit{
  @Input() property!:Property;
  @Output() mainPhotoChangedEvent = new EventEmitter<string>();
  uploader!:FileUploader;
  maxAllowedFileSize=10*1024*1024;
  constructor(private houeseService:HouseService,private accountService:AccountService,private alertify:AlertifyService
    ,private router:Router){

  }
  ngOnInit(): void {
    this.InitilizeFileUploader()
  }

  InitilizeFileUploader(){
    this.uploader = new FileUploader({
      url:`https://localhost:7221/api/Property/add/photo/${this.property.id}`,
      authToken:`Bearer ${this.accountService.curnnetUser.token}`,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:true,
      maxFileSize:this.maxAllowedFileSize
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item,response,status,headers)=>{
      if(response){
        const photo = JSON.parse(response);
        this.property.photos?.push(photo);
      }
    }

    this.uploader.onErrorItem = (item, response, status, headers) => {
      let errorMessage = 'Some unknown error occured';
      if (status===401) {
          errorMessage ='Your session has expired, login again';
          this.router.navigateByUrl('/login')
      }

      if (response) {
          errorMessage = response;
      }

      this.alertify.error(errorMessage);
  };

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
