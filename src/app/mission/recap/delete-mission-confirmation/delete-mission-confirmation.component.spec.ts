import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMissionConfirmationComponent } from './delete-mission-confirmation.component';

describe('DeleteMissionConfirmationComponent', () => {
  let component: DeleteMissionConfirmationComponent;
  let fixture: ComponentFixture<DeleteMissionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMissionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMissionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
