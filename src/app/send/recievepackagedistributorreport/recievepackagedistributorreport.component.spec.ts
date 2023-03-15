import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievepackagedistributorreportComponent } from './recievepackagedistributorreport.component';

describe('RecievepackagedistributorreportComponent', () => {
  let component: RecievepackagedistributorreportComponent;
  let fixture: ComponentFixture<RecievepackagedistributorreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievepackagedistributorreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievepackagedistributorreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
