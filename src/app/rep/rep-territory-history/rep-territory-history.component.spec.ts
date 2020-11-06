import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepTerritoryHistoryComponent } from './rep-territory-history.component';

describe('RepTerritoryHistoryComponent', () => {
  let component: RepTerritoryHistoryComponent;
  let fixture: ComponentFixture<RepTerritoryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepTerritoryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepTerritoryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
