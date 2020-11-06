import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByRepComponent } from './search-by-rep.component';

describe('SearchByRepComponent', () => {
  let component: SearchByRepComponent;
  let fixture: ComponentFixture<SearchByRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
