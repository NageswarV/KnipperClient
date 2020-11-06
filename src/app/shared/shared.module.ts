import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizationModule, TranslationModule } from 'angular-l10n';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SamplicityDateAdapter } from './forms/datepicker/date-adapter';
import { TextMaskModule } from 'angular2-text-mask';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgBusyModule } from 'ng-busy';
import { ValidationModule } from '../validation/validation.module';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { SamplicityChartComponent } from '../dashboard/components/chart/samplicity-chart.component';
import { ChartsModule, BaseChartDirective } from 'ng2-charts';
import { DtpOrderDetailsComponent} from '../shared/components/dtp-order-details/dtp-order-details.component'




import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatTabsModule,
  MatCardModule,
  MatTooltipModule,
  MatToolbarModule,
  MatPaginatorModule
} from '@angular/material';

import * as Shared from './';
import * as Pipes from './pipes/';
import * as Directives from './directives/';
import { NotifyService } from './notify.service';
import { UtilityService } from './utility.service';
import { FileUtil } from './file.util';
import { CSVUtil } from './csv.util';
import { NotificationService } from '../core/notification.service';
import { System, ServiceBaseConfig } from './service-clients/system';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2PaginationModule } from 'ng2-pagination/dist/ng2-pagination';
import { StarRatingComponent } from './star-rating.component';
import { LikeComponent } from './like.component';
import { CommentComponent } from './comment.component';
import { PaginationComponent } from './pagination.component';
import { GridComponent } from './grid.component';
import { SorterComponent } from './sorter.component';
import { CustomDatePipe } from './custom-date.pipe';
import { CustomTimePipe } from './custom-time.pipe';
import { CustomNumberPipe } from './custom-number.pipe';
import { CustomStringPipe } from './custom-string.pipe';
import { MatchHeightDirective } from './match-height.directive';
import { InputOnlyNumbersDirective } from './input-only-numbers.directive';
import { PhoneNumbersDirective } from './phone-numbers.directive';
import { SafeHtmlPipe } from './SafeHtmlPipe';
import { SgTreeViewComponent } from './sg-tree-view.component';
import { CheckPermissionsDirective } from '../authentication';
import { StockAvailabilityDirective } from './stock-availability.directive';
import { OrderStatusDirective } from './order-status.directive';
import { PhoneMaskDirective } from './phone-mask';
import { LivechatComponent } from './livechat.component';
import { DtrOrderDetailsComponent } from './components/dtr-order-details/dtr-order-details.component';
import { dashboardService } from '../dashboard/dashboard/dashboard-service';
import { CreateNewTaskComponent } from './components/create-new-task/create-new-task.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HandcarryDistbursementOrderDetailsComponent } from './components/handcarry-distbursement-order-details/handcarry-distbursement-order-details.component';
import { HandcarryTransactionOrderDetailsComponent } from './components/handcarry-transaction-order-details/handcarry-transaction-order-details.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslationModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatToolbarModule,
    TextMaskModule,
    NgBusyModule,
    ValidationModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    LocalizationModule,
    FormsModule,
    RouterModule,
    CustomFormsModule,
    NgbModule,
    Ng2PaginationModule,
    ValidationModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    ChartsModule,
    MyDatePickerModule
  ],
  declarations: [
    Shared.NavbarComponent,
    Shared.UserNotificationsComponent,
    Shared.UserDropdownComponent,
    Shared.FooterComponent,
    Shared.StepperComponent,
    Shared.SpinnerOverlayComponent,
    Shared.DisplayTranslationComponent,
    Shared.ClientSelectComponent,
    Shared.MultiSelectComponent,
    Shared.MultiSelectWrapperComponent,
    Shared.SideFilterComponent,
    Shared.SideFilterSectionComponent,
    Shared.ResponsiveDatatableComponent,
    Shared.ResponsiveDataTableHeaderComponent,
    Shared.ResponsiveDataTablePaginationComponent,
    Shared.ResponsiveDataTableInputComponent,
    Shared.ResponsiveDataTableIconTextComponent,
    Shared.ExpandableTableRowComponent,
    Shared.NotificationComponent,
    Shared.BlackoutHoldModalComponent,
    Shared.TextInputComponent,
    Shared.TextInlineInputComponent,
    Shared.GeneralActivitiesComponent,
    Shared.ActivityTransactionComponent,
    Pipes.TablePipeHandler,
    Pipes.PhoneNumberPipe,
    Pipes.MomentDatePipe,
    Pipes.MomentDateTimePipe,
    Pipes.MomentTimePipe,
    Pipes.ZipCodePipe,
    Pipes.ClassificationPipe,
    Pipes.ReferenceDataPipe,
    Pipes.ReferenceDataByCodePipe,
    Pipes.AddressPipe,
    Pipes.TableExtendPipe,
    Pipes.TableExpandedPipe,
    Pipes.TablePhoneNumberPipe,
    Pipes.TableStringArrayPipe,
    Pipes.YesNoPipe,
    Pipes.IncludeExcludePipe,
    Pipes.UserNamePipe,
    Pipes.CustomDateTimePipe,
    Pipes.CustomDateRangePipe,
    Shared.FieldDescriptionComponent,
    Shared.FieldErrorsComponent,
    Shared.FieldWarningsComponent,
    Shared.FieldLabelComponent,
    Shared.SearchInputComponent,
    Shared.DatepickerComponent,
    Shared.TimepickerComponent,
    Shared.TimepickerControlComponent,
    Shared.TextareaComponent,
    Shared.TextSelectGroupComponent,
    Shared.SelectComponent,
    Shared.FieldBaseComponent,
    Shared.FormPrimaryWellComponent,
    Shared.FormSectionComponent,
    Shared.FormComponent,
    Shared.TypeaheadComponent,
    Shared.TextStaticComponent,
    Shared.ListPageComponent,
    Shared.FileInputComponent,
    Shared.FileInputWrapperComponent,
    Shared.FormGridComponent,
    Shared.FormGridColumnComponent,
    Shared.DetailPageComponent,
    Shared.MultiSelectSearchComponent,
    Shared.RadioComponent,
    Shared.ToggleComponent,
    Shared.CheckboxComponent,
    Shared.CheckboxListComponent,
    Shared.MultiSelectListComponent,
    Shared.MultiSelectDropdownComponent,
    Shared.DialogListComponent,
    Shared.SideMenuComponent,
    Shared.SideMenuSectionComponent,
    Shared.SideMenuHeaderComponent,
    Shared.FileAttachmentComponent,
    Shared.FileAttachmentDescriptionComponent,
    Directives.DisableIfUnauthorizedDirective,
    Directives.HideIfUnauthorizedDirective,
    SamplicityChartComponent,

    StarRatingComponent,
    LikeComponent,
    CommentComponent,
    PaginationComponent,
    GridComponent,
    SorterComponent,
    CustomDatePipe,
    CustomTimePipe,
    CustomNumberPipe,
    CustomStringPipe,
    MatchHeightDirective,
    InputOnlyNumbersDirective,
    PhoneNumbersDirective,
    SafeHtmlPipe,
    SgTreeViewComponent,
    CheckPermissionsDirective,
    StockAvailabilityDirective,
    OrderStatusDirective,
    PhoneMaskDirective,
    LivechatComponent,
    DtrOrderDetailsComponent,
    DtpOrderDetailsComponent,
    CreateNewTaskComponent,
    HandcarryDistbursementOrderDetailsComponent,
    HandcarryTransactionOrderDetailsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ValidationModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTooltipModule,
    MatToolbarModule,
    NgBusyModule,
    Shared.NavbarComponent,
    Shared.UserNotificationsComponent,
    Shared.UserDropdownComponent,
    Shared.DisplayTranslationComponent,
    Shared.FooterComponent,
    Shared.StepperComponent,
    Shared.SpinnerOverlayComponent,
    Shared.ClientSelectComponent,
    Shared.MultiSelectComponent,
    Shared.MultiSelectWrapperComponent,
    Shared.SideFilterComponent,
    Shared.SideFilterSectionComponent,
    Shared.NotificationComponent,
    Shared.BlackoutHoldModalComponent,
    Shared.TextInputComponent,
    Shared.TextInlineInputComponent,
    Shared.ResponsiveDatatableComponent,
    Shared.ResponsiveDataTableHeaderComponent,
    Shared.ResponsiveDataTablePaginationComponent,
    Shared.ResponsiveDataTableInputComponent,
    Shared.ResponsiveDataTableIconTextComponent,
    Shared.ExpandableTableRowComponent,
    Shared.FieldErrorsComponent,
    Shared.FieldWarningsComponent,
    Pipes.CustomDateTimePipe,
    Pipes.CustomDateRangePipe,
    Pipes.TablePipeHandler,
    Pipes.PhoneNumberPipe,
    Pipes.MomentDatePipe,
    Pipes.MomentTimePipe,
    Pipes.MomentDateTimePipe,
    Pipes.ZipCodePipe,
    Pipes.ClassificationPipe,
    Pipes.ReferenceDataPipe,
    Pipes.ReferenceDataByCodePipe,
    Pipes.AddressPipe,
    Pipes.TableExtendPipe,
    Pipes.TableExpandedPipe,
    Pipes.TablePhoneNumberPipe,
    Pipes.TableStringArrayPipe,
    Pipes.YesNoPipe,
    Pipes.IncludeExcludePipe,
    Pipes.UserNamePipe,
    Shared.FieldDescriptionComponent,
    Shared.SearchInputComponent,
    Shared.DatepickerComponent,
    Shared.TimepickerComponent,
    Shared.TimepickerControlComponent,
    Shared.TextareaComponent,
    Shared.TextSelectGroupComponent,
    Shared.SelectComponent,
    Shared.TypeaheadComponent,
    Shared.FormPrimaryWellComponent,
    Shared.FormSectionComponent,
    Shared.FormComponent,
    Shared.TextStaticComponent,
    Shared.ListPageComponent,
    Shared.FileInputComponent,
    Shared.FileInputWrapperComponent,
    TextMaskModule,
    Shared.FormGridComponent,
    Shared.FormGridColumnComponent,
    Shared.DetailPageComponent,
    Shared.MultiSelectSearchComponent,
    Shared.CheckboxComponent,
    Shared.CheckboxListComponent,
    Shared.RadioComponent,
    Shared.ToggleComponent,
    Shared.MultiSelectListComponent,
    Shared.MultiSelectDropdownComponent,
    Shared.SideMenuComponent,
    Shared.SideMenuSectionComponent,
    Shared.SideMenuHeaderComponent,
    Shared.FileAttachmentComponent,
    Shared.FileAttachmentDescriptionComponent,
    Shared.DialogListComponent,
    Shared.GeneralActivitiesComponent,
    Shared.ActivityTransactionComponent,
    Directives.DisableIfUnauthorizedDirective,
    Directives.HideIfUnauthorizedDirective,
    SamplicityChartComponent,

    CommonModule,
    RouterModule,
    FormsModule,
    LocalizationModule,
    NgbModule,
    ValidationModule,
    Ng2PaginationModule,
    CustomFormsModule,
    StarRatingComponent,
    LikeComponent,
    CommentComponent,
    PaginationComponent,
    GridComponent,
    SorterComponent,
    CustomDatePipe,
    CustomTimePipe,
    CustomNumberPipe,
    CustomStringPipe,
    CheckPermissionsDirective,
    MatchHeightDirective,
    NgBusyModule,
    InputOnlyNumbersDirective,
    PhoneNumbersDirective,
    SafeHtmlPipe,
    SgTreeViewComponent,
    StockAvailabilityDirective,
    OrderStatusDirective,
    PhoneMaskDirective,
    LivechatComponent,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    DtpOrderDetailsComponent
  ],
  providers: [
      { provide: DateAdapter, useClass: SamplicityDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: SamplicityDateAdapter.SAMPLICITY_DATE_FORMATS },
    BaseChartDirective,dashboardService
  ],
  entryComponents: [
    Shared.DatepickerComponent,
    Shared.TextInputComponent,
    Shared.CheckboxComponent,
    Shared.RadioComponent,
    Shared.SelectComponent,
    Shared.TextareaComponent,
    Shared.TextStaticComponent,
    Shared.ToggleComponent,
    CreateNewTaskComponent
  ]
})
export class SharedModule {

  constructor() {
  }
}
