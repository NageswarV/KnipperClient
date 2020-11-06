import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepOrderListComponent } from './rep-order-list.component';

describe('RepOrderListComponent', () => {
  let component: RepOrderListComponent;
  let fixture: ComponentFixture<RepOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
