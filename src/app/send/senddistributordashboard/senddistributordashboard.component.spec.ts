import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenddistributordashboardComponent } from './senddistributordashboard.component';

describe('SenddistributordashboardComponent', () => {
  let component: SenddistributordashboardComponent;
  let fixture: ComponentFixture<SenddistributordashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenddistributordashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenddistributordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
