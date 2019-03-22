import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PegassLoginDialogComponent } from './pegass-login-dialog.component';

describe('PegassLoginDialogComponent', () => {
  let component: PegassLoginDialogComponent;
  let fixture: ComponentFixture<PegassLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PegassLoginDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PegassLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
