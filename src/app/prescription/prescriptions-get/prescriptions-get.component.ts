import {Component, OnInit} from '@angular/core';
import {RestService} from '../../rest.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PrescriptionDeleteConfirmModalComponent} from '../prescription-delete-confirm-modal/prescription-delete-confirm-modal.component';
import {PrescriptionsList} from '../../entity/prescriptions-list';

@Component({
  selector: 'app-prescriptions-get',
  templateUrl: './prescriptions-get.component.html',
  styleUrls: ['./prescriptions-get.component.css']
})
export class PrescriptionsGetComponent implements OnInit {
  constructor(public rest: RestService,
              private router: Router,
              private ngbModal: NgbModal) {
  }

  prescriptions: PrescriptionsList;
  isFetching = false;

  ngOnInit(): void {
    this.getPrescriptions();
  }

  openConfirmDeleteModal(id): void {
    this.ngbModal.open(PrescriptionDeleteConfirmModalComponent).result.then(() => {
      this.deletePrescription(id);
    });
  }

  editPrescription(id): void {
    this.router.navigate(['/edit-prescription/' + id]);
  }

  viewPrescriptionDetails(id): void {
    this.router.navigate(['/prescription-details/' + id]);
  }

  getPrescriptions(): void {
    this.prescriptions = null;
    this.isFetching = true;
    this.rest.getPrescriptions().subscribe((data: PrescriptionsList) => {
      console.log(data);
      this.prescriptions = data;
      this.isFetching = false;
    });
  }

  deletePrescription(id): void {
    this.rest.deletePrescription(id).subscribe((result) => {
      console.log(result);
      if (result !== null) {
        for (const prescription of this.prescriptions.item) {
          if (prescription.barcode === id) {
            prescription.status.status = 'ΑΚΥΡΩΜΕΝΗ';
          }
        }
      }
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

  searchDesktop(event: Event) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, counter = 0;
    input = document.getElementById("myInputDesk");
    filter = input.value.toUpperCase();
    table = document.getElementById("myDeskTable");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
        if (tr[i].style.display == 'none') {
          counter = counter + 1;
        } else {
          counter = 0;
        }
      }
    }
    var error = document.getElementById("not-found");
    var head = document.getElementById("desk-head");
    if (counter == tr.length) {
      if (error == null) {
        const para = document.createElement("div");
        para.innerHTML = '<div id="not-found" style="margin-top: 30px" class="alert alert-danger" role="alert">Δε βρέθηκε κανένα αποτέλεσμα</div>';
        document.getElementById('desktop-table').appendChild(para);
      } else {
        error.style.display = "";
      }
      head.style.display = "none";
    } else {
        if (error != null) {
          error.style.display = "none";
        }
        if (head.style.display === 'none') {
          head.style.display = "";
        }
    }
  }
  searchMedium(event: Event) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, amka, counter = 0;
    input = document.getElementById("myInputMed");
    filter = input.value.toUpperCase();
    table = document.getElementById("myMedTable");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      amka = td.querySelector(".amka");
      if (amka) {
        txtValue = amka.textContent || amka.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
        if (tr[i].style.display == 'none') {
          counter = counter + 1;
        } else {
          counter = 0;
        }
      }
    }
    var error = document.getElementById("not-found");
    var head = document.getElementById("mid-head");
    if (counter == tr.length) {
      if (error == null) {
        const para = document.createElement("div");
        para.innerHTML = '<div id="not-found" style="margin-top: 20px" class="alert alert-danger" role="alert">Δε βρέθηκε κανένα αποτέλεσμα</div>';
        document.getElementById('mid-table').appendChild(para);
      } else {
        error.style.display = "";
      }
      head.style.display = "none";
    } else {
        if (error != null) {
          error.style.display = "none";
        }
        if (head.style.display === 'none') {
          head.style.display = "";
        }
    }
  }
  searchMobile(event: Event) {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, amka, counter = 0;
    input = document.getElementById("myInputMob");
    filter = input.value.toUpperCase();
    table = document.getElementById("myMobTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      amka = td.querySelector(".amka");
      
      if (amka) {
        txtValue = amka.textContent || amka.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
        if (tr[i].style.display == 'none') {
          counter = counter + 1;
        } else {
          counter = 0;
        }
      }
    }
    var error = document.getElementById("not-found");
    var head = document.getElementById("mob-head");
    if (counter == tr.length) {
      if (error == null) {
        const para = document.createElement("div");
        para.innerHTML = '<div id="not-found" style="margin-top: 18px" class="alert alert-danger" role="alert">Δε βρέθηκε κανένα αποτέλεσμα</div>';
        document.getElementById('mobile-table').appendChild(para);
      } else {
        error.style.display = "";
      }
      head.style.display = "none";
    } else {
        if (error != null) {
          error.style.display = "none";
        }
        if (head.style.display === 'none') {
          head.style.display = "";
        }
    }
  }
}
