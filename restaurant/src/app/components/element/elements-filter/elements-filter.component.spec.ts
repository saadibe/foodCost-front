import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsFilterComponent } from './elements-filter.component';

describe('ElementsFilterComponent', () => {
  let component: ElementsFilterComponent;
  let fixture: ComponentFixture<ElementsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
