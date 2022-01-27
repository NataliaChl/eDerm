import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExaminedImageResponse } from 'src/app/enums/examined-image-response.enum';
import { ImageService } from 'src/app/image.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {

  fileToUpload: File = null;
  private imageService: ImageService;
  public examinedImageResponse: any;
  public loading: boolean = false;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imagesData: any;

  constructor(imageService: ImageService, 
    public rest: RestService,
    private router: Router) {
    this.imageService = imageService;
  }


  ngOnInit(): void {
    this.getDataFromJson();
    this.postDataToJson();
    // this.deleteDataFromJson(1);
  }

  createEntry(): void {
    this.router.navigate(['/photo-add']);
  }

  getDataFromJson(): void {
    this.rest.getDataFromJson().subscribe((data: any) => {
      return this.imagesData = data;
    });
  }

  postDataToJson(): void {
    var entry = {
      "amka": "13456765",
      "image": "5bfbdfvsv",
      "result": "dying",
      "createDate": "13/04/97",
      "photoDate": "03/05/10"
    }
    this.rest.postDataToJson(entry).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  deleteDataFromJson(id): void {
    this.rest.deleteDataFromJson(id).subscribe((data: any) => {
      return this.imagesData = data;
    });
  }

  //handling the image 
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    this.imageError = null;
    if (this.fileToUpload) {
        // Size Filter Bytes
        const max_size = 20971520;
        const max_height = 15200;
        const max_width = 25600;

        if (this.fileToUpload.size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';

            return false;
        }
      
        if (this.fileToUpload.type != 'image/png' && this.fileToUpload.type != 'image/jpeg') {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];

                console.log(img_height, img_width);


                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                }
            };
        };
        reader.readAsDataURL(this.fileToUpload);
    } 
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageSaved = false;
  }


  public fileSelectedLabel(){
    if (this.fileToUpload){
      return this.fileToUpload.name;
    } else {
      return "Επιλέξτε αρχείο";
    }
  }


  submit() {
    this.examinedImageResponse = null;
    this.loading = true;
    this.imageService.examineImage(this.fileToUpload).subscribe(res => {

      console.log(res);
      let examinedTypeResult : ExaminedImageResponse = ExaminedImageResponse[res.class];
      console.log(examinedTypeResult);

      this.examinedImageResponse = examinedTypeResult;
      console.log(this.cardImageBase64);
      this.loading = false;
    })
    console.log(this.fileSelectedLabel);
  }

}
