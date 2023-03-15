import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendwholesalerdashboardComponent } from './sendwholesalerdashboard.component';

describe('SendwholesalerdashboardComponent', () => {
  let component: SendwholesalerdashboardComponent;
  let fixture: ComponentFixture<SendwholesalerdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendwholesalerdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendwholesalerdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
