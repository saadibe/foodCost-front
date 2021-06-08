import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarconstructorComponent } from './barconstructor.component';

describe('BarconstructorComponent', () => {
  let component: BarconstructorComponent;
  let fixture: ComponentFixture<BarconstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarconstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarconstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
