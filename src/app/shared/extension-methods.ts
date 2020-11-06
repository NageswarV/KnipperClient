interface String {
    IsEqualTo(compareTo: string): boolean;
}

String.prototype.IsEqualTo = function(compareTo: string): boolean {
    if (this === compareTo.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}
