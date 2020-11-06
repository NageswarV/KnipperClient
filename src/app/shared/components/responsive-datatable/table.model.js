var TableColumn = /** @class */ (function () {
    function TableColumn() {
        this.visibility = 'xs';
        this.async = false;
        this.linkAnchorTarget = '';
        this.colonNotRequired = false;
    }
    return TableColumn;
}());
export { TableColumn };
export function OnStringCompare(a, b, sortDir) {
    var compare = 0;
    a = a ? a.toString().toUpperCase() : '';
    b = b ? b.toString().toUpperCase() : '';
    if (a > b) {
        compare = 1;
    }
    else if (a < b) {
        compare = -1;
    }
    return (sortDir === 'asc' ? compare : -compare);
}
export function OnDateCompare(a, b, sortDir) {
    var compare = 0;
    if (a > b) {
        compare = 1;
    }
    else if (a < b) {
        compare = -1;
    }
    return (sortDir === 'asc' ? compare : -compare);
}
export function OnDateObjectCompare(a, b, sortDir) {
    var compare = 0;
    if (a > b) {
        compare = 1;
    }
    else if (a < b) {
        compare = -1;
    }
    return (sortDir === 'asc' ? compare : -compare);
}
//# sourceMappingURL=table.model.js.map