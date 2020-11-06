import {
  Component, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit, EventEmitter, Output
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Language } from 'angular-l10n';
import { ISamplicityChartConfig } from '../chart/samplicity-chart-config';
import { Chart } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'samplicity-chart',
  templateUrl: './samplicity-chart.component.html',
  styleUrls: ['./samplicity-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class SamplicityChartComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective, {static:true}) canvas: BaseChartDirective;
  @Input() config: ISamplicityChartConfig;
  @Input() isCollapsible = false;
  @Output() chartClick: EventEmitter<any> = new EventEmitter();
  @Output() rangeChange: EventEmitter<string> = new EventEmitter();
  @Language() lang: any;
  @Input() startDate: any;
  @Input() endDate: any;
  @Input() minDate: Date;
  @Input() periodicity: any; //monthly,quarterly,weekly,yearly,halfyearly,biweekly
  @Input() noRecordsMessage: string = ''
  @Input() showNavpanel: boolean = false;

  public labels: any = [];
  public labelDto: any = [];
  public options: any;
  public legend: any = false;
  public datasets: any;

  chart: any = [];
  title: string;
  count: number;
  showMonthChange = false;
  showNoOrdersMessage = false;
  now = new Date();
  hasLoaded = false;

  get displayValue(): string {
    if (this.periodicity == "monthly") {
      return this.datePipe.transform(this.startDate, 'MMM') + ' ' + this.startDate.getFullYear();
    }
  }

  get disableLeftArrow(): boolean {
    if (this.periodicity == "monthly") {
      if (this.minDate && this.startDate.getMonth() + 1 === this.minDate.getMonth() + 1 && this.startDate.getFullYear() === this.minDate.getFullYear()) {
        return true;
      }
      return false;
    }
    return false;
  }

  get disableRightArrow(): boolean {
    if (this.periodicity == "monthly") {
      if (this.startDate.getMonth() + 1 === this.now.getMonth() + 1 && this.startDate.getFullYear() === this.now.getFullYear()) {
        return true;
      }
      return false;
    }
    return false;
  }

  get noData(): boolean {
    let result = null;
    if (this.hasLoaded && this.datasets) {
      if (!this.datasets[0].label && this.datasets[0].data.every(x => x === 0)) {
        result = true;
        return result;
      }else if(this.datasets[0].label){
        this.datasets.forEach(item => {
          result = (result == null? item.data.every(x => x === 0) : result ) && item.data.every(x => x === 0)
        });

        return result;
      }
      return result=false;

    } else {
      return result=false;
    }
  }

  constructor(
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {

    if (this.config.options.title.text === 'Dashboard.Charts.Orders.PastThresholds') {
      this.showNoOrdersMessage = true;
    }
    let numberOfExpectedDataSets = 1;
    if (this.config.expectNumOfDataSets) {
      numberOfExpectedDataSets = this.config.expectNumOfDataSets;
    }
    const placeholderDataSets: any[] = [];
    if (this.config.stacks) {
      this.config.stacks.forEach(function (stack) {
        for (let i = 0; i < numberOfExpectedDataSets; i++) {
          placeholderDataSets.push({ data: [], stack: stack });
        }
      });
    } else {
      for (let i = 0; i < numberOfExpectedDataSets; i++) {
        placeholderDataSets.push({ data: [] });
      }
    }
    this.datasets = placeholderDataSets;

    this.options = this.config.options;

    if (this.config.yAxisCount) {
      for (const ya of this.options.scales.yAxes) {
        if (ya.ticks === undefined) {
          ya.ticks = {};
        }
        ya.ticks.callback = this.AxisTickCountcallback;
      }
    }
    if (this.config.xAxisCount) {
      for (const xa of this.options.scales.xAxes) {
        if (xa.ticks === undefined) {
          xa.ticks = {};
        }
        xa.ticks.callback = this.AxisTickCountcallback;
      }
      
    }

    // Legend
    if (this.options.legend === undefined && this.config.legendCount) {
      this.options.legend = {};
    }

    if (this.options.legend) {
      if (this.options.legend.display) {
        this.legend = true;
      } else {
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
  }

  ngAfterViewInit(): void {
  }

  setData(data: any) {
    this.labels.length = 0;

    if (data.labels.labels != null) {
      this.labels.push(...data.labels.labels.map(x => x.label));
      this.labelDto = data.labels;
    } else {
      this.labels.push(...data.labels);
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

  }

  setHandCarryData(data: any) {
    this.labels.length = 0;

    if (data.labels.labels != null) {
      this.labels.push(...data.labels.labels.map(x => x.label));
      this.labelDto = data.labels;
    } else {
      this.labels.push(...data.labels);
    }
    this.datasets = data.datasets;
  }
  public chartClicked({ event }: { event: MouseEvent, active: {}[] }): void {
    //const element = this.canvas.chart.getElementAtEvent(event);
    //if (element.length) {
    //  const chartElement = element[0];
     
    //  if (chartElement) {
    //    const label = chartElement._chart.config.data.labels[chartElement._index];
    //    const value = chartElement._chart.config.data.datasets[chartElement._datasetIndex].data[chartElement._index];
    //    const datasetLabel = chartElement._chart.config.data.datasets[chartElement._datasetIndex].label;

    //    const labelId = this.labelDto
    //      ? this.labelDto.labels[chartElement._index].id
    //      : '';
    //    const dataMode = this.labelDto
    //      ? this.labelDto.dataMode
    //      : '';

        // TODO Used for Ids and Codes
        // const sLabel = this.labels[chartElement._index];
        // console.log(sLabel);
        // const sDataset = this.datasets[chartElement._datasetIndex];
        // console.log(sDataset);

        this.chartClick.emit({
          //label: label,
          //id: labelId,
          //dataMode: dataMode,
          //value: value,
          //// datasetId: '',
          //datasetLabel: datasetLabel
        });
      //}
    //}
  }

  public getTotalCount() {
    let totalVal = 0;
    for (const ds of this.canvas.chart.config.data.datasets) {
      for (const d of ds.data) {
        totalVal += Number(d);
      }
    }
    return totalVal;
  }

  private GenerateTitle(hasCount: boolean = false) {
    if (this.canvas && this.canvas.chart) {
      this.canvas.chart.options.title.display = false;
      if (hasCount) {
        this.count = this.getTotalCount();
      }
      this.title = this.config.options.title.text;
      this.cd.detectChanges();
    }
  }

  private AxisTickCountcallback(value, index): string {
    if (this.chart) {
      if (this.chart.config.data.datasets.length > 0) {
        let totalVal = 0;
        for (const ds of this.chart.config.data.datasets) {
          totalVal += ds.data[index];
        }
        if (!Number.isNaN(totalVal)) {
          return value + ' (' + totalVal + ')';
        }
      }
    }
    return value;
  }

  private GenerateLegendLabelsCount(chart) {
    if (chart) {
      const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
      if (chart.data.labels.length && chart.data.datasets.length) {
        for (const l of labels) {
          const ds = chart.data.datasets[l.datasetIndex];
          let totalVal = 0;
          for (const d of ds.data) {
            totalVal += d;
          }
          if (!l.text) {
            // Set default dataset label
            l.text = `Dataset ${l.datasetIndex + 1}`;
          }
          l.text += ' (' + totalVal + ')';
        }
      }
      return labels;
    }
    return [];
  }

  public monthChangeClicked(event: string) {
    this.rangeChange.emit(event);
  }
}

