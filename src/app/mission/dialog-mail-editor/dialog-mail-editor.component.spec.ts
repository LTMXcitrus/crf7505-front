import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMailEditorComponent } from './dialog-mail-editor.component';

describe('DialogMailEditorComponent', () => {
  let component: DialogMailEditorComponent;
  let fixture: ComponentFixture<DialogMailEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMailEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
