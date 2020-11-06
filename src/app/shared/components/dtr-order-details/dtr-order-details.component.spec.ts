import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtrOrderDetailsComponent } from './dtr-order-details.component';

describe('DtrOrderDetailsComponent', () => {
  let component: DtrOrderDetailsComponent;
  let fixture: ComponentFixture<DtrOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtrOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtrOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
