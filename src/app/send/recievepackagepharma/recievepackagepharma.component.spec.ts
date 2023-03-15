import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievepackagepharmaComponent } from './recievepackagepharma.component';

describe('RecievepackagepharmaComponent', () => {
  let component: SendpharmaComponent;
  let fixture: ComponentFixture<SendpharmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievepackagepharmaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievepackagepharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
