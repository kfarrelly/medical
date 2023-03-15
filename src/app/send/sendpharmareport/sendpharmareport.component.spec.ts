import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpharmareportComponent } from './sendpharmareport.component';

describe('SendpharmareportComponent', () => {
  let component: SendpharmareportComponent;
  let fixture: ComponentFixture<SendpharmareportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendpharmareportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpharmareportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
