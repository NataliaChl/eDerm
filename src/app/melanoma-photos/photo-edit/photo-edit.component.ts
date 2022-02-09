import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/image.service';
import { RestService } from 'src/app/rest.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {

  entryId: string;
  private imageService: ImageService;
  public loading: boolean = false;
  public imagesData: any;
  public id: string;
  public result : any;
  isFetching = false;
  patientResponse = null;
  amka: any;
  date: any;
  dateNow: any;
  comments: any;
  name: any;
  public updatedEntry = {"amka": "","name": "","comments": "","finalImage": "", "result": "", "date": "", "dateNow": ""};

  constructor(imageService: ImageService, 
    public rest: RestService,
    private router: Router) {
    this.imageService = imageService;
  }

  ngOnInit(): void {
    this.getDataFromJson();
   
  }

  getEntry(id, data): void {
    console.log('going to search in:  '+id);

    var searchField = "id";
    var searchVal = id;
    for (var i=0 ; i < data.length ; i++)
    {
      if (data[i][searchField] == searchVal) {
        this.result = data[i];
      }
    }
    console.log(this.result);
  }

  getDataFromJson(): void {
    this.isFetching = true;
    this.rest.getDataFromJson().subscribe((data: any) => {
      this.imagesData = data;
      this.getEntryId();
      this.getEntry(this.id, data);
      this.isFetching = false;
    });
  }

  getEntryId(): void {
    var url = window.location.href;
    var id = url.substring(url.indexOf('photo-edit/') + 11);
    this.id = id;
  }

  updateDataOnJson(): void {
    if (this.result.finalImage == undefined) {this.result.finalImage = ""};
    if (this.result.date == undefined) {this.result.date = ""};
    if (this.result.result == undefined) {this.result.result = ""};
    this.updatedEntry = {"amka": this.result.amka,"name": this.result.name,"comments": this.result.comments,"finalImage": this.result.finalImage, "result" : this.result.result, "date" : this.result.date, "dateNow": this.result.dateNow};
    //console.log(this.updatedEntry);
    this.rest.updateDataOnJson(this.updatedEntry , this.id).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/photos-get']);
    }, (err) => {
      console.log(err);
    });
  }

  deleteDataFromJson(): void {
    this.rest.deleteDataFromJson(this.id).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/photos-get']);
    }, (err) => {
      console.log(err);
    });
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
}
