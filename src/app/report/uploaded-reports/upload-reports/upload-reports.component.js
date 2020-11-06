import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
var UploadReportsComponent = /** @class */ (function () {
    function UploadReportsComponent(dialogRef, dialog) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.collection = [];
        this.fileToUpload = null;
        this.currentPage = 1;
        this.fromReport = true;
        this.pageSize = 3;
        this.reportsToDisplay = new Array();
        this.reportsCount = 0;
        this.columnsOut = [
            { title: 'Upload Report', classes: 'col-xs-4' },
            { title: 'Select Report Type', classes: 'col-xs-4' },
            { title: 'Report Name', classes: 'col-xs-4' }
        ];
    }
    UploadReportsComponent.prototype.clearUploads = function () {
        // this.reportsPerPage.length=0;
        this.collection.length = 0;
        this.reportsToDisplay.length = 0;
    };
    UploadReportsComponent.prototype.ngOnInit = function () {
    };
    UploadReportsComponent.prototype.paginate = function (pageNo) {
        this.currentPage = pageNo;
    };
    UploadReportsComponent.prototype.disableDilog = function () {
        this.clearUploads();
        this.dialogRef.close();
    };
    // addReportsToArray(files:FileList) {
    //      this.collection.push(files.item(0));
    //    this.reportsPerPage=this.collection.slice(0,this.collection.length > this.pageSize ? this.pageSize:this.collection.length);
    //    this.reportsToDisplay[this.reportsCount++].file=files.item(0);
    //   }
    UploadReportsComponent.prototype.addReportsToPage = function () {
        console.log(this.reportsToDisplay);
        this.reportsToDisplay[this.reportsToDisplay.length] = new ReportStructure();
        this.reportsToDisplay[this.reportsToDisplay.length - 1].index = 1;
        this.reportsToDisplay[this.reportsToDisplay.length - 1].file = "Example File.pdf";
    };
    UploadReportsComponent = __decorate([
        Component({
            selector: 'app-upload-reports',
            templateUrl: './upload-reports.component.html',
            styleUrls: ['./upload-reports.component.scss']
        }),
        __metadata("design:paramtypes", [MatDialogRef, MatDialog])
    ], UploadReportsComponent);
    return UploadReportsComponent;
}());
export { UploadReportsComponent };
var ReportStructure = /** @class */ (function () {
    function ReportStructure() {
    }
    return ReportStructure;
}());
export { ReportStructure };
//# sourceMappingURL=upload-reports.component.js.map