import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandcarryDistbursementOrderDetailsComponent } from './handcarry-distbursement-order-details.component';

describe('HandcarryDistbursementOrderDetailsComponent', () => {
  let component: HandcarryDistbursementOrderDetailsComponent;
  let fixture: ComponentFixture<HandcarryDistbursementOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandcarryDistbursementOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandcarryDistbursementOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
