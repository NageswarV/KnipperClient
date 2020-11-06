var TableExtendType = /** @class */ (function () {
    function TableExtendType() {
    }
    TableExtendType.Bracket = 0;
    TableExtendType.Count = 1;
    TableExtendType.NextLine = 2;
    TableExtendType.AddValue = 3;
    TableExtendType.LeadingZero = 4;
    TableExtendType.CommaSeparated = 5;
    return TableExtendType;
}());
export { TableExtendType };
var ValidationState = /** @class */ (function () {
    function ValidationState() {
    }
    ValidationState.Pristine = 'Pristine';
    ValidationState.Valid = 'Valid';
    ValidationState.Error = 'Error';
    ValidationState.Warning = 'Warning';
    return ValidationState;
}());
export { ValidationState };
var LostInTransitEvent = /** @class */ (function () {
    function LostInTransitEvent() {
    }
    LostInTransitEvent.AODReceived = 'AOD Received';
    LostInTransitEvent.NonDeliveredReturnReceived = 'Non-Delivered Return Received';
    LostInTransitEvent.ValidAOCReceived = 'Valid AOC Received';
    LostInTransitEvent.HCPReturnReceived = 'HCP Return Received';
    return LostInTransitEvent;
}());
export { LostInTransitEvent };
//# sourceMappingURL=enum-type.js.map