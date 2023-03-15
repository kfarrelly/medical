import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievepackagewholesalerComponent } from './recievepackagewholesaler.component';

describe('RecievepackagewholesalerComponent', () => {
  let component: RecievepackagewholesalerComponent;
  let fixture: ComponentFixture<RecievepackagewholesalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievepackagewholesalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievepackagewholesalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
