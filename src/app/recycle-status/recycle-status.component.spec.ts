import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleStatusComponent } from './recyle-status.component';

describe('RecyleStatusComponent', () => {
  let component: RecycleStatusComponent;
  let fixture: ComponentFixture<RecycleStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
