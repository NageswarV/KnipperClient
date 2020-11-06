export class ProductFilterCriteria {
    productName: string;
  
    clone(): ProductFilterCriteria {
      const productFilterCriteria: ProductFilterCriteria = new ProductFilterCriteria();
      productFilterCriteria.productName = this.productName;
  
      return productFilterCriteria;
    }
  }
  