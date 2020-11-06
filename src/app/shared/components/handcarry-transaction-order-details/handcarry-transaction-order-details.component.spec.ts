import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandcarryTransactionOrderDetailsComponent } from './handcarry-transaction-order-details.component';

describe('HandcarryTransactionOrderDetailsComponent', () => {
  let component: HandcarryTransactionOrderDetailsComponent;
  let fixture: ComponentFixture<HandcarryTransactionOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandcarryTransactionOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandcarryTransactionOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
