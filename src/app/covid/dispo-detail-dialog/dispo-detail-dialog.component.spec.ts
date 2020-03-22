import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispoDetailDialogComponent } from './dispo-detail-dialog.component';

describe('DispoDetailDialogComponent', () => {
  let component: DispoDetailDialogComponent;
  let fixture: ComponentFixture<DispoDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispoDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
