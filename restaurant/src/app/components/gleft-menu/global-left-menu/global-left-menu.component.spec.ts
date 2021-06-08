import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalLeftMenuComponent } from './global-left-menu.component';

describe('GlobalLeftMenuComponent', () => {
  let component: GlobalLeftMenuComponent;
  let fixture: ComponentFixture<GlobalLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalLeftMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
