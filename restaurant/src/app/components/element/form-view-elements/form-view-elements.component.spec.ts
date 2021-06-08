import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewElementsComponent } from './form-view-elements.component';

describe('FormViewElementsComponent', () => {
  let component: FormViewElementsComponent;
  let fixture: ComponentFixture<FormViewElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormViewElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormViewElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
