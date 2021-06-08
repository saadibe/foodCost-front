import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsGridComponent } from './elements-grid.component';

describe('ElementsGridComponent', () => {
  let component: ElementsGridComponent;
  let fixture: ComponentFixture<ElementsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
