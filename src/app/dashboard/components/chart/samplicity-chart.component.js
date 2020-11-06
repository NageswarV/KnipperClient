import { __decorate, __metadata, __read, __spread, __values } from "tslib";
import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, Input, EventEmitter, Output } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Language } from 'angular-l10n';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';
var SamplicityChartComponent = /** @class */ (function () {
    function SamplicityChartComponent(cd, datePipe) {
        this.cd = cd;
        this.datePipe = datePipe;
        this.isCollapsible = false;
        this.chartClick = new EventEmitter();
        this.rangeChange = new EventEmitter();
        this.noRecordsMessage = '';
        this.showNavpanel = false;
        this.labels = [];
        this.labelDto = [];
        this.legend = false;
        this.chart = [];
        this.showMonthChange = false;
        this.showNoOrdersMessage = false;
        this.now = new Date();
        this.hasLoaded = false;
    }
    Object.defineProperty(SamplicityChartComponent.prototype, "displayValue", {
        get: function () {
            if (this.periodicity == "monthly") {
                return this.datePipe.transform(this.startDate, 'MMM') + ' ' + this.startDate.getFullYear();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SamplicityChartComponent.prototype, "disableLeftArrow", {
        get: function () {
            if (this.periodicity == "monthly") {
                if (this.minDate && this.startDate.getMonth() + 1 === this.minDate.getMonth() + 1 && this.startDate.getFullYear() === this.minDate.getFullYear()) {
                    return true;
                }
                return false;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SamplicityChartComponent.prototype, "disableRightArrow", {
        get: function () {
            if (this.periodicity == "monthly") {
                if (this.startDate.getMonth() + 1 === this.now.getMonth() + 1 && this.startDate.getFullYear() === this.now.getFullYear()) {
                    return true;
                }
                return false;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SamplicityChartComponent.prototype, "noData", {
        get: function () {
            var result = null;
            if (this.hasLoaded && this.datasets) {
                if (!this.datasets[0].label && this.datasets[0].data.every(function (x) { return x === 0; })) {
                    result = true;
                    return result;
                }
                else if (this.datasets[0].label) {
                    this.datasets.forEach(function (item) {
                        result = (result == null ? item.data.every(function (x) { return x === 0; }) : result) && item.data.every(function (x) { return x === 0; });
                    });
                    return result;
                }
                return result = false;
            }
            else {
                return result = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    SamplicityChartComponent.prototype.ngOnInit = function () {
        var e_1, _a, e_2, _b;
        if (this.config.options.title.text === 'Dashboard.Charts.Orders.PastThresholds') {
            this.showNoOrdersMessage = true;
        }
        var numberOfExpectedDataSets = 1;
        if (this.config.expectNumOfDataSets) {
            numberOfExpectedDataSets = this.config.expectNumOfDataSets;
        }
        var placeholderDataSets = [];
        if (this.config.stacks) {
            this.config.stacks.forEach(function (stack) {
                for (var i = 0; i < numberOfExpectedDataSets; i++) {
                    placeholderDataSets.push({ data: [], stack: stack });
                }
            });
        }
        else {
            for (var i = 0; i < numberOfExpectedDataSets; i++) {
                placeholderDataSets.push({ data: [] });
            }
        }
        this.datasets = placeholderDataSets;
        this.options = this.config.options;
        if (this.config.yAxisCount) {
            try {
                for (var _c = __values(this.options.scales.yAxes), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var ya = _d.value;
                    if (ya.ticks === undefined) {
                        ya.ticks = {};
                    }
                    ya.ticks.callback = this.AxisTickCountcallback;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (this.config.xAxisCount) {
            try {
                for (var _e = __values(this.options.scales.xAxes), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var xa = _f.value;
                    if (xa.ticks === undefined) {
                        xa.ticks = {};
                    }
                    xa.ticks.callback = this.AxisTickCountcallback;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        // Legend
        if (this.options.legend === undefined && this.config.legendCount) {
            this.options.legend = {};
        }
        if (this.options.legend) {
            if (this.options.legend.display) {
                this.legend = true;
            }
            else {
                this.legend = false;
            }
            // Force Override
            this.options.legend.onClick = function () { };
            if (this.config.legendCount) {
                if (this.options.legend.labels === undefined) {
                    this.options.legend.labels = {};
                }
                this.options.legend.labels.generateLabels = this.GenerateLegendLabelsCount;
            }
        }
        this.cd.detectChanges();
    };
    SamplicityChartComponent.prototype.ngAfterViewInit = function () {
    };
    SamplicityChartComponent.prototype.setData = function (data) {
        var _a, _b;
        this.labels.length = 0;
        if (data.labels.labels != null) {
            (_a = this.labels).push.apply(_a, __spread(data.labels.labels.map(function (x) { return x.label; })));
            this.labelDto = data.labels;
        }
        else {
            (_b = this.labels).push.apply(_b, __spread(data.labels));
        }
        this.datasets = data.datasets;
        this.cd.detectChanges();
        //if (!this.hasLoaded) {
        //  this.canvas.chart.update();
        //  this.hasLoaded = true;
        //} else if (!this.noData) {
        //  this.canvas.chart.update();
        //}
        //if (this.config.options.title) {
        //  if (this.config.options.title.text) {
        //    this.GenerateTitle(this.config.titleCount);
        //  }
        //}
        //let result = null;
        //if (this.hasLoaded && this.datasets) {
        //  if (!this.datasets[0].label && this.datasets[0].data.every(x => x === 0)) {
        //    result = true;
        //  } else if (this.datasets[0].label) {
        //    this.datasets.forEach(item => {
        //      result = (result == null ? item.data.every(x => x === 0) : result) && item.data.every(x => x === 0)
        //    });
        //  }
        //}
        //if (result) {
        //  this.count = 0;
        //  this.cd.detectChanges();
        //}
    };
    SamplicityChartComponent.prototype.setHandCarryData = function (data) {
        var _a, _b;
        this.labels.length = 0;
        if (data.labels.labels != null) {
            (_a = this.labels).push.apply(_a, __spread(data.labels.labels.map(function (x) { return x.label; })));
            this.labelDto = data.labels;
        }
        else {
            (_b = this.labels).push.apply(_b, __spread(data.labels));
        }
        this.datasets = data.datasets;
    };
    SamplicityChartComponent.prototype.chartClicked = function (_a) {
        var event = _a.event;
        var element = this.canvas.chart.getElementAtEvent(event);
        if (element.length) {
            var chartElement = element[0];
            if (chartElement) {
                var label = chartElement._chart.config.data.labels[chartElement._index];
                var value = chartElement._chart.config.data.datasets[chartElement._datasetIndex].data[chartElement._index];
                var datasetLabel = chartElement._chart.config.data.datasets[chartElement._datasetIndex].label;
                var labelId = this.labelDto
                    ? this.labelDto.labels[chartElement._index].id
                    : '';
                var dataMode = this.labelDto
                    ? this.labelDto.dataMode
                    : '';
                // TODO Used for Ids and Codes
                // const sLabel = this.labels[chartElement._index];
                // console.log(sLabel);
                // const sDataset = this.datasets[chartElement._datasetIndex];
                // console.log(sDataset);
                this.chartClick.emit({
                    label: label,
                    id: labelId,
                    dataMode: dataMode,
                    value: value,
                    // datasetId: '',
                    datasetLabel: datasetLabel
                });
            }
        }
    };
    SamplicityChartComponent.prototype.getTotalCount = function () {
        var e_3, _a, e_4, _b;
        var totalVal = 0;
        try {
            for (var _c = __values(this.canvas.chart.config.data.datasets), _d = _c.next(); !_d.done; _d = _c.next()) {
                var ds = _d.value;
                try {
                    for (var _e = (e_4 = void 0, __values(ds.data)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var d = _f.value;
                        totalVal += Number(d);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return totalVal;
    };
    SamplicityChartComponent.prototype.GenerateTitle = function (hasCount) {
        if (hasCount === void 0) { hasCount = false; }
        if (this.canvas && this.canvas.chart) {
            this.canvas.chart.options.title.display = false;
            if (hasCount) {
                this.count = this.getTotalCount();
            }
            this.title = this.config.options.title.text;
            this.cd.detectChanges();
        }
    };
    SamplicityChartComponent.prototype.AxisTickCountcallback = function (value, index) {
        var e_5, _a;
        if (this.chart) {
            if (this.chart.config.data.datasets.length > 0) {
                var totalVal = 0;
                try {
                    for (var _b = __values(this.chart.config.data.datasets), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var ds = _c.value;
                        totalVal += ds.data[index];
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                if (!Number.isNaN(totalVal)) {
                    return value + ' (' + totalVal + ')';
                }
            }
        }
        return value;
    };
    SamplicityChartComponent.prototype.GenerateLegendLabelsCount = function (chart) {
        var e_6, _a, e_7, _b;
        if (chart) {
            var labels = Chart.defaults.global.legend.labels.generateLabels(chart);
            if (chart.data.labels.length && chart.data.datasets.length) {
                try {
                    for (var labels_1 = __values(labels), labels_1_1 = labels_1.next(); !labels_1_1.done; labels_1_1 = labels_1.next()) {
                        var l = labels_1_1.value;
                        var ds = chart.data.datasets[l.datasetIndex];
                        var totalVal = 0;
                        try {
                            for (var _c = (e_7 = void 0, __values(ds.data)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var d = _d.value;
                                totalVal += d;
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        if (!l.text) {
                            // Set default dataset label
                            l.text = "Dataset " + (l.datasetIndex + 1);
                        }
                        l.text += ' (' + totalVal + ')';
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (labels_1_1 && !labels_1_1.done && (_a = labels_1.return)) _a.call(labels_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
            return labels;
        }
        return [];
    };
    SamplicityChartComponent.prototype.monthChangeClicked = function (event) {
        this.rangeChange.emit(event);
    };
    __decorate([
        ViewChild(BaseChartDirective, { static: true }),
        __metadata("design:type", BaseChartDirective)
    ], SamplicityChartComponent.prototype, "canvas", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SamplicityChartComponent.prototype, "config", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SamplicityChartComponent.prototype, "isCollapsible", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SamplicityChartComponent.prototype, "chartClick", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], SamplicityChartComponent.prototype, "rangeChange", void 0);
    __decorate([
        Language(),
        __metadata("design:type", Object)
    ], SamplicityChartComponent.prototype, "lang", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SamplicityChartComponent.prototype, "startDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SamplicityChartComponent.prototype, "endDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], SamplicityChartComponent.prototype, "minDate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SamplicityChartComponent.prototype, "periodicity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SamplicityChartComponent.prototype, "noRecordsMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SamplicityChartComponent.prototype, "showNavpanel", void 0);
    SamplicityChartComponent = __decorate([
        Component({
            selector: 'samplicity-chart',
            templateUrl: './samplicity-chart.component.html',
            styleUrls: ['./samplicity-chart.component.scss'],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            DatePipe])
    ], SamplicityChartComponent);
    return SamplicityChartComponent;
}());
export { SamplicityChartComponent };
//# sourceMappingURL=samplicity-chart.component.js.map