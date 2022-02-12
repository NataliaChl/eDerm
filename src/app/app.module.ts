import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {VisitsGetComponent} from './visit/visits-get/visits-get.component';
import {PrescriptionsGetComponent} from './prescription/prescriptions-get/prescriptions-get.component';
import {PrescriptionGetComponent} from './prescription/prescription-get/prescription-get.component';
import {VisitGetComponent} from './visit/visit-get/visit-get.component';
import {VisitAddComponent} from './visit/visit-add/visit-add.component';
import {PrescriptionAddComponent} from './prescription/prescription-add/prescription-add.component';
import {NgbButtonsModule, NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalContentComponent} from './ngbd-modal-content/ngbd-modal-content.component';
import {RouterModule, Routes} from '@angular/router';
import {VisitDeleteConfirmModalComponent} from './visit/visit-delete-confirm-modal/visit-delete-confirm-modal.component';
import {PrescriptionDeleteConfirmModalComponent} from './prescription/prescription-delete-confirm-modal/prescription-delete-confirm-modal.component';
import {VisitEditComponent} from './visit/visit-edit/visit-edit.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {AuthGuard} from './auth/auth.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DoctorInfoComponent} from './doctor-info/doctor-info.component';
import {PrescriptionEditComponent} from './prescription/prescription-edit/prescription-edit.component';
import { AmkaSearchComponent } from './amka-search/amka-search.component';
import { PhotoAddComponent } from './melanoma-photos/photo-add/photo-add.component'
import { PhotosGetComponent } from './melanoma-photos/photos-get/photos-get.component';
import { PhotoEditComponent } from './melanoma-photos/photo-edit/photo-edit.component';
import { PhotoDeleteComponent } from './melanoma-photos/photo-delete/photo-delete.component';
import { PhotoGetComponent } from './melanoma-photos/photo-get/photo-get.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/amka-search',
    pathMatch: 'full'
  },
  {
    path: 'amka-search',
    component: AmkaSearchComponent,
    data: {title: 'Amka-search'},
    canActivate: [AuthGuard]
  },
  {
    path: 'visits',
    component: VisitsGetComponent,
    data: {title: 'Visits'},
    canActivate: [AuthGuard]
  },
  {
    path: 'create-visit',
    component: VisitAddComponent,
    data: {title: 'Create New Visit'},
    canActivate: [AuthGuard]
  },
  {
    path: 'visit-details/:id',
    component: VisitGetComponent,
    data: {title: 'Visit Details'},
    canActivate: [AuthGuard]
  },
  {
    path: 'visit-edit/:id',
    component: VisitEditComponent,
    data: {title: 'Edit Visit'},
    canActivate: [AuthGuard]
  },
  {
    path: 'prescriptions',
    component: PrescriptionsGetComponent,
    data: {title: 'Prescriptions'},
    canActivate: [AuthGuard]
  },
  {
    path: 'prescription-details/:id',
    component: PrescriptionGetComponent,
    data: {title: 'Prescription Details'},
    canActivate: [AuthGuard]
  },
  {
    path: 'create-prescription/:visitId',
    component: PrescriptionAddComponent,
    data: {title: 'Create New Prescription'},
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-prescription/:prescriptionId',
    component: PrescriptionEditComponent,
    data: {title: 'Edit Prescription'},
    canActivate: [AuthGuard]
  },
  {
    path: 'photos-get',
    component: PhotosGetComponent,
    data: {title: 'photos get'},
    canActivate: [AuthGuard]
  },
  {
    path: 'photo-get/:id',
    component: PhotoGetComponent,
    data: {title: 'photo get'},
    canActivate: [AuthGuard]
  },
  {
    path: 'photo-edit/:id',
    component: PhotoEditComponent,
    data: {title: 'photo edit'},
    canActivate: [AuthGuard]
  },
  {
    path: 'photo-add',
    component: PhotoAddComponent,
    data: {title: 'photos add'},
    canActivate: [AuthGuard]
  },
  {
    path: 'me',
    component: DoctorInfoComponent,
    data: {title: 'Doctor Information'},
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {title: 'Page Not Found'}
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    AmkaSearchComponent,
    VisitsGetComponent,
    VisitGetComponent,
    VisitAddComponent,
    NgbdModalContentComponent,
    VisitDeleteConfirmModalComponent,
    VisitEditComponent,
    PrescriptionsGetComponent,
    PrescriptionGetComponent,
    PrescriptionDeleteConfirmModalComponent,
    PrescriptionAddComponent,
    LoginComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DoctorInfoComponent,
    PrescriptionEditComponent,
    PhotoAddComponent,
    PhotosGetComponent,
    PhotoEditComponent,
    PhotoDeleteComponent,
    PhotoGetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbDatepickerModule, NgbDropdownModule,
    RouterModule.forRoot(appRoutes), NgbButtonsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
