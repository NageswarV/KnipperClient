var HcpOrderFilterCriteria = /** @class */ (function () {
    function HcpOrderFilterCriteria() {
    }
    HcpOrderFilterCriteria.prototype.clone = function () {
        var hcpOrderFilterCriteria = new HcpOrderFilterCriteria();
        hcpOrderFilterCriteria.firstName = this.firstName;
        hcpOrderFilterCriteria.lastName = this.lastName;
        hcpOrderFilterCriteria.stateCode = this.stateCode;
        return hcpOrderFilterCriteria;
    };
    return HcpOrderFilterCriteria;
}());
export { HcpOrderFilterCriteria };
//# sourceMappingURL=hcp-order.model.js.map