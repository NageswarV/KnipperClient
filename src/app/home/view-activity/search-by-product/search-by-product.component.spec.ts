import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByProductComponent } from './search-by-product.component';

describe('SearchByProductComponent', () => {
  let component: SearchByProductComponent;
  let fixture: ComponentFixture<SearchByProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
