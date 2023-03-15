import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpharmadashboardComponent } from './sendpharmadashboard.component';

describe('SendpharmadashboardComponent', () => {
  let component: SendpharmadashboardComponent;
  let fixture: ComponentFixture<SendpharmadashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendpharmadashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpharmadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
