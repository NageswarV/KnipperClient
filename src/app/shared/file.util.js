import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
var FileUtil = /** @class */ (function () {
    function FileUtil() {
    }
    FileUtil.prototype.isCSVFile = function (file) {
        return file.name.endsWith(".csv");
    };
    FileUtil.prototype.getHeaderArray = function (csvRecordsArr) {
        var headers = csvRecordsArr[0].split(",");
        var headerArray = [];
        for (var j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };
    FileUtil.prototype.getHeaderArrayWithSplitter = function (csvRecordsArr, splitter) {
        var headers = csvRecordsArr[0].split(splitter);
        var headerArray = [];
        for (var j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };
    FileUtil.prototype.validateHeaders = function (origHeaders, fileHeaaders) {
        if (origHeaders.length != fileHeaaders.length) {
            return false;
        }
        var fileHeaderMatchFlag = true;
        for (var j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] != fileHeaaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    };
    FileUtil.prototype.getDataRecordsArrayFromCSVFile = function (csvRecordsArray, headerLength) {
        var dataArr = [];
        for (var i = 0; i < csvRecordsArray.length - 1; i++) {
            var data = csvRecordsArray[i].split(",");
            if (data.length != headerLength) {
                if (data == "") {
                    alert("Extra blank line is present at line number " + i + ", please remove it.");
                    return null;
                }
                else {
                    alert("Record at line number " + i + " contain " + data.length + " tokens, and is not matching with header length of :" + headerLength);
                    return null;
                }
            }
            var col = [];
            for (var j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }
        return dataArr;
    };
    FileUtil.prototype.commaReplacer = function (datastring) {
        var matches = datastring.match(/(\s*"[^"]+"\s*|\s*[^,]+|,)(?=,|$)/g);
        for (var n = 0; n < matches.length; ++n) {
            matches[n] = matches[n].trim();
            if (matches[n] == ',')
                matches[n] = '';
        }
        return matches;
    };
    FileUtil.prototype.getDataRecordsArrayFromCSVFileWithSplitter = function (csvRecordsArray, headerLength, splitter) {
        var dataArr = [];
        var dataSplitter = splitter;
        for (var i = 0; i < csvRecordsArray.length - 1; i++) {
            if (splitter == ',') {
                var dataString = this.commaReplacer(csvRecordsArray[i]);
                csvRecordsArray[i] = dataString.join('|');
                csvRecordsArray[i] = csvRecordsArray[i].replace(/["']/g, "");
                dataSplitter = '|';
            }
            var data = csvRecordsArray[i].split(dataSplitter);
            if (data.length != headerLength) {
                if (data == "") {
                    alert("Extra blank line is present at line number " + i + ", please remove it.");
                    return null;
                }
                else {
                    alert("Record at line number " + i + " contain " + data.length + " tokens, and is not matching with header length of :" + headerLength);
                    return null;
                }
            }
            var col = [];
            for (var j = 0; j < data.length; j++) {
                col.push(data[j]);
            }
            dataArr.push(col);
        }
        return dataArr;
    };
    FileUtil = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FileUtil);
    return FileUtil;
}());
export { FileUtil };
//# sourceMappingURL=file.util.js.map