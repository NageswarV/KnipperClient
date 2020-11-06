import { __decorate, __metadata, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecipeintDialogComponent } from '../recipeint-dialog/recipeint-dialog.component';
var HcpDialogComponent = /** @class */ (function () {
    function HcpDialogComponent(dialogRef, dialog, data) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.data = data;
        this.pageSize = 10;
        this.currentPage = 1;
        this.fromReport = true;
        this.columnsOut = [
            { title: 'Attachment Type', classes: 'col-xs-4' },
            { title: 'OutBound DocumentName', classes: 'col-xs-4' },
            { title: 'Action', classes: 'col-xs-4' }
        ];
        this.columnsIn = [
            { title: 'InBound DocumentName', classes: 'col-xs-4' },
            { title: 'Action', classes: 'col-xs-4' }
        ];
    }
    HcpDialogComponent.prototype.ngOnInit = function () {
        this.obj = (this.data);
        this.collection = this.obj.show;
        this.collectionOut = this.collection.filter(function (collection) { return collection.direction == "Out"; });
        this.collectionIn = this.collection.filter(function (collection) { return collection.direction == "In"; });
        this.totalRecordCountOut = this.collectionOut.length;
        this.totalRecordCountIn = this.collectionIn.length;
        this.reportsPerPageIn = this.collectionIn.slice(0, this.pageSize);
        this.reportsPerPageOut = this.collectionOut.slice(0, this.pageSize);
        this.totalPagesIn = Math.ceil(this.totalRecordCountIn / this.pageSize);
        this.totalPagesOut = Math.ceil(this.totalRecordCountOut / this.pageSize);
    };
    HcpDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    // send(){
    // }
    HcpDialogComponent.prototype.openDialog = function (comm) {
        var dialogRef = this.dialog.open(RecipeintDialogComponent, {
            panelClass: 'custom-dialog',
            data: { data: comm }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    HcpDialogComponent = __decorate([
        Component({
            selector: 'app-hcp-dialog',
            templateUrl: './hcp-dialog.component.html',
            styleUrls: ['./hcp-dialog.component.scss']
        }),
        __param(2, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, MatDialog, Array])
    ], HcpDialogComponent);
    return HcpDialogComponent;
}());
export { HcpDialogComponent };
//# sourceMappingURL=hcp-dialog.component.js.map