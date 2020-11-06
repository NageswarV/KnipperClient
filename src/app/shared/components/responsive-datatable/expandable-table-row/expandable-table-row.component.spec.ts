import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableTableRowComponent } from './expandable-table-row.component';

describe('ExpandableTableRowComponent', () => {
  let component: ExpandableTableRowComponent;
  let fixture: ComponentFixture<ExpandableTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandableTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandableTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
