import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amka-search',
  templateUrl: './amka-search.component.html',
  styleUrls: ['./amka-search.component.css']
})
export class AmkaSearchComponent implements OnInit {

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
