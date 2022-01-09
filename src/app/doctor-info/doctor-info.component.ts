import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {Doctor} from '../entity/doctor';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {
  constructor(public rest: RestService) {
  }

  doctor: Doctor;
  isFetching = false;

  ngOnInit(): void {
    this.getDoctorMe();
  }

  getDoctorMe(): void {
    this.isFetching = true;
    this.rest.getDoctorInfoMe().subscribe((data: any) => {
      this.doctor = data;
      this.isFetching = false;
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
