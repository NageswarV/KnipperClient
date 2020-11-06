import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Language, TranslationService } from 'angular-l10n';
import { SamplicityChartComponent } from '../components/chart/samplicity-chart.component';
import { MonthlyOrdersByStatusChartConfig } from '../charts/MonthlyOrdersByStatusChartConfig';
import { TotalOrdersPastStatusTimeThresholdsChartConfig } from '../charts/TotalOrdersPastStatusTimeThresholdsChartConfig';
import { OrdersMissingSLAsChartConfig } from '../charts/OrdersMissingSLAsChartConfig';
import { WeeklyOrderVolumeChartConfig } from '../charts/WeeklyOrderVolumeChartConfig';
import { OutgoingSVLsChartConfig } from '../charts/OutgoingSVLsChartConfig';
import { IncomingAOCsChartConfig } from '../charts/IncomingAOCsChartConfig';
import { IncomingSVLsChartConfig } from '../charts/IncomingSVLsChartConfig';
import { OrdersRejectionReasonsChartConfig } from '../charts/OrderRejectionReasonsChartConfig';
import { OrdersReceivedChartConfig } from '../charts/OrdersReceivedChartConfig';
import { OrdersRejectedChartConfig } from '../charts/OrdersRejectedChartConfig';
import { OrdersShippedChartConfig } from '../charts/OrdersShippedChartConfig';
import { OutgoingAOCsChartConfig } from '../charts/OutGoingAOCsChartConfig';
import { OutGoingExceptionChartConfig } from '../charts/OutGoingExceptionChartConfig';
import { OutGoingRejectionChartConfig } from '../charts/OutGoingRejectionsChartConfig';
import { OutGoingSRFsChartConfig } from '../charts/OutGoingSRFsChartConfig';
import { UserAccessDto } from '../../shared/service-clients/security';
import * as moment from 'moment-timezone';
import { SimpleProgramDto } from '../../shared/service-clients/om-program';
import { Item } from '../../core/classification.service';
import { NotificationComponent } from '../../shared';

import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrderListModalComponent } from './order-list-modal/order-list-modal.component';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { IncomingAocSvlsChartConfig } from '../charts/incomingAocSvlsChart';
import { IncomingOrderRequestChartConfig } from '../charts/incomingOrderRequestSvlsChart';
import { WeeklyAODTrackingConfig } from '../charts/WeeklyAODTracking';
import { TimeFrameOptions } from '../../shared/activity-model';
import { ReportableIncidentsChartConfig } from '../charts/ReportIncidentChartConfig';
import { RepSamplingActivitiesChartConfig } from '../charts/RepSamplingActivitiesChartConfig';
import { ReconciledChartConfig } from '../charts/ReconciledChartConfig';
import { AuditInventoryManagementChartConfig } from '../charts/AuditInventoryManagementChartConfig';
import { dashboardService } from './dashboard-service';


@Component({
  selector: 'samplicity-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})

export class DashboardDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('monthlyOrdersByStatusChart', { static: true }) MonthlyOrdersByStatusChart: SamplicityChartComponent;
  @ViewChild('totalOrdersPastStatusTimeThresholdsChart', { static: true }) TotalOrdersPastStatusTimeThresholdsChart: SamplicityChartComponent;
  @ViewChild('ordersMissingSLAs', { static: true }) OrdersMissingSLAsChart: SamplicityChartComponent;
  @ViewChild('weeklyOrderVolumeChart', { static: true }) WeeklyOrderVolumeChart: SamplicityChartComponent;
  @ViewChild('weeklyAODTrackingChart', { static: true }) WeeklyAODTrackingChart: SamplicityChartComponent;
  @ViewChild('outgoingSVLsChart', { static: true }) OutgoingSVLsChart: SamplicityChartComponent;
  @ViewChild('incomingAOCsChart', { static: true }) incomingAOCsChart: SamplicityChartComponent;
  @ViewChild('incomingSVLsChart', { static: true }) incomingSVLsChart: SamplicityChartComponent;
  @ViewChild('ordersRejectionReasonsChart', { static: true }) ordersRejectionReasonsChart: SamplicityChartComponent;
  @ViewChild('ordersReceivedChart', { static: true }) ordersReceivedChart: SamplicityChartComponent;
  @ViewChild('ordersRejectedChart', { static: true }) ordersRejectedChart: SamplicityChartComponent;
  @ViewChild('ordersShippedChart', { static: true }) ordersShippedChart: SamplicityChartComponent;
  @ViewChild('outgoingAOCsChart', { static: true }) outgoingAOCsChart: SamplicityChartComponent;
  @ViewChild('outgoingExceptionChart', { static: true }) outgoingExceptionChart: SamplicityChartComponent;
  @ViewChild('outgoingRejectionChart', { static: true }) outgoingRejectionChart: SamplicityChartComponent;
  @ViewChild('outgoingSRFsChart', { static: true }) outgoingSRFsChart: SamplicityChartComponent;
  @ViewChild('incomingOrderRequestSvlChart', { static: true }) incomingOrderRequestSvlChart: SamplicityChartComponent;
  @ViewChild('incomingAocSvlChart', { static: true }) incomingAocSvlChart: SamplicityChartComponent;
  @ViewChild('reportIncidentChart', { static: true }) ReportIncidentChart: SamplicityChartComponent;
  @ViewChild('repSamplingChart', { static: true }) RepSamplingChart: SamplicityChartComponent;
  @ViewChild('reconciledChart', { static: true }) ReconciledChart: SamplicityChartComponent;
  @ViewChild('auditInventoryManagementChart', { static: true }) AuditInventoryManagementChart: SamplicityChartComponent;
  @ViewChild('notification', { static: true }) notification: NotificationComponent;
  @ViewChild('ordersPastStatusTimeThresholdDialog', { static: true }) private ordersPastStatusTimeThresholdDialog;
  @Language() lang;

  monthlyOrdersByStatusChartOptions = MonthlyOrdersByStatusChartConfig.config;
  totalOrdersPastStatusTimeThresholdsChartOptions = TotalOrdersPastStatusTimeThresholdsChartConfig.config;
  ordersMissingSLAsChartOptions = OrdersMissingSLAsChartConfig.config;
  weeklyOrderVolumeChartOptions = WeeklyOrderVolumeChartConfig.config;
  
  outgoingSVLsChartOptions = OutgoingSVLsChartConfig.config;
  incomingAOCsChartOptions = IncomingAOCsChartConfig.config;
  incomingSVLsChartOptions = IncomingSVLsChartConfig.config;
  ordersRejectionReasonsChartOptions = OrdersRejectionReasonsChartConfig.config;
  ordersReceivedChartOptions = OrdersReceivedChartConfig.config;
  ordersRejectedChartOptions = OrdersRejectedChartConfig.config;
  ordersShippedChartOptions = OrdersShippedChartConfig.config;
  outgoingAOCsChartOptions = OutgoingAOCsChartConfig.config;
  outGoingExceptionChartOptions = OutGoingExceptionChartConfig.config;
  outGoingRejectionChartOptions = OutGoingRejectionChartConfig.config;
  outGoingSRFsChartOptions = OutGoingSRFsChartConfig.config;
  incomingOrderRequestSvlChartOptions = IncomingOrderRequestChartConfig.config;
  incomingAocSvlChartOptions = IncomingAocSvlsChartConfig.config;
  weeklyAODTrackingChartOptions = WeeklyAODTrackingConfig.config;
  reportIncidentChartOptions = ReportableIncidentsChartConfig.config;
  repSamplingChartOptions = RepSamplingActivitiesChartConfig.config;
  reconciledChartOptions = ReconciledChartConfig.config;
  auditInventoryManagementChartOptions = AuditInventoryManagementChartConfig.config;
  isLoading = false;
  filterForm: FormGroup;
  user: UserAccessDto;
  lastUpdated = moment(Date.now()).toDate();
  programs: Item[] = [];
  programSelected = false;
  hasNoPrograms = false;
  loadedOnce = false;
  monthlySvlCount = 0;
  tenantCreationTime = moment(new Date()).toDate();
  defaultProgramId: any;
  currentTab = 0;
  mainTab = 0;
  navigationUrl = '/reps'

  now = moment(new Date()).toDate();
  currentMonth = this.now.getMonth() + 1;
  currentYear = this.now.getFullYear();

  monthlyOrders_selectedDate: Date = this.now;

  biWeeklyOrders_startDate: Date = this.getPastOrFutureDate(this.now, -13);
  biWeeklyOrders_endDate: Date = this.now;

  weeklyOrderVolume_starteDate: Date;
  weeklyOrderVolume_enddDate: Date;

  weeklyComm_startDate: Date = this.getPastOrFutureDate(this.now, -6);
  weeklyComm_endDate: Date = this.now;

  dialogRef: MatDialogRef<any>;

  programList: SimpleProgramDto[];
  timeFrameSelected: string = "QUARTERLY";
  primarystatus: boolean = true;
  defaultstatus: boolean = true;
  signatureaudprimary: boolean = true;
  signatureauddefault: boolean = true;
  repprimary: boolean = true;
  repdefault: boolean = true;
  auditprimary: boolean = true;
  auditdefault: boolean = true;

  changeTimeFrame(value: string) {
    this.timeFrameSelected = value;
    this.primarystatus = !this.primarystatus;
    this.defaultstatus = !this.defaultstatus;
  }

  changeTimeFrameSignature(value: string) {
    this.timeFrameSelected = value;
    this.signatureaudprimary = !this.signatureaudprimary;
    this.signatureauddefault = !this.signatureauddefault;
  }

  changeTimeFrameRep(value: string) {
    this.timeFrameSelected = value;
    this.repprimary = !this.repprimary;
    this.repdefault = !this.repdefault;

  }
  changeTimeFrameAudit(value: string) {
    this.timeFrameSelected = value;
    this.auditprimary = !this.auditprimary;
    this.auditdefault = !this.auditdefault;
  }

  get minActivationDate(): Date {
    if (this.programList) {
      const programId = this.filterForm.get('programName').value;
      if (programId && programId.length > 0) {
        return this.programList.find(x => x.id === programId).actualStartDate;
      } else {
        return this.tenantCreationTime;
      }
    } else { return this.now; }
  }

  get programId(): string {
    return this.filterForm.get('programName').value;
  }
  get biWeeklydisplayValue(): string {
    return this.datePipe.transform(this.biWeeklyOrders_startDate, 'MMM') + ' ' + this.datePipe.transform(this.biWeeklyOrders_startDate, 'dd') + ',' + this.biWeeklyOrders_startDate.getFullYear() +
      ' - ' + this.datePipe.transform(this.biWeeklyOrders_endDate, 'MMM') + ' ' + this.datePipe.transform(this.biWeeklyOrders_endDate, 'dd') + ',' + this.biWeeklyOrders_endDate.getFullYear();
  }

  get weeklydisplayValue(): string {
    let x = this.datePipe.transform(this.weeklyComm_startDate, 'MMM') + ' ' + this.datePipe.transform(this.weeklyComm_startDate, 'dd') + ',' + this.weeklyComm_startDate.getFullYear() +
      ' - ' + this.datePipe.transform(this.weeklyComm_endDate, 'MMM') + ' ' + this.datePipe.transform(this.weeklyComm_endDate, 'dd') + ',' + this.weeklyComm_endDate.getFullYear();
    return x;
  }

  get getDTPTimeFrameOptions(): TimeFrameOptions {
    return { weekly: true, quarterly: true, monthly: true } as TimeFrameOptions;
  }

  constructor(
    private dbService : dashboardService,
    private fb: FormBuilder,
    public router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.createFilter();
    this.weeklyOrderVolume_enddDate = this.getWeekEndDateByDate(this.now);
    this.weeklyOrderVolume_starteDate = this.getWeekStartDateByDate(this.getPastOrFutureDate(this.weeklyOrderVolume_enddDate, -28));
    this.weeklyComm_endDate = this.getWeekEndDateByDate(this.now);
    this.weeklyComm_startDate = this.getWeekStartDateByDate(this.getPastOrFutureDate(this.weeklyComm_endDate, -28));
  }

  ngAfterViewInit() {
    this.dbService.GetWeeklyOrderVolumeTrends().subscribe(response =>
      this.WeeklyOrderVolumeChart.setData(response.data));

    this.RepSamplingChart.setHandCarryData(RepSamplingActivitiesChartConfig.sampleData);
    this.ReportIncidentChart.setHandCarryData(ReportableIncidentsChartConfig.sampleData);
    this.ReconciledChart.setHandCarryData(ReconciledChartConfig.sampleData);
    this.AuditInventoryManagementChart.setHandCarryData(AuditInventoryManagementChartConfig.sampleData)
    this.ordersRejectedChart.setData(OrdersRejectedChartConfig.sampleData);
    this.ordersRejectionReasonsChart.setData(OrdersRejectionReasonsChartConfig.sampleData);
   
  }

  mainTabChanged(event: any) {
    this.mainTab = event.index;
    if (this.mainTab == 1) {
      this.dbService.GetHandCarryMetrics().subscribe(response => {
        this.RepSamplingChart.setHandCarryData(response[0].data);
        this.ReportIncidentChart.setHandCarryData(response[1].data);
        this.ReconciledChart.setHandCarryData(response[2].data);
        this.AuditInventoryManagementChart.setHandCarryData(response[3].data)
      });
    }
    else {
      this.dbService.GetWeeklyOrderVolumeTrends().subscribe(response =>
        this.WeeklyOrderVolumeChart.setData(response.data));
    }
  }

  tabChanged(event: any) {
    this.currentTab = event.index;
    switch (this.currentTab) {
      case 0:
        this.dbService.GetWeeklyOrderVolumeTrends().subscribe(response =>
          this.WeeklyOrderVolumeChart.setData(response.data));
        break;
      case 1:
        this.dbService.Get14DayOrderEventsTrends().subscribe(response => {
          this.ordersReceivedChart.setData(response[0].data);
          this.ordersShippedChart.setData(response[1].data);
          this.ordersRejectionReasonsChart.setData(response[2].data);
          this.ordersRejectedChart.setData(response[3].data);
        });
        break;
      case 2:
        this.dbService.GetWeeklyCommunicationVolumeTrends().subscribe(response => {
          if (response) {
            this.outgoingSRFsChart.setData(response[0].data);
            this.outgoingExceptionChart.setData(response[1].data);
            this.outgoingRejectionChart.setData(response[2].data);
            this.incomingAOCsChart.setData(response[3].data);
            this.outgoingAOCsChart.setData(response[4].data);
          }
        });
        break;
      case 3:
        this.dbService.GetMonthlySVLVolumeTrends().subscribe(response => {
          if (response) {
            this.incomingSVLsChart.setData(response[0].data);
              this.OutgoingSVLsChart.setData(response[1].data);
              this.incomingOrderRequestSvlChart.setData(response[2].data);
              this.incomingAocSvlChart.setData(response[3].data);
            }
        });
        break;
      case 4:
        this.dbService.GetWeeklyAODTracking().subscribe(response =>
          this.WeeklyAODTrackingChart.setData(response.data)
        )
        break;
      default:
        break;
    }
  }

  getNextSet() {
    this.getPastOrFutureDate(this.tenantCreationTime, 30);
  }

  getPrevSet() {
    this.getPastOrFutureDate(this.tenantCreationTime,-30);
  }
  

  createFilter(): void {
    this.filterForm = this.fb.group({
      programName: ['', []]
    });
  }

  onRefreshCharts(): void {
    this.isLoading = true;

    if (this.programId && this.programId.length > 0) {
      this.programSelected = true;
    } else {
      this.programSelected = false;
    }

    if (this.minActivationDate != null
      && this.monthlyOrders_selectedDate < this.minActivationDate) {
      this.monthlyOrders_selectedDate = this.minActivationDate;
    }

    this.loadMonthlyOrdersByStatusChartData(this.monthlyOrders_selectedDate, this.programId);
    this.getOrderSLA(this.programId);
    if (this.programSelected) {
      var chartData = forkJoin(
        of(this.loadTotalOrdersPastStatusTimeThresholdsChartData(this.programId)),
        of(this.getBIWeeklyOrdersDataByStatus(this.programId)),
        of(this.getWeeklyOrderVolumeTrends(this.programId)),
        of(this.getWeeklyCommunicationsVolumeTrends(this.programId)),
        of(this.getWeeklyCommunicationsVolumeTrendsForExceptionLetters(this.programId))
      );
      chartData.subscribe(x => x);

    }
  }
  getWeeklyCommunicationsVolumeTrendsForExceptionLetters(programId: string): any {
    //this.isLoading = true;
    //this.orderManagementClient
    //  .getWeeklyCommunicationVolumeTrendsDataForExceptionLetters(new GetOrdersByStatusByMonthDataRequestDto(
    //    {
    //      programId: programId,
    //      month: 0,
    //      year: 0,
    //      periodicStartDate: this.weeklyComm_startDate,
    //      periodicEndDate: this.weeklyComm_endDate,
    //      tenantId: this.clientService.getClientId()
    //    }))
    //  .subscribe((response) => {
    //    console.log(response.result);
    //    if (response.result) {
          this.outgoingExceptionChart.setData(OutGoingExceptionChartConfig.sampleData);
      //  }
      //  this.isLoading = false;
      //});
  }

  getWeeklyCommunicationsVolumeTrends(programId: string): any {
    //this.isLoading = true;
    //this.orderManagementClient
    //  .getWeeklyCommunicationVolumeTrendsData(new GetOrdersByStatusByMonthDataRequestDto(
    //    {
    //      programId: programId,
    //      month: 0,
    //      year: 0,
    //      periodicStartDate: this.weeklyComm_startDate,
    //      periodicEndDate: this.weeklyComm_endDate,
    //      tenantId: this.clientService.getClientId()
    //    }))
    //  .subscribe((response) => {
    //    console.log(response.result);
    //    if (response.result) {
          this.outgoingSRFsChart.setData(OutGoingSRFsChartConfig.sampleData);
      //  }
      //  this.isLoading = false;
      //});
  }

  loadMonthlyOrdersByStatusChartData(selectedDate: Date, programId: string = null, arrowClicked = false) {

    //this.orderManagementClient
    //  .getOrdersByStatusByMonthData(new GetOrdersByStatusByMonthDataRequestDto({
    //    programId: programId,
    //    month: selectedDate.getMonth(),
    //    year: selectedDate.getFullYear(),
    //    periodicStartDate: new Date(),
    //    periodicEndDate: new Date(),
    //    tenantId: 0
    //  }))
    //  .subscribe((response) => {
    //    if (response.result) {
        //  this.MonthlyOrdersByStatusChart.setData(MonthlyOrdersByStatusChartConfig.sampleData);

          //if (this.loadedOnce && !arrowClicked) {
          //  this.notification.displaySuccessMessage(this.translate.translate('Dashboard.Main.Success'),
          //    'Notifications.SuccessTitleDefault');
      //    } else {
      //      this.loadedOnce = true;
      //    }
      //  }
      //  this.isLoading = false;
      //});
  }


  loadTotalOrdersPastStatusTimeThresholdsChartData(programId: string) {
    //this.orderManagementClient
    //  .getOrdersPastStatusTimeThresholdData(new GetOrdersPastStatusTimeThresholdDataRequestDto({
    //    programId: programId
    //  }))
    //  .subscribe((response) => {
    //    if (response.result) {
          this.TotalOrdersPastStatusTimeThresholdsChart.setData(TotalOrdersPastStatusTimeThresholdsChartConfig.sampleData);

          // Placeholder - to be completed in relevant tasks for each chart
      //    this.loadPlaceHolderChartData(programId);
      //  }
      //});
  }

  loadPlaceHolderChartData(programId: string) {

    //this.MonthlyOrdersByStatusChart.setData(MonthlyOrdersByStatusChartConfig.sampleData);
    // Placeholder - to be completed in relevant tasks for each chart
    //this.OrdersMissingSLAsChart.setData(OrdersMissingSLAsChartConfig.sampleData);
    //this.WeeklyOrderVolumeChart.setData(WeeklyOrderVolumeChartConfig.sampleData);
    //this.OutgoingSVLsChart.setData(OutgoingSVLsChartConfig.sampleData);
    //this.incomingAOCsChart.setData(IncomingAOCsChartConfig.sampleData);
    //this.incomingSVLsChart.setData(IncomingSVLsChartConfig.sampleData);
    //this.ordersRejectionReasonsChart.setData(OrdersRejectionReasonsChartConfig.sampleData);
    //this.ordersReceivedChart.setData(OrdersReceivedChartConfig.sampleData);
    //this.ordersRejectedChart.setData(OrdersRejectedChartConfig.sampleData);
    //this.ordersShippedChart.setData(OrdersShippedChartConfig.sampleData);
    //this.outgoingAOCsChart.setData(OutgoingAOCsChartConfig.sampleData);
    //this.outgoingExceptionChart.setData(OutGoingExceptionChartConfig.sampleData);
    //this.outgoingRejectionChart.setData(OutGoingRejectionChartConfig.sampleData);
    //this.outgoingSRFsChart.setData(OutGoingSRFsChartConfig.sampleData);

    //const outGoingSvlChartCount = this.OutgoingSVLsChart.getTotalCount();
    //const incomingSvlChartCount = this.incomingSVLsChart.getTotalCount();

    //this.monthlySvlCount = outGoingSvlChartCount + incomingSvlChartCount;

   
  }

  getBIWeeklyOrdersDataByStatus(programId: string) {
    //this.isLoading = true;
    //this.orderManagementClient
    //  .getBIWeeklyOrdersData(new GetOrdersByStatusByMonthDataRequestDto({
    //    programId: programId,
    //    month: 0,
    //    year: 0,
    //    periodicStartDate: this.biWeeklyOrders_startDate,
    //    periodicEndDate: this.biWeeklyOrders_endDate,
    //    tenantId: 0

    //  }))
    //  .subscribe((response) => {
    //    console.log(response.result);
    //    if (response.result) {
          this.ordersRejectedChart.setData(OrdersRejectedChartConfig.sampleData);
          this.ordersShippedChart.setData(OrdersShippedChartConfig.sampleData);
          this.ordersReceivedChart.setData(OrdersReceivedChartConfig.sampleData);
          this.ordersRejectionReasonsChart.setData(OrdersRejectedChartConfig.sampleData);
      //  }
      //  this.isLoading = false;
      //});
  }

  getWeeklyOrderVolumeTrends(programId: any) {
    //this.isLoading = true;
    //this.orderManagementClient
    //  .getWeeklyOrderVolumeTrendsData(new GetOrdersByStatusByMonthDataRequestDto({
    //    programId: programId,
    //    month: 0,
    //    year: 0,
    //    periodicStartDate: this.weeklyOrderVolume_starteDate,
    //    periodicEndDate: this.weeklyOrderVolume_enddDate,
    //    tenantId: 0

    //  }))
    //  .subscribe((response) => {
    //    console.log(response.result);
    //    if (response.result) {
          this.WeeklyOrderVolumeChart.setData(WeeklyOrderVolumeChartConfig.sampleData);
      //  }
      //  this.isLoading = false;
      //});
  }

  getOrderSLA(programId: any) {
    //this.isLoading = true;
    //this.orderManagementClient
    //  .getOrderSLAStatus(new GetOrdersByStatusByMonthDataRequestDto({
    //    programId: programId,
    //    month: 0,
    //    year: 0,
    //    periodicStartDate: new Date(),
    //    periodicEndDate: new Date(),
    //    tenantId: 0
    //  }))
    //  .subscribe((response) => {
    //    if (response.result) {
          this.OrdersMissingSLAsChart.setData(OrdersMissingSLAsChartConfig.sampleData);
      //  }
      //  this.isLoading = false;
      //});
  }

  onChartClick(event, entity: string = null, startDate: Date, endDate: Date = null) {

    if (entity) {
      switch (entity) {
        case 'orders':
          this.router.navigate(['/hcp/orders']);
          break;
        case 'handCarry':
          this.router.navigate(['/reps']);
          break;
        default:
          break;
      }
    }
  }

  openModal(event) {
    this.dialogRef = this.dialog.open(OrderListModalComponent,
      {
        minWidth: '40vw',
        data: {
          label: event.label,
          id: event.id,
          value: event.value,
          programId: this.filterForm.get('programName').value
        }
      });
  }


  onFilter(): void {
    this.onRefreshCharts();
  }

  onClearFilter(): void {
    this.filterForm.get('programName').setValue(null);
    this.onRefreshCharts();
  }

  updateRefreshTime(): void {
    this.lastUpdated = moment(Date.now()).toDate();
  }

  getPastOrFutureDate(date: Date, days: number): Date {
    let requiredDate = new Date(date);
    return new Date(requiredDate.setDate(requiredDate.getDate() + days));
  }

  getWeekEndDateByDate(date: Date): Date {
    let currentDay = date.getDay();
    return this.getPastOrFutureDate(date, (6 - currentDay));

  }

  getWeekStartDateByDate(date: Date): Date {
    let currentDay = date.getDay();
    return this.getPastOrFutureDate(date, -currentDay);

  }


  onMonthChange(event: string) {
    if (event === 'right') {
      this.monthlyOrders_selectedDate.setMonth(this.monthlyOrders_selectedDate.getMonth() + 1)
    } else if (event === 'left') {
      this.monthlyOrders_selectedDate.setMonth(this.monthlyOrders_selectedDate.getMonth() - 1)
    }
    const programId = this.filterForm.get('programName').value;
    if (programId && programId.length > 0) {
      this.programSelected = true;
    } else {
      this.programSelected = false;
    }
    this.loadMonthlyOrdersByStatusChartData(this.monthlyOrders_selectedDate, this.programId);
  }


  orderEventTrendsClicked(event: any) {
    if (event === 'right') {
      this.biWeeklyOrders_endDate = this.getPastOrFutureDate(this.biWeeklyOrders_endDate, 14);
      this.biWeeklyOrders_startDate = this.getPastOrFutureDate(this.biWeeklyOrders_startDate, 14);;
    } else if (event === 'left') {
      this.biWeeklyOrders_endDate = this.getPastOrFutureDate(this.biWeeklyOrders_endDate, -14);
      this.biWeeklyOrders_startDate = this.getPastOrFutureDate(this.biWeeklyOrders_startDate, -14);;
    }

    if (this.programId && this.programId.length > 0) {
      this.getBIWeeklyOrdersDataByStatus(this.programId);
    }
  }


  onWeeklyOrderVolumeChange(event: string) {

    if (event === 'right') {
      this.weeklyOrderVolume_enddDate = this.getPastOrFutureDate(this.weeklyOrderVolume_enddDate, 7);
      this.weeklyOrderVolume_starteDate = this.getPastOrFutureDate(this.weeklyOrderVolume_starteDate, 7);

    } else if (event === 'left') {
      this.weeklyOrderVolume_enddDate = this.getPastOrFutureDate(this.weeklyOrderVolume_enddDate, -7);
      this.weeklyOrderVolume_starteDate = this.getPastOrFutureDate(this.weeklyOrderVolume_starteDate, -7);
    }
    const programId = this.filterForm.get('programName').value;
    if (programId && programId.length > 0) {
      this.programSelected = true;
    } else {
      this.programSelected = false;
    }
    this.getWeeklyOrderVolumeTrends(this.programId);
  }

  orderCommunicationsChange(event: any) {
    if (event === 'right') {
      this.weeklyComm_endDate = this.getPastOrFutureDate(this.weeklyComm_endDate, 7);
      this.weeklyComm_startDate = this.getPastOrFutureDate(this.weeklyComm_startDate, 7);;
    } else if (event === 'left') {
      this.weeklyComm_endDate = this.getPastOrFutureDate(this.weeklyComm_endDate, -7);
      this.weeklyComm_startDate = this.getPastOrFutureDate(this.weeklyComm_startDate, -7);;
    }

    if (this.programId && this.programId.length > 0) {
      this.getWeeklyCommunicationsVolumeTrends(this.programId);
      this.getWeeklyCommunicationsVolumeTrendsForExceptionLetters(this.programId);
    }
  }


}
