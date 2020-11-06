import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInventoryComponent } from './products-inventory.component';

describe('ProductsGridComponent', () => {
  let component: ProductsInventoryComponent;
  let fixture: ComponentFixture<ProductsInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
