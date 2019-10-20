import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingSummaryComponent } from './missing-summary.component';

describe('MissingSummaryComponent', () => {
  let component: MissingSummaryComponent;
  let fixture: ComponentFixture<MissingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
