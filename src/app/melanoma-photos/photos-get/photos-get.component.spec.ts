import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosGetComponent } from './photos-get.component';

describe('PhotosGetComponent', () => {
  let component: PhotosGetComponent;
  let fixture: ComponentFixture<PhotosGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
