import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievepackagewholesalerreportComponent } from './recievepackagewholesalerreport.component';

describe('RecievepackagewholesalerreportComponent', () => {
  let component: RecievepackagewholesalerreportComponent;
  let fixture: ComponentFixture<RecievepackagewholesalerreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievepackagewholesalerreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievepackagewholesalerreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
