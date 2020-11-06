import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepPushShipmentListComponent } from './rep-push-shipment-list.component';

describe('RepPushShipmentListComponent', () => {
  let component: RepPushShipmentListComponent;
  let fixture: ComponentFixture<RepPushShipmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepPushShipmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepPushShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
