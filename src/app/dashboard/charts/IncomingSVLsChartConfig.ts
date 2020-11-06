import { ChartColors } from '../components/chart/chart-colors';

export const IncomingSVLsChartConfig = {
  config: {
    type: 'bar',
    options: {
      title: {
        display:true,
        text: 'Incoming SVLs',
        fontSize: 22,
        position: 'top',
        align: 'start'
      },
      legend: {
        display: true,
        position: 'left',
        fullWidth: false
      },
      scales: {
        xAxes: [{
          display: true,
          stacked: true
        }],
        yAxes: [{
          display: false,
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
    titleCount: true,
    legendCount: true,
    colors: [
      {
        backgroundColor: ChartColors.KnipperBlue,
      },
      {
        backgroundColor: ChartColors.SkyBlue,
      },
      {
        backgroundColor: ChartColors.Yellow,
      },
      {
        backgroundColor: ChartColors.DarkOrange,
      },
      {
        backgroundColor: ChartColors.DarkGreen,
      },
      {
        backgroundColor: ChartColors.LightGreen,
      },
      {
        backgroundColor: ChartColors.Red,
      },
      {
        backgroundColor: ChartColors.ChartPink,
      },
      {
        backgroundColor: ChartColors.Black,
      },
      {
        backgroundColor: ChartColors.Purple,
      }
    ],
    expectNumOfDataSets: 2
  },
  sampleData: {
    labels: [
      'Aug 2018',
      'Sep 2018',
      'Oct 2018'
    ],
    datasets: [
      {
        label: 'Incoming Order Request SVLs',
        stack: 'order-svl',
        data: [10, 12, 11]
      },
      {
        label: 'Incoming AOC SVLs',
        stack: 'aoc-svl',
        data: [20, 21, 15]
      },
      {
        label: 'Under Investigation Order Request SVLs',
        stack: 'order-svl',
        data: [5, 7, 1]
      },
      {
        label: 'Under Investigation AOC SVLs',
        stack: 'aoc-svl',
        data: [6, 8, 19]
      },
      {
        label: 'Positive Response Order Request SVLs',
        stack: 'order-svl',
        data: [13, 3, 6]
      },
      {
        label: 'Positive Response AOC SVLs',
        stack: 'aoc-svl',
        data: [8, 12, 14]
      },
      {
        label: 'Negative Response Order Request SVLs',
        stack: 'order-svl',
        data: [11, 5, 9]
      },
      {
        label: 'Negative Response AOC SVLs',
        stack: 'aoc-svl',
        data: [10, 12, 11]
      },
      {
        label: 'Inconclusive Response Order Request SVLs',
        stack: 'order-svl',
        data: [9, 22, 1]
      },
      {
        label: 'Inconclusive Response AOC SVLs',
        stack: 'aoc-svl',
        data: [16, 12, 17]
      }
    ]
  }
};
