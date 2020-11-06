import { __decorate, __metadata } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Language } from 'angular-l10n';
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
import * as moment from 'moment-timezone';
import { NotificationComponent } from '../../shared';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderListModalComponent } from './order-list-modal/order-list-modal.component';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of } from 'rxjs/observable/of';
import { IncomingAocSvlsChartConfig } from '../charts/incomingAocSvlsChart';
import { IncomingOrderRequestChartConfig } from '../charts/incomingOrderRequestSvlsChart';
import { WeeklyAODTrackingConfig } from '../charts/WeeklyAODTracking';
import { ReportableIncidentsChartConfig } from '../charts/ReportIncidentChartConfig';
import { RepSamplingActivitiesChartConfig } from '../charts/RepSamplingActivitiesChartConfig';
import { ReconciledChartConfig } from '../charts/ReconciledChartConfig';
import { AuditInventoryManagementChartConfig } from '../charts/AuditInventoryManagementChartConfig';
import { dashboardService } from './dashboard-service';
var DashboardDetailComponent = /** @class */ (function () {
    function DashboardDetailComponent(dbService, fb, router, dialog, datePipe) {
        this.dbService = dbService;
        this.fb = fb;
        this.router = router;
        this.dialog = dialog;
        this.datePipe = datePipe;
        this.monthlyOrdersByStatusChartOptions = MonthlyOrdersByStatusChartConfig.config;
        this.totalOrdersPastStatusTimeThresholdsChartOptions = TotalOrdersPastStatusTimeThresholdsChartConfig.config;
        this.ordersMissingSLAsChartOptions = OrdersMissingSLAsChartConfig.config;
        this.weeklyOrderVolumeChartOptions = WeeklyOrderVolumeChartConfig.config;
        this.outgoingSVLsChartOptions = OutgoingSVLsChartConfig.config;
        this.incomingAOCsChartOptions = IncomingAOCsChartConfig.config;
        this.incomingSVLsChartOptions = IncomingSVLsChartConfig.config;
        this.ordersRejectionReasonsChartOptions = OrdersRejectionReasonsChartConfig.config;
        this.ordersReceivedChartOptions = OrdersReceivedChartConfig.config;
        this.ordersRejectedChartOptions = OrdersRejectedChartConfig.config;
        this.ordersShippedChartOptions = OrdersShippedChartConfig.config;
        this.outgoingAOCsChartOptions = OutgoingAOCsChartConfig.config;
        this.outGoingExceptionChartOptions = OutGoingExceptionChartConfig.config;
        this.outGoingRejectionChartOptions = OutGoingRejectionChartConfig.config;
        this.outGoingSRFsChartOptions = OutGoingSRFsChartConfig.config;
        this.incomingOrderRequestSvlChartOptions = IncomingOrderRequestChartConfig.config;
        this.incomingAocSvlChartOptions = IncomingAocSvlsChartConfig.config;
        this.weeklyAODTrackingChartOptions = WeeklyAODTrackingConfig.config;
        this.reportIncidentChartOptions = ReportableIncidentsChartConfig.config;
        this.repSamplingChartOptions = RepSamplingActivitiesChartConfig.config;
        this.reconciledChartOptions = ReconciledChartConfig.config;
        this.auditInventoryManagementChartOptions = AuditInventoryManagementChartConfig.config;
        this.isLoading = false;
        this.lastUpdated = moment(Date.now()).toDate();
        this.programs = [];
        this.programSelected = false;
        this.hasNoPrograms = false;
        this.loadedOnce = false;
        this.monthlySvlCount = 0;
        this.tenantCreationTime = moment(new Date()).toDate();
        this.currentTab = 0;
        this.mainTab = 0;
        this.now = moment(new Date()).toDate();
        this.currentMonth = this.now.getMonth() + 1;
        this.currentYear = this.now.getFullYear();
        this.monthlyOrders_selectedDate = this.now;
        this.biWeeklyOrders_startDate = this.getPastOrFutureDate(this.now, -13);
        this.biWeeklyOrders_endDate = this.now;
        this.weeklyComm_startDate = this.getPastOrFutureDate(this.now, -6);
        this.weeklyComm_endDate = this.now;
        this.timeFrameSelected = "QUARTERLY";
    }
    Object.defineProperty(DashboardDetailComponent.prototype, "minActivationDate", {
        get: function () {
            if (this.programList) {
                var programId_1 = this.filterForm.get('programName').value;
                if (programId_1 && programId_1.length > 0) {
                    return this.programList.find(function (x) { return x.id === programId_1; }).actualStartDate;
                }
                else {
                    return this.tenantCreationTime;
                }
            }
            else {
                return this.now;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DashboardDetailComponent.prototype, "programId", {
        get: function () {
            return this.filterForm.get('programName').value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DashboardDetailComponent.prototype, "biWeeklydisplayValue", {
        get: function () {
            return this.datePipe.transform(this.biWeeklyOrders_startDate, 'MMM') + ' ' + this.datePipe.transform(this.biWeeklyOrders_startDate, 'dd') + ',' + this.biWeeklyOrders_startDate.getFullYear() +
                ' - ' + this.datePipe.transform(this.biWeeklyOrders_endDate, 'MMM') + ' ' + this.datePipe.transform(this.biWeeklyOrders_endDate, 'dd') + ',' + this.biWeeklyOrders_endDate.getFullYear();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DashboardDetailComponent.prototype, "weeklydisplayValue", {
        get: function () {
            var x = this.datePipe.transform(this.weeklyComm_startDate, 'MMM') + ' ' + this.datePipe.transform(this.weeklyComm_startDate, 'dd') + ',' + this.weeklyComm_startDate.getFullYear() +
                ' - ' + this.datePipe.transform(this.weeklyComm_endDate, 'MMM') + ' ' + this.datePipe.transform(this.weeklyComm_endDate, 'dd') + ',' + this.weeklyComm_endDate.getFullYear();
            return x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DashboardDetailComponent.prototype, "getDTPTimeFrameOptions", {
        get: function () {
            return { weekly: true, quarterly: true, monthly: true };
        },
        enumerable: false,
        configurable: true
    });
    DashboardDetailComponent.prototype.ngOnInit = function () {
        this.createFilter();
        this.weeklyOrderVolume_enddDate = this.getWeekEndDateByDate(this.now);
        this.weeklyOrderVolume_starteDate = this.getWeekStartDateByDate(this.getPastOrFutureDate(this.weeklyOrderVolume_enddDate, -28));
        this.weeklyComm_endDate = this.getWeekEndDateByDate(this.now);
        this.weeklyComm_startDate = this.getWeekStartDateByDate(this.getPastOrFutureDate(this.weeklyComm_endDate, -28));
    };
    DashboardDetailComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.dbService.GetWeeklyOrderVolumeTrends().subscribe(function (response) {
            return _this.WeeklyOrderVolumeChart.setData(response.data);
        });
        this.RepSamplingChart.setHandCarryData(RepSamplingActivitiesChartConfig.sampleData);
        this.ReportIncidentChart.setHandCarryData(ReportableIncidentsChartConfig.sampleData);
        this.ReconciledChart.setHandCarryData(ReconciledChartConfig.sampleData);
        this.AuditInventoryManagementChart.setHandCarryData(AuditInventoryManagementChartConfig.sampleData);
        this.ordersRejectedChart.setData(OrdersRejectedChartConfig.sampleData);
        this.ordersRejectionReasonsChart.setData(OrdersRejectionReasonsChartConfig.sampleData);
    };
    DashboardDetailComponent.prototype.mainTabChanged = function (event) {
        var _this = this;
        this.mainTab = event.index;
        if (this.mainTab == 1) {
            this.dbService.GetHandCarryMetrics().subscribe(function (response) {
                _this.RepSamplingChart.setHandCarryData(response[0].data);
                _this.ReportIncidentChart.setHandCarryData(response[1].data);
                _this.ReconciledChart.setHandCarryData(response[2].data);
                _this.AuditInventoryManagementChart.setHandCarryData(response[3].data);
            });
        }
        else {
            this.dbService.GetWeeklyOrderVolumeTrends().subscribe(function (response) {
                return _this.WeeklyOrderVolumeChart.setData(response.data);
            });
        }
    };
    DashboardDetailComponent.prototype.tabChanged = function (event) {
        var _this = this;
        this.currentTab = event.index;
        switch (this.currentTab) {
            case 0:
                this.dbService.GetWeeklyOrderVolumeTrends().subscribe(function (response) {
                    return _this.WeeklyOrderVolumeChart.setData(response.data);
                });
                break;
            case 1:
                this.dbService.Get14DayOrderEventsTrends().subscribe(function (response) {
                    _this.ordersReceivedChart.setData(response[0].data);
                    _this.ordersShippedChart.setData(response[1].data);
                    _this.ordersRejectionReasonsChart.setData(response[2].data);
                    _this.ordersRejectedChart.setData(response[3].data);
                });
                break;
            case 2:
                this.dbService.GetWeeklyCommunicationVolumeTrends().subscribe(function (response) {
                    if (response) {
                        _this.outgoingSRFsChart.setData(response[0].data);
                        _this.outgoingExceptionChart.setData(response[1].data);
                        _this.outgoingRejectionChart.setData(response[2].data);
                        _this.incomingAOCsChart.setData(response[3].data);
                        _this.outgoingAOCsChart.setData(response[4].data);
                    }
                });
                break;
            case 3:
                this.dbService.GetMonthlySVLVolumeTrends().subscribe(function (response) {
                    if (response) {
                        _this.incomingSVLsChart.setData(response[0].data);
                        _this.OutgoingSVLsChart.setData(response[1].data);
                        _this.incomingOrderRequestSvlChart.setData(response[2].data);
                        _this.incomingAocSvlChart.setData(response[3].data);
                    }
                });
                break;
            case 4:
                this.dbService.GetWeeklyAODTracking().subscribe(function (response) {
                    return _this.WeeklyAODTrackingChart.setData(response.data);
                });
                break;
            default:
                break;
        }
    };
    DashboardDetailComponent.prototype.getNextSet = function () {
        this.getPastOrFutureDate(this.tenantCreationTime, 30);
    };
    DashboardDetailComponent.prototype.getPrevSet = function () {
        this.getPastOrFutureDate(this.tenantCreationTime, -30);
    };
    DashboardDetailComponent.prototype.createFilter = function () {
        this.filterForm = this.fb.group({
            programName: ['', []]
        });
    };
    DashboardDetailComponent.prototype.onRefreshCharts = function () {
        this.isLoading = true;
        if (this.programId && this.programId.length > 0) {
            this.programSelected = true;
        }
        else {
            this.programSelected = false;
        }
        if (this.minActivationDate != null
            && this.monthlyOrders_selectedDate < this.minActivationDate) {
            this.monthlyOrders_selectedDate = this.minActivationDate;
        }
        this.loadMonthlyOrdersByStatusChartData(this.monthlyOrders_selectedDate, this.programId);
        this.getOrderSLA(this.programId);
        if (this.programSelected) {
            var chartData = forkJoin(of(this.loadTotalOrdersPastStatusTimeThresholdsChartData(this.programId)), of(this.getBIWeeklyOrdersDataByStatus(this.programId)), of(this.getWeeklyOrderVolumeTrends(this.programId)), of(this.getWeeklyCommunicationsVolumeTrends(this.programId)), of(this.getWeeklyCommunicationsVolumeTrendsForExceptionLetters(this.programId)));
            chartData.subscribe(function (x) { return x; });
        }
    };
    DashboardDetailComponent.prototype.getWeeklyCommunicationsVolumeTrendsForExceptionLetters = function (programId) {
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
    };
    DashboardDetailComponent.prototype.getWeeklyCommunicationsVolumeTrends = function (programId) {
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
    };
    DashboardDetailComponent.prototype.loadMonthlyOrdersByStatusChartData = function (selectedDate, programId, arrowClicked) {
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
        if (programId === void 0) { programId = null; }
        if (arrowClicked === void 0) { arrowClicked = false; }
        //if (this.loadedOnce && !arrowClicked) {
        //  this.notification.displaySuccessMessage(this.translate.translate('Dashboard.Main.Success'),
        //    'Notifications.SuccessTitleDefault');
        //    } else {
        //      this.loadedOnce = true;
        //    }
        //  }
        //  this.isLoading = false;
        //});
    };
    DashboardDetailComponent.prototype.loadTotalOrdersPastStatusTimeThresholdsChartData = function (programId) {
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
    };
    DashboardDetailComponent.prototype.loadPlaceHolderChartData = function (programId) {
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
    };
    DashboardDetailComponent.prototype.getBIWeeklyOrdersDataByStatus = function (programId) {
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
    };
    DashboardDetailComponent.prototype.getWeeklyOrderVolumeTrends = function (programId) {
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
    };
    DashboardDetailComponent.prototype.getOrderSLA = function (programId) {
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
    };
    DashboardDetailComponent.prototype.onChartClick = function (event, entity, startDate, endDate) {
        //const now = new Date();
        //var currentStartDate = startDate;
        //var currentendDate = !endDate ? startDate : endDate;
        if (entity === void 0) { entity = null; }
        if (endDate === void 0) { endDate = null; }
        //const selectedClientId = this.clientService.getClientId();
        //const program = this.programSelected
        //  ? this.programs.find(x => x.value === this.filterForm.get('programName').value).label.split('(')
        //  : '';
        //let programName = '', jobId = ''
        //if (program) {
        //  programName = program[0].substring(0, program[0].length - 1).trim();
        //  jobId = program[1].substring(0, program[1].length - 1).trim().toString();
        //}
        //if (entity) {
        //  switch (entity) {
        //    case 'orders':
        //      const orderStatusId = event.id;
        //      if (programName === '') {
        //        this.router.navigate(['/' + selectedClientId + '/orders',
        //        { orderStatusId: orderStatusId, month: currentStartDate.getMonth(), year: currentendDate.getFullYear() }]);
        //      } else {
        //        this.router.navigate(['/' + selectedClientId + '/orders',
        //        { jobId: jobId, orderStatusId: orderStatusId, month: currentStartDate.getMonth(), year: currentendDate.getFullYear() }]);
        //      }
        //      break;
        //    case 'biweeklyOrders':
        //      let statusId = event.id;
        //      if (programName !== '') {
        //        this.router.navigate(['/' + selectedClientId + '/orders',
        //        { programName: programName, orderStatusId: statusId }]);
        //      }
        //      break;
        //    case 'ordersPastStatusTimeThreshold':
        //      this.openModal(event);
        //      break;
        //    case 'weeklyOrders':
        //      let includeStatus = (event.datasetLabel == "All Other Statues") ? false : true;
        //      let dates = event.label.split('(')[0].split('-');
        //      startDate = moment.utc(dates[0]);
        //      endDate = moment.utc(dates[1]);
        //      if (programName !== '') {
        //        let url = this.router.serializeUrl(
        //          this.router.createUrlTree(['/' + selectedClientId + '/orders',
        //          { programName: programName, jobId: jobId, inStatus: includeStatus, statIds: event.dataSetId, dtFrom: startDate, dtTo: endDate }])
        //        );
        //        this.filterService.clearFilter('Order.List.Title');
        //        window.open('#' + url)
        //      }
        //      break;
        //    default:
        //      break;
        //  }
        //}
    };
    DashboardDetailComponent.prototype.openModal = function (event) {
        this.dialogRef = this.dialog.open(OrderListModalComponent, {
            minWidth: '40vw',
            data: {
                label: event.label,
                id: event.id,
                value: event.value,
                programId: this.filterForm.get('programName').value
            }
        });
    };
    DashboardDetailComponent.prototype.onFilter = function () {
        this.onRefreshCharts();
    };
    DashboardDetailComponent.prototype.onClearFilter = function () {
        this.filterForm.get('programName').setValue(null);
        this.onRefreshCharts();
    };
    DashboardDetailComponent.prototype.updateRefreshTime = function () {
        this.lastUpdated = moment(Date.now()).toDate();
    };
    DashboardDetailComponent.prototype.getPastOrFutureDate = function (date, days) {
        var requiredDate = new Date(date);
        return new Date(requiredDate.setDate(requiredDate.getDate() + days));
    };
    DashboardDetailComponent.prototype.getWeekEndDateByDate = function (date) {
        var currentDay = date.getDay();
        return this.getPastOrFutureDate(date, (6 - currentDay));
    };
    DashboardDetailComponent.prototype.getWeekStartDateByDate = function (date) {
        var currentDay = date.getDay();
        return this.getPastOrFutureDate(date, -currentDay);
    };
    DashboardDetailComponent.prototype.onMonthChange = function (event) {
        if (event === 'right') {
            this.monthlyOrders_selectedDate.setMonth(this.monthlyOrders_selectedDate.getMonth() + 1);
        }
        else if (event === 'left') {
            this.monthlyOrders_selectedDate.setMonth(this.monthlyOrders_selectedDate.getMonth() - 1);
        }
        var programId = this.filterForm.get('programName').value;
        if (programId && programId.length > 0) {
            this.programSelected = true;
        }
        else {
            this.programSelected = false;
        }
        this.loadMonthlyOrdersByStatusChartData(this.monthlyOrders_selectedDate, this.programId);
    };
    DashboardDetailComponent.prototype.orderEventTrendsClicked = function (event) {
        if (event === 'right') {
            this.biWeeklyOrders_endDate = this.getPastOrFutureDate(this.biWeeklyOrders_endDate, 14);
            this.biWeeklyOrders_startDate = this.getPastOrFutureDate(this.biWeeklyOrders_startDate, 14);
            ;
        }
        else if (event === 'left') {
            this.biWeeklyOrders_endDate = this.getPastOrFutureDate(this.biWeeklyOrders_endDate, -14);
            this.biWeeklyOrders_startDate = this.getPastOrFutureDate(this.biWeeklyOrders_startDate, -14);
            ;
        }
        if (this.programId && this.programId.length > 0) {
            this.getBIWeeklyOrdersDataByStatus(this.programId);
        }
    };
    DashboardDetailComponent.prototype.onWeeklyOrderVolumeChange = function (event) {
        if (event === 'right') {
            this.weeklyOrderVolume_enddDate = this.getPastOrFutureDate(this.weeklyOrderVolume_enddDate, 7);
            this.weeklyOrderVolume_starteDate = this.getPastOrFutureDate(this.weeklyOrderVolume_starteDate, 7);
        }
        else if (event === 'left') {
            this.weeklyOrderVolume_enddDate = this.getPastOrFutureDate(this.weeklyOrderVolume_enddDate, -7);
            this.weeklyOrderVolume_starteDate = this.getPastOrFutureDate(this.weeklyOrderVolume_starteDate, -7);
        }
        var programId = this.filterForm.get('programName').value;
        if (programId && programId.length > 0) {
            this.programSelected = true;
        }
        else {
            this.programSelected = false;
        }
        this.getWeeklyOrderVolumeTrends(this.programId);
    };
    DashboardDetailComponent.prototype.orderCommunicationsChange = function (event) {
        if (event === 'right') {
            this.weeklyComm_endDate = this.getPastOrFutureDate(this.weeklyComm_endDate, 7);
            this.weeklyComm_startDate = this.getPastOrFutureDate(this.weeklyComm_startDate, 7);
            ;
        }
        else if (event === 'left') {
            this.weeklyComm_endDate = this.getPastOrFutureDate(this.weeklyComm_endDate, -7);
            this.weeklyComm_startDate = this.getPastOrFutureDate(this.weeklyComm_startDate, -7);
            ;
        }
        if (this.programId && this.programId.length > 0) {
            this.getWeeklyCommunicationsVolumeTrends(this.programId);
            this.getWeeklyCommunicationsVolumeTrendsForExceptionLetters(this.programId);
        }
    };
    __decorate([
        ViewChild('monthlyOrdersByStatusChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "MonthlyOrdersByStatusChart", void 0);
    __decorate([
        ViewChild('totalOrdersPastStatusTimeThresholdsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "TotalOrdersPastStatusTimeThresholdsChart", void 0);
    __decorate([
        ViewChild('ordersMissingSLAs', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "OrdersMissingSLAsChart", void 0);
    __decorate([
        ViewChild('weeklyOrderVolumeChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "WeeklyOrderVolumeChart", void 0);
    __decorate([
        ViewChild('weeklyAODTrackingChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "WeeklyAODTrackingChart", void 0);
    __decorate([
        ViewChild('outgoingSVLsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "OutgoingSVLsChart", void 0);
    __decorate([
        ViewChild('incomingAOCsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "incomingAOCsChart", void 0);
    __decorate([
        ViewChild('incomingSVLsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "incomingSVLsChart", void 0);
    __decorate([
        ViewChild('ordersRejectionReasonsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "ordersRejectionReasonsChart", void 0);
    __decorate([
        ViewChild('ordersReceivedChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "ordersReceivedChart", void 0);
    __decorate([
        ViewChild('ordersRejectedChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "ordersRejectedChart", void 0);
    __decorate([
        ViewChild('ordersShippedChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "ordersShippedChart", void 0);
    __decorate([
        ViewChild('outgoingAOCsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "outgoingAOCsChart", void 0);
    __decorate([
        ViewChild('outgoingExceptionChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "outgoingExceptionChart", void 0);
    __decorate([
        ViewChild('outgoingRejectionChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "outgoingRejectionChart", void 0);
    __decorate([
        ViewChild('outgoingSRFsChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "outgoingSRFsChart", void 0);
    __decorate([
        ViewChild('incomingOrderRequestSvlChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "incomingOrderRequestSvlChart", void 0);
    __decorate([
        ViewChild('incomingAocSvlChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "incomingAocSvlChart", void 0);
    __decorate([
        ViewChild('reportIncidentChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "ReportIncidentChart", void 0);
    __decorate([
        ViewChild('repSamplingChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "RepSamplingChart", void 0);
    __decorate([
        ViewChild('reconciledChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "ReconciledChart", void 0);
    __decorate([
        ViewChild('auditInventoryManagementChart', { static: true }),
        __metadata("design:type", SamplicityChartComponent)
    ], DashboardDetailComponent.prototype, "AuditInventoryManagementChart", void 0);
    __decorate([
        ViewChild('notification', { static: true }),
        __metadata("design:type", NotificationComponent)
    ], DashboardDetailComponent.prototype, "notification", void 0);
    __decorate([
        ViewChild('ordersPastStatusTimeThresholdDialog', { static: true }),
        __metadata("design:type", Object)
    ], DashboardDetailComponent.prototype, "ordersPastStatusTimeThresholdDialog", void 0);
    __decorate([
        Language(),
        __metadata("design:type", Object)
    ], DashboardDetailComponent.prototype, "lang", void 0);
    DashboardDetailComponent = __decorate([
        Component({
            selector: 'samplicity-dashboard-detail',
            templateUrl: './dashboard-detail.component.html',
            styleUrls: ['./dashboard-detail.component.scss']
        }),
        __metadata("design:paramtypes", [dashboardService,
            FormBuilder,
            Router,
            MatDialog,
            DatePipe])
    ], DashboardDetailComponent);
    return DashboardDetailComponent;
}());
export { DashboardDetailComponent };
//# sourceMappingURL=dashboard-detail.component.js.map