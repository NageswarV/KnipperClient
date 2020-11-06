import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackoutHoldModalComponent } from './blackout-hold-modal.component';

describe('BlackoutHoldModalComponent', () => {
  let component: BlackoutHoldModalComponent;
  let fixture: ComponentFixture<BlackoutHoldModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlackoutHoldModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackoutHoldModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
