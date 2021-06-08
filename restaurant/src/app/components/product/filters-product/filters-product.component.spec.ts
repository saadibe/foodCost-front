import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersProductComponent } from './filters-product.component';

describe('FiltersProductComponent', () => {
  let component: FiltersProductComponent;
  let fixture: ComponentFixture<FiltersProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
