import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagetransporterComponent } from './packagetransporter.component';

describe('PackagetransporterComponent', () => {
  let component: PackagetransporterComponent;
  let fixture: ComponentFixture<PackagetransporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagetransporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagetransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
