import { __decorate, __metadata, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
var RecipeintDialogComponent = /** @class */ (function () {
    function RecipeintDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    RecipeintDialogComponent.prototype.ngOnInit = function () {
        console.log("in 2nd dialog", (this.data));
    };
    RecipeintDialogComponent = __decorate([
        Component({
            selector: 'app-recipeint-dialog',
            templateUrl: './recipeint-dialog.component.html',
            styleUrls: ['./recipeint-dialog.component.scss']
        }),
        __param(1, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [MatDialogRef, Array])
    ], RecipeintDialogComponent);
    return RecipeintDialogComponent;
}());
export { RecipeintDialogComponent };
//# sourceMappingURL=recipeint-dialog.component.js.map