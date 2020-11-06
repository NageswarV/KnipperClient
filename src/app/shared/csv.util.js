var CSVUtil = /** @class */ (function () {
    function CSVUtil() {
    }
    CSVUtil.downloadcsv = function (data, header, exportFileName) {
        var csvData = this.convertToCSV(data, header);
        var blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, this.createFileName(exportFileName));
        }
        else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", this.createFileName(exportFileName));
                //link.style = "visibility:hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };
    CSVUtil.setExportCSVItem = function (value) {
        var replace = /\,/gi;
        return value != null ? value.replace(replace, " ") : "";
    };
    CSVUtil.setExportCSVLine = function (values) {
        var _this = this;
        var line = '';
        values.forEach(function (x) {
            line += _this.setExportCSVItem(x) + ",";
        });
        return line.slice(0, -1);
    };
    CSVUtil.convertToCSV = function (dataList, headerList) {
        var str = '';
        var header = '';
        var row = '';
        for (var index in headerList) {
            header += headerList[index] + ',';
        }
        header = header.slice(0, -1);
        str += header + '\r\n';
        for (var index in dataList) {
            row += dataList[index] + '\r\n';
        }
        str += row;
        return str;
    };
    CSVUtil.createFileName = function (exportFileName) {
        var date = new Date();
        return (exportFileName +
            date.toLocaleDateString() + "_" +
            date.toLocaleTimeString()
            + '.csv');
    };
    return CSVUtil;
}());
export { CSVUtil };
//# sourceMappingURL=csv.util.js.map