import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenddistributorComponent } from './senddistributor.component';

describe('SenddistributorComponent', () => {
  let component: SenddistributorComponent;
  let fixture: ComponentFixture<SenddistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenddistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenddistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
