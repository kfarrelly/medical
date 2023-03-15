import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpharmaComponent } from './sendpharma.component';

describe('SendpharmaComponent', () => {
  let component: SendpharmaComponent;
  let fixture: ComponentFixture<SendpharmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendpharmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
