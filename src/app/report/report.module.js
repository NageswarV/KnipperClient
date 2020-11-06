import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ReportService } from './report.service';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { UploadedReportsComponent } from './uploaded-reports/uploaded-reports.component';
import { GenerateReportFilterComponent } from './generate-reports/generate-report-filter/generate-report-filter.component';
import { GenerateReportsListComponent } from './generate-reports/generate-reports-list/generate-reports-list.component';
import { UploadReportFilterComponent } from './uploaded-reports/upload-report-filter/upload-report-filter.component';
import { UploadedReportListComponent } from './uploaded-reports/uploaded-report-list/uploaded-report-list.component';
import { MyDatePickerModule } from 'mydatepicker';
import { UploadReportsComponent } from './uploaded-reports/upload-reports/upload-reports.component';
var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        NgModule({
            imports: [
                SharedModule,
                MyDatePickerModule
            ],
            providers: [
                ReportService
            ],
            declarations: [
                GenerateReportsComponent,
                UploadedReportsComponent,
                GenerateReportFilterComponent,
                GenerateReportsListComponent,
                UploadReportFilterComponent,
                UploadedReportListComponent,
                UploadReportsComponent
            ],
            exports: [],
            entryComponents: [UploadReportsComponent]
        })
    ], ReportModule);
    return ReportModule;
}());
export { ReportModule };
//# sourceMappingURL=report.module.js.map