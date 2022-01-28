import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-delete',
  templateUrl: './photo-delete.component.html',
  styleUrls: ['./photo-delete.component.css']
})
export class PhotoDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
