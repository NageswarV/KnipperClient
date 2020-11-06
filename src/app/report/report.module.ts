import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CustomDatePipe } from '../shared/pipes/custom-date.pipe';
import { ReportService } from './report.service';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { UploadedReportsComponent } from './uploaded-reports/uploaded-reports.component';
import { GenerateReportFilterComponent } from './generate-reports/generate-report-filter/generate-report-filter.component';
import { GenerateReportsListComponent } from './generate-reports/generate-reports-list/generate-reports-list.component';
import { UploadReportFilterComponent } from './uploaded-reports/upload-report-filter/upload-report-filter.component';
import { UploadedReportListComponent } from './uploaded-reports/uploaded-report-list/uploaded-report-list.component';
import { MyDatePickerModule } from 'mydatepicker';
import { UploadReportsComponent } from './uploaded-reports/upload-reports/upload-reports.component';
import { ReportDetailsComponent } from './generate-reports/report-details/report-details.component';




@NgModule({
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
    UploadReportsComponent,
    ReportDetailsComponent],
    exports: [
    ],
    entryComponents: [UploadReportsComponent]
})
export class ReportModule { }
