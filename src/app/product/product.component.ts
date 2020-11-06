import { Component, OnInit } from '@angular/core';
import { ProductFilterCriteria } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  isCollapsed: boolean;
  productsFilter: ProductFilterCriteria;

  constructor() { }

  ngOnInit() {
    this.isCollapsed = false;
    this.initFilter();
  }

  onCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  initFilter() {
    this.productsFilter = new ProductFilterCriteria();
    this.productsFilter.productName = '';
  }

  applyFilter(filter : ProductFilterCriteria) {
    this.productsFilter=filter;
  }
}
