import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @ViewChild('f', {static: false}) form: NgForm;
  
  fileToUpload: File = null;
  private imageService: ImageService;
  public examinedImageResponse: any;
  public dlPredictResponse: any;
  public removeHairResponse: any;
  public loading: boolean = false;
  public removeHairLoading: boolean = false;
  public removeHairClicked: boolean = false;
  public submitted: boolean = false;
  public dlPredictLoading: boolean = false;
  public dlPredictClicked: boolean = false;
  public entries : any = [];
  public entriesFetching: boolean = false;
  remHairURL: string;
  dlURL: string;
  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;
  public imagesData: any;
  isFetching = false;
  patientResponse = null;
  amka: any;
  date: any;
  dateNow: any;
  comments: any;
  name: any;
  public invalidError: boolean;
  public entry = {"amka": "","name": "","comments": "","finalImage": "", "result": "", "date": "", "dateNow": ""};

  constructor(imageService: ImageService, 
    public rest: RestService,
    private router: Router) {
    this.imageService = imageService;
  }


  ngOnInit(): void {
    this.getDateNow();
  }

  createEntry(): void {
    this.router.navigate(['/photo-add']);
  }

  postDataToJson(entry): void {
    //console.log(this.entry);
    console.log(this.amka);
    this.amka = this.amka.toString().trim();
    this.entry = {"amka": this.amka,"name": this.name,"comments": entry.comments,"finalImage": this.cardImageBase64, "result" : this.examinedImageResponse, "date" : entry.date, "dateNow": this.dateNow};
    this.rest.postDataToJson(this.entry).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/photos-get']);
    }, (err) => {
      console.log(err);
    });
  }

  deleteDataFromJson(id): void {
    this.rest.deleteDataFromJson(id).subscribe((data: any) => {
      return this.imagesData = data;
    });
  }
  getPatient(amka): void {
    // this.invalidError = false;
    this.patientResponse = null;
    amka = amka.toString().trim();
    if (amka.length >= 11) {
      this.isFetching = true;
      this.rest.getPatientInfo(amka).subscribe((data: any) => {
        this.patientResponse = data;
        this.name = this.patientResponse.firstName + ' ' + this.patientResponse.lastName;
        console.log(this.patientResponse);
        // var covidMessage = this.patientResponse.covidVaccineMessage;
        this.invalidError = false;
        this.isFetching = false;
      }, (err) => {
        this.invalidError = true;
        console.log('error!!',err);
      }); 
    }
  }

  getDateNow() {
    var months = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];
    var d = new Date();
    var year = d.getFullYear(); 
    var month = d.getMonth();
    var day = d.getDate();
    this.dateNow = day +' '+ months[month] +' '+ year;
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
    this.examinedImageResponse = false;
    this.fileToUpload = null;
    this.dlPredictClicked = false;
    this.removeHairClicked = false;
  }

  viewEntryDetails(id): void {
    this.router.navigate(['/photo-get/' + id]);
  }

  getDataFromJson(amka): void {
    this.entriesFetching = true;
    this.rest.getDataFromJson().subscribe((data: any) => {
      this.imagesData = data;
      this.lookFromOtherEntries(amka, this.imagesData);
      this.entriesFetching = false;
    });
  }

  lookFromOtherEntries(amka, data) {
    this.entries = [];
    console.log('going to amka:  '+amka);
    var searchField = "amka";
    var searchVal = amka;
    for (var i=0 ; i < data.length ; i++)
    {
      if (data[i][searchField] == searchVal) {
        this.entries[i] = data[i];
      }
    }
    console.log(this.entries);
  }


  public fileSelectedLabel() {
    if (this.fileToUpload) {
      return this.fileToUpload.name;
    } else {
      return "Επιλέξτε αρχείο";
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
  removeHairImage() {
    this.removeHairResponse = null;
    this.removeHairLoading = true;
    this.removeHairClicked = true;
    this.imageService.removeHairImage(this.fileToUpload).subscribe(res => {

      this.removeHairResponse = res.hair_rm;
      this.remHairURL = 'http://83.212.109.205:50/images/' + this.removeHairResponse;
      this.removeHairLoading = false;
    }, (err) => {
      console.log('error',err);
    });
  }

  dlPredict() {
    this.dlPredictResponse = null;
    this.dlPredictLoading = true;
    this.dlPredictClicked = true;
    this.imageService.dlPredictImage(this.fileToUpload).subscribe(res => {

      this.dlPredictResponse = res.image_name;
      this.dlURL = 'http://83.212.109.205:50/images/' + this.dlPredictResponse;
      this.dlPredictLoading = false;
    }, (err) => {
      console.log('error',err);
    });
  }

  submit() {
    this.examinedImageResponse = null;
    this.loading = true;
    this.submitted = true;
    this.dlPredictClicked = false;
    this.removeHairClicked = false;
    this.imageService.examineImage(this.fileToUpload).subscribe(res => {

      console.log(res);
      let examinedTypeResult : ExaminedImageResponse = ExaminedImageResponse[res.class];
      console.log(examinedTypeResult);

      this.examinedImageResponse = examinedTypeResult;
      this.loading = false;
    })
  }

}
