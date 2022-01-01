import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPhotoComponent } from './search-by-photo.component';

describe('SearchByPhotoComponent', () => {
  let component: SearchByPhotoComponent;
  let fixture: ComponentFixture<SearchByPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
