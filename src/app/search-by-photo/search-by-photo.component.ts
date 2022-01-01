import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExaminedImageResponse } from '../enums/examined-image-response.enum';
import { ImageService } from '../image.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-search-by-photo',
  templateUrl: './search-by-photo.component.html',
  styleUrls: ['./search-by-photo.component.css']
})
export class SearchByPhotoComponent implements OnInit {


  fileToUpload: File = null;

  private imageService: ImageService;
  public examinedImageResponse: any;
  public loading: boolean = false;


  constructor(imageService: ImageService,
             ) {
              this.imageService = imageService;
   
   }

handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
}

public fileSelectedLabel(){

 if (this.fileToUpload){
   return this.fileToUpload.name;
 } else {
   return "Επιλέξτε αρχείο";
 }


}

  ngOnInit(): void { 

  }

  submit(){
    this.examinedImageResponse = null;
    this.loading = true;
    this.imageService.examineImage(this.fileToUpload).subscribe(res => {

      console.log(res);
      let examinedTypeResult : ExaminedImageResponse = ExaminedImageResponse[res.class];
      console.log(examinedTypeResult);

      this.examinedImageResponse = examinedTypeResult;
      this.loading = false;
    })

  }


}
