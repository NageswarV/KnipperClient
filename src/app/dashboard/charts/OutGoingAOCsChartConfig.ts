import { ChartColors } from '../components/chart/chart-colors';

export const OutgoingAOCsChartConfig = {
  config: {
    type: 'bar',
    options: {
      layout: {
        padding: {
          left: 10
        }
      },
      title: {
        display:true,
        text: 'Outgoing AOCs',
        fontSize: 22,
        position: 'top',
        align:'start'
      },
      legend: {
        labels: {
          padding: 3
        },
        display: true,
        position: 'bottom'
      },
      scales: {
        xAxes: [{
          display: true,
          stacked: true,
        }],
        yAxes: [{
          display: false,
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      },
      onResize: function(myChart, size) {
        myChart.options.legend.display = (size.height > 200);
        myChart.options.legend.position = 'bottom';
    }
    },
    xAxisCount: true,
    titleCount: true,
    colors: [
      {
        backgroundColor: ChartColors.Yellow
      },
      {
        backgroundColor: ChartColors.Orange
      },
      {
        backgroundColor: ChartColors.Red
      },
      {
        backgroundColor: ChartColors.KnipperBlue
      },
      {
        backgroundColor: ChartColors.Purple
      },
      {
        backgroundColor: ChartColors.Teal
      }
    ],
    expectNumOfDataSets: 6
  },
  sampleData: {
    labels: [
      '     Sep 11 - Sep 17, 2018',
      '     Sep 18 - Sep 24, 2018',
      '     Sep 25 - Oct 1, 2018',
      '     Oct 2 - Oct 8, 2018',
      '     Oct 9 - Oct 15, 2018',
    ],
    datasets: [
      {
        label: 'Non-Delivered AOC Follow Up Letters 1',
        data: [13, 10, 6, 9, 5]
      },
      {
        label: 'Non-Delivered AOC Follow Up Letters 2',
        data: [2, 3, 5, 1, 1]
      },
      {
        label: 'Non-Delivered AOC Follow Up Letters 3',
        data: [2, 3, 5, 1, 1]
      },
      {
        label: 'Sent AOC Follow Up Letters 1',
        data: [2, 3, 5, 1, 1]
      },
      {
        label: 'Sent AOC Follow Up Letters 2',
        data: [2, 3, 5, 1, 1]
      },
      {
        label: 'Sent AOC Follow Up Letters 3',
        data: [2, 3, 5, 1, 1]
      }
    ]
  }
};
