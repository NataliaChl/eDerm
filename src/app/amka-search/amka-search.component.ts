import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {Visit} from '../entity/visit';

@Component({
  selector: 'app-amka-search',
  templateUrl: './amka-search.component.html',
  styleUrls: ['./amka-search.component.css']
})
export class AmkaSearchComponent implements OnInit {
  // fixedUrl: boolean;
  amka: number;
  visit: Visit;
  isFetching = false;
  patientResponse = null;

  constructor(public rest: RestService) {
  }
  
  ngOnInit(): void {
  }

  getPatient(amka): void {
    this.isFetching = true;
    amka = amka.toString().trim();
    console.log(amka);
    this.rest.getPatientInfo(amka).subscribe((data: any) => {
      this.patientResponse = data;
      console.log(this.patientResponse);
      // var covidMessage = this.patientResponse.covidVaccineMessage;
      this.isFetching = false;
    });
  }
  closeAlert(): void {
    document.querySelector('.font-weight-light').classList.toggle('hidden');
  }
  
  // removeUrlString(covidMessage): void {
  //   console.log(covidMessage);
  //   this.fixedUrl = true;
  //   var covidMessagethis = this.patientResponse.covidVaccineMessage;
  //   console.log(covidMessagethis.indexOf('https://'));
  //   var place = covidMessagethis.indexOf('https://');
  //   console.log(covidMessagethis.slice(place));
  //   covidMessagethis.replace(place , 'OK');
  // }

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
