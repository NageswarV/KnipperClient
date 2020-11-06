var SalesFilterCriteria = /** @class */ (function () {
    function SalesFilterCriteria() {
    }
    SalesFilterCriteria.prototype.clone = function () {
        var salesFilterCriteria = new SalesFilterCriteria();
        salesFilterCriteria.firstName = this.firstName;
        salesFilterCriteria.lastName = this.lastName;
        return salesFilterCriteria;
    };
    return SalesFilterCriteria;
}());
export { SalesFilterCriteria };
//# sourceMappingURL=rep.model.js.map