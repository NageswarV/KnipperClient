import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

import { IGridColumns } from '../../shared/grid.component';
import { Product, Rep } from '../../../generated/service-client';
import { BusySpinner } from '../../common/busy-spinner';
import { ProductFilterCriteria } from '../product.model';
import { forkJoin } from 'rxjs';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-products-inventory',
  templateUrl: './products-inventory.component.html',
  styleUrls: ['./products-inventory.component.scss']
})
export class ProductsInventoryComponent extends BusySpinner implements OnInit, OnChanges {
  @Input() productsFilter: ProductFilterCriteria;

  byInventory = true;
  allInventoryProducts;
  allOrderProducts;
  lotPageSize: number = 10;
  componentId: string;
  viewByOrderProducts: Product[];
  selectedTab;
  productsByInventory;
  productsPerPage;
  totalRecordCount: number;
  pageSize = 3;
  // currentPage = 1;
  columns: IGridColumns[];

  currentPageInventory = 1;
  currentPagebyOrder = 1;
  sortingType = 'asc';

  constructor(private productService: ProductService) {
    super();
    this.columns = [
      { title: 'Lot #', classes: 'col-xs-2' },
      { title: 'Lot # Expiration Date', classes: 'col-xs-2' },
      { title: 'Last Use Date', classes: 'col-xs-2' },
      { title: 'Available Quantity', classes: 'col-xs-2' },
      { title: 'Marked Quantity', classes: 'col-xs-2' },
      { title: 'Unavailable Quantity', classes: 'col-xs-2' }
    ];
    this.componentId = performance.now().toString();
  }

  ngOnInit() {
    var data = forkJoin(this.productService.GetProductsByInventory(), this.productService.GetProductForViewByOrder());

    this.setBusySpinner(data).subscribe(res => {
      this.productsByInventory = res[0];
      this.allInventoryProducts = res[0];
      this.totalRecordCount = this.productsByInventory.length;
      this.productsPerPage = this.productsByInventory.slice(0, this.pageSize);
      this.viewByOrderProducts = res[1];
        this.allOrderProducts = res[1];
        this.sortProducts();
    });
  }

  viewByOrder() {
    if (this.byInventory) {
      this.byInventory = !this.byInventory;
    }
    this.totalRecordCount = this.viewByOrderProducts.length;
    this.productsPerPage = this.viewByOrderProducts.slice(0, this.pageSize);

  }

  viewByInventory() {
    if (!this.byInventory) {
      this.byInventory = !this.byInventory;
    }
    this.totalRecordCount = this.productsByInventory.length;
    this.productsPerPage = this.productsByInventory.slice(0, this.pageSize);
  }

  pageChange(pageNumber: number): void {
    //--------------------
    //   this.currentPage = pageNumber;
    //   if(this.byInventory)
    //     this.productsPerPage = this.productsByInventory.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    //   else 
    //     this.productsPerPage = this.viewByOrderProducts.slice(this.currentPage == 1 ? 0 : (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    if (this.byInventory) {
      this.currentPageInventory = pageNumber;
      this.productsPerPage = this.productsByInventory.slice(this.currentPageInventory == 1 ? 0 : (this.currentPageInventory - 1) * this.pageSize, this.currentPageInventory * this.pageSize);

    } else {
      this.currentPagebyOrder = pageNumber;
      var remainingItemsCount = this.totalRecordCount - ((this.currentPagebyOrder - 1) * this.pageSize);
      var itemsToLoad = remainingItemsCount > this.pageSize ? this.pageSize : remainingItemsCount;

      this.productsPerPage = this.viewByOrderProducts.slice((this.currentPagebyOrder - 1) * this.pageSize, itemsToLoad + (this.currentPagebyOrder - 1) * this.pageSize);
    }
  }

  ngOnChanges() {
    if ((this.productsFilter.productName) === '') {
      this.productsByInventory = this.allInventoryProducts;
      this.viewByOrderProducts = this.allOrderProducts;
    } else {
      let filteredProducts: Product[] = this.allInventoryProducts.filter(event => {
        return (event.name).toUpperCase() == (this.productsFilter.productName).toUpperCase();
      });
      this.productsByInventory = filteredProducts;

      //view by order
      this.viewByOrderProducts = this.allOrderProducts.filter(event => {
        return (event.name).toUpperCase() == (this.productsFilter.productName).toUpperCase();
      });
    }
    if (this.byInventory && this.productsByInventory) {
      this.totalRecordCount = this.productsByInventory.length;
      this.currentPageInventory = 1;
      this.productsPerPage = this.productsByInventory.slice(0, this.pageSize);
    }
    if ((!this.byInventory) && this.viewByOrderProducts) {
      this.totalRecordCount = this.viewByOrderProducts.length;
      this.currentPagebyOrder = 1;
      this.productsPerPage = this.viewByOrderProducts.slice(0, this.pageSize);
    }
  }
  sortProducts(){
    if (this.sortingType == 'asc') {
      if(this.productsByInventory){
        this.productsByInventory.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase()) ? 1 : -1);
      }
      if(this.viewByOrderProducts){
        this.viewByOrderProducts.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase()) ? 1 : -1);
      }
    } else {
      if(this.productsByInventory){
        this.productsByInventory.sort((a, b) => (a.id.toLowerCase() < b.id.toLowerCase()) ? 1 : -1);
      }
      if(this.viewByOrderProducts){
        this.viewByOrderProducts.sort((a, b) => (a.id.toLowerCase() < b.id.toLowerCase()) ? 1 : -1);
      }
    }
    if(this.productsByInventory){
      this.totalRecordCount=this.productsByInventory.length;
      this.currentPageInventory=1;
    }
    if(this.viewByOrderProducts){
      this.totalRecordCount=this.viewByOrderProducts.length;
      this.currentPagebyOrder=1;
    }
    if(this.byInventory){
      this.productsPerPage = this.productsByInventory.slice(0, this.pageSize);
    }else {
      this.productsPerPage = this.viewByOrderProducts.slice(0, this.pageSize);
    }
  }
   
}
  
