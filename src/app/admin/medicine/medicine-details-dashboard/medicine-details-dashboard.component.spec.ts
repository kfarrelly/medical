import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineDetailsDashboardComponent } from './medicine-details-dashboard.component';

describe('MedicineDetailsDashboardComponent', () => {
  let component: MedicineDetailsDashboardComponent;
  let fixture: ComponentFixture<MedicineDetailsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDetailsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
