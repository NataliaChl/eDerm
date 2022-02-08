import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/image.service';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-photo-get',
  templateUrl: './photo-get.component.html',
  styleUrls: ['./photo-get.component.css']
})
export class PhotoGetComponent implements OnInit {
  entryId: string;
  private imageService: ImageService;
  public imagesData: any;
  public id: string;
  public result : any;
  isFetching = false;
  constructor(imageService: ImageService, 
    public rest: RestService,
    private router: Router) {
    this.imageService = imageService;
  }

  ngOnInit(): void {
    
    this.getDataFromJson();
    
    // this.getEntryId();
    
    // console.log(this.imagesData);
    // this.getEntry(this.entryId , this.imagesData);
    //console.log(id)
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
    var id = url.substring(url.indexOf('photo-get/') + 10);
    this.id = id;
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
