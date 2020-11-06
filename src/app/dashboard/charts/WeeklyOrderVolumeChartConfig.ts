import { ChartColors } from '../components/chart/chart-colors';

export const WeeklyOrderVolumeChartConfig = {
    config: {
      type: 'bar',
        options: {
          title: {
            display: true,
            position:'top',
            text: 'Weekly Order Volume Trends',
            fontSize: 22,
            align: 'start'
          },
          legend: {
            display: true,
            position: 'right',
            
            reverse: true
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
      xAxisCount: true,
      titleCount: true,
      legendCount: true,
      colors:  [
        {
          backgroundColor: ChartColors.Grey
        },
        {
          backgroundColor: ChartColors.Blue
        },
        {
          backgroundColor: ChartColors.Green
        },
        {
          backgroundColor: ChartColors.DarkGreen
        },
        {
          backgroundColor: ChartColors.Purple
        },
        {
          backgroundColor: ChartColors.Charcoal
        },
        {
          backgroundColor: ChartColors.Yellow
        },
        {
          backgroundColor: ChartColors.DarkOrange
        },
        {
          backgroundColor: ChartColors.Orange
        },
        {
          backgroundColor: ChartColors.Red
        },
        {
          backgroundColor: ChartColors.Pink
        }
      ],
      expectNumOfDataSets: 10
    },
    sampleData: {
      labels: [
        '  Sep 11 - Sep 17, 2018',
        '  Sep 18 - Sep 24, 2018',
        '  Sep 25 - Oct 1, 2018',
        '  Oct 2 - Oct 8, 2018',
        '  Oct 9 - Oct 15, 2018'
      ],
      datasets:  [
        {
          label: 'All Other Statuses',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'AOC Received',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Shipped',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Exception',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Exception Expired',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Cancelled',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'On Hold',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Backordered',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Returned',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Lost In Transit',
          data: [1, 2, 3, 4, 5]
        },
        {
          label: 'Rejection',
          data: [1, 2, 3, 4, 5]
        }
      ]
    }
};
