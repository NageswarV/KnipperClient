import { ChartColors } from '../components/chart/chart-colors';

export const OrdersShippedChartConfig = {
    config: {
    type: 'horizontalBar',
      options: {
        title: {
          display:true,
          text: 'Orders Shipped By Date',
          position: 'top',
          fontSize: 22,
          align: 'start'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      yAxisCount: true,
      titleCount: true,
      colors:  [
        {
          backgroundColor: [ChartColors.Blue,ChartColors.KnipperBlue,ChartColors.Blue,ChartColors.KnipperBlue,ChartColors.Blue,ChartColors.KnipperBlue,
            ChartColors.Blue,ChartColors.KnipperBlue,ChartColors.Blue,ChartColors.KnipperBlue,ChartColors.Blue,ChartColors.KnipperBlue,ChartColors.Blue,ChartColors.KnipperBlue]
        }
      ]
    },
    sampleData: {
      labels: [
        'Oct 6, 2018',
        'Oct 7, 2018',
        'Oct 8, 2018',
        'Oct 9, 2018',
        'Oct 10, 2018',
        'Oct 11, 2018',
        'Oct 12, 2018',
        'Oct 13, 2018',
        'Oct 14, 2018',
        'Oct 15, 2018'
      ],
      datasets: [
        {
          data:  [
            0, 0, 276, 287, 231, 247, 300, 0, 0, 64
          ]
        }
      ]
    }
};
