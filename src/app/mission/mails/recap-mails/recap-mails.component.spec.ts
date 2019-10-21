import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapMailsComponent } from './recap-mails.component';

describe('RecapMailsComponent', () => {
  let component: RecapMailsComponent;
  let fixture: ComponentFixture<RecapMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
