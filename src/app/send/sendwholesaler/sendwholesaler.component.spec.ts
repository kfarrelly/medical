import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendwholesalerComponent } from './sendwholesaler.component';

describe('SendwholesalerComponent', () => {
  let component: SendwholesalerComponent;
  let fixture: ComponentFixture<SendwholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendwholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendwholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
