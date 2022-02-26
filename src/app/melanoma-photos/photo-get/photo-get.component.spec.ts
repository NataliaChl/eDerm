import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGetComponent } from './photo-get.component';

describe('PhotoGetComponent', () => {
  let component: PhotoGetComponent;
  let fixture: ComponentFixture<PhotoGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
