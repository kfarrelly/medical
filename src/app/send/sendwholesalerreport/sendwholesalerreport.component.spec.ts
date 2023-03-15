import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendwholesalerreportComponent } from './sendwholesaler.component';

describe('SendwholesalerreportComponent', () => {
  let component: SendwholesalerreportComponent;
  let fixture: ComponentFixture<SendwholesalerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendwholesalerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendwholesalerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
