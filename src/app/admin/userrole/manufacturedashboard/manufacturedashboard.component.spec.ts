import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturedashboardComponent } from './manufacturedashboard.component';

describe('ManufacturedashboardComponent', () => {
  let component: ManufacturedashboardComponent;
  let fixture: ComponentFixture<ManufacturedashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturedashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
