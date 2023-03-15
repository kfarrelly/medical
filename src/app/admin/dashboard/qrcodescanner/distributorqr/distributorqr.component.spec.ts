import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorqrComponent } from './distributorqr.component';

describe('DistributorqrComponent', () => {
  let component: DistributorqrComponent;
  let fixture: ComponentFixture<DistributorqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
