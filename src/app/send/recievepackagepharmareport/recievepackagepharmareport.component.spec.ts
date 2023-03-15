import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievepackagepharmareportComponent } from './recievepackagepharmareport.component';

describe('RecievepackagepharmareportComponent', () => {
  let component: RecievepackagepharmareportComponent;
  let fixture: ComponentFixture<RecievepackagepharmareportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievepackagepharmareportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievepackagepharmareportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
