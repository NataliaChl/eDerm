import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {Visit} from '../entity/visit';
import { Router } from '@angular/router';
import { PrescriptionsList } from '../entity/prescriptions-list';

@Component({
  selector: 'app-amka-search',
  templateUrl: './amka-search.component.html',
  styleUrls: ['./amka-search.component.css']
})
export class AmkaSearchComponent implements OnInit {
  // fixedUrl: boolean;
  amka: any;
  visit: Visit;
  changeText: boolean;
  isFetching = false;
  loading = false;
  prescFetching = false;
  patientResponse = null;
  noAnswer: boolean = false;
  public imagesData: any = null;
  public results: any = [];
  public amkaPrescriptions: any;
  public barcode: any;
  prescriptions: any;
  
  constructor(public rest: RestService,
    private router: Router) {
  }
  
  ngOnInit(): void {
  }

  getDataFromJson(): void {
    this.loading = true;
    this.rest.getDataFromJson().subscribe((data: any) => {
      this.imagesData = data;
      this.amka = this.amka.toString().trim();
      this.getEntry(this.amka, this.imagesData);
      this.loading = false;
    });
  }

  getEntry(amka, data): void {
    this.results = [];
    var searchField = "amka";
    var searchVal = amka;
    for (var i=0 ; i < data.length ; i++)
    {
      if (data[i][searchField] == searchVal) {
        this.results[i] = data[i];
        console.log(data[i]);
      }
    }
   console.log(this.results.length);
  }

  getPatient(amka): void {
    this.isFetching = true;
    this.noAnswer = false;
    this.patientResponse = null;
    amka = amka.toString().trim();
    this.rest.getPatientInfo(amka).subscribe((data: any) => {
      this.patientResponse = data;
      this.isFetching = false;
    }, (err) => {
      this.isFetching = false;
      this.noAnswer = true;
    });
  }

  getAmkaPrescriptions(amka, data): void {
    this.amkaPrescriptions = [];
    var searchVal = amka;
    for (var i=0 ; i < data.length ; i++)
    {
      if (data[i].patientInfo.amka == searchVal) {
        this.amkaPrescriptions[i] = data[i];
      }
    }
    console.log(this.amkaPrescriptions);
  }

  getAllPrescriptions(): void {
    this.prescriptions = null;
    this.barcode = null;
    this.prescFetching = true;
    this.rest.getPrescriptions().subscribe((data: PrescriptionsList) => {
      this.prescriptions = data.item;
      this.getAmkaPrescriptions(this.amka, this.prescriptions);
      this.prescFetching = false;
    });
  }

  viewPrescriptionDetails(barcode): void {
    this.router.navigate(['/prescription-details/' + barcode]);
  }
  viewEntryDetails(id): void {
    this.router.navigate(['/photo-get/' + id]);
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
