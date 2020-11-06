import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepOrderListFilterComponent } from './rep-order-list-filter.component';

describe('RepOrderListFilterComponent', () => {
  let component: RepOrderListFilterComponent;
  let fixture: ComponentFixture<RepOrderListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepOrderListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepOrderListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
