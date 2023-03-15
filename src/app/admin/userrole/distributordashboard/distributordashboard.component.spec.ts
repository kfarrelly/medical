import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributordashboardComponent } from './distributordashboard.component';

describe('DistributordashboardComponent', () => {
  let component: DistributordashboardComponent;
  let fixture: ComponentFixture<DistributordashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributordashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
