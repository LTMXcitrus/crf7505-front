import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MotComponent} from './mot.component';

describe('MotComponent', () => {
  let component: MotComponent;
  let fixture: ComponentFixture<MotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
