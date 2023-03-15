import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenddistributorreportComponent } from './senddistributorreport.component';

describe('SenddistributorreportComponent', () => {
  let component: SenddistributorreportComponent;
  let fixture: ComponentFixture<SenddistributorreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenddistributorreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenddistributorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
