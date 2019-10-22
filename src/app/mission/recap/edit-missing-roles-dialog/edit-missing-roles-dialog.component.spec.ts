import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMissingRolesDialogComponent } from './edit-missing-roles-dialog.component';

describe('EditMissingRolesDialogComponent', () => {
  let component: EditMissingRolesDialogComponent;
  let fixture: ComponentFixture<EditMissingRolesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMissingRolesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMissingRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
