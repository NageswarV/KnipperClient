var ProductFilterCriteria = /** @class */ (function () {
    function ProductFilterCriteria() {
    }
    ProductFilterCriteria.prototype.clone = function () {
        var productFilterCriteria = new ProductFilterCriteria();
        productFilterCriteria.productName = this.productName;
        return productFilterCriteria;
    };
    return ProductFilterCriteria;
}());
export { ProductFilterCriteria };
//# sourceMappingURL=product.model.js.map