import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByHCPComponent } from './search-by-hcp.component';

describe('SearchByHCPComponent', () => {
  let component: SearchByHCPComponent;
  let fixture: ComponentFixture<SearchByHCPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByHCPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByHCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
