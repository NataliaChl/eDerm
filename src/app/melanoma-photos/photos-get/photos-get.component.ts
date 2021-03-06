import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExaminedImageResponse } from '../../enums/examined-image-response.enum';
import { ImageService } from '../../image.service';
import { RestService } from '../../rest.service';


@Component({
  selector: 'app-photos-get',
  templateUrl: './photos-get.component.html',
  styleUrls: ['./photos-get.component.css']
})

export class PhotosGetComponent implements OnInit {

  fileToUpload: File = null;
  isFetching = false;
  private imageService: ImageService;
  public examinedImageResponse: any;
  public loading: boolean = false;
  public clickedId: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imagesData: any = null;
  public entryLine: any;
  constructor(imageService: ImageService, 
    public rest: RestService,
    private router: Router) {
    this.imageService = imageService;
  }


  ngOnInit(): void {
    this.getDataFromJson();
  }

  createEntry(): void {
    this.router.navigate(['/photo-add']);
  }

  getDataFromJson(): void {
    this.rest.getDataFromJson().subscribe((data: any) => {
      return this.imagesData = data;
    });
  }

  viewEntryDetails(id): void {
    this.router.navigate(['/photo-get/' + id]);
  }

  editEntryDetails(id): void {
    // var element = e.currentTarget as HTMLInputElement
    // var id = element.closest('.all-data').getAttribute('id');
    this.router.navigate(['/photo-edit/' + id]);
  }

  getEntryId(e: Event): void {
    var element = e.currentTarget as HTMLInputElement
    this.entryLine = element.closest('.all-data');
    this.clickedId = this.entryLine.getAttribute('id');
    console.log(this.entryLine);
  }
  
  deleteDataFromJson(): void {
    this.rest.deleteDataFromJson(this.clickedId).subscribe((result) => {
      this.entryLine.style.display = "none";
    }, (err) => {
      console.log(err);
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
      return "???????????????? ????????????";
    }
  }

  handleClick(event: Event) {
    document.querySelector('#sidebar, #content').classList.toggle('active');
    if (document.querySelector('#sidebar').classList.contains('active')) {
      document.querySelector<HTMLElement>('#content').classList.add('full-width');
      document.querySelector('#sidebarCollapse').classList.add('replace-button');
    } else {
      document.querySelector<HTMLElement>('#content').classList.remove('full-width');
      document.querySelector('#sidebarCollapse').classList.remove('replace-button');
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
