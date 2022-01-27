import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDeleteComponent } from './photo-delete.component';

describe('PhotoDeleteComponent', () => {
  let component: PhotoDeleteComponent;
  let fixture: ComponentFixture<PhotoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
