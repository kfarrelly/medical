import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterqrComponent } from './transporterqr.component';

describe('TransporterqrComponent', () => {
  let component: TransporterqrComponent;
  let fixture: ComponentFixture<TransporterqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporterqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
