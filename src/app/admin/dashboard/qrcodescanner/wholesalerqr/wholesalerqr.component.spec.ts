import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WholesalerqrComponent } from './wholesalerqr.component';

describe('WholesalerqrComponent', () => {
  let component: WholesalerqrComponent;
  let fixture: ComponentFixture<WholesalerqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WholesalerqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WholesalerqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
