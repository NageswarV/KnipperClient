import { ChartColors } from '../components/chart/chart-colors';

export const OrdersRejectionReasonsChartConfig = {
  config: {
    type: 'horizontalBar',
    options: {
      title: {
        align:'start',
        display: true,
        text: 'Order Rejection Status Reason Status By Rejection Date',
        fontSize: 22,
        position: 'top',
      },
      legend: {
        itemMaxWidth: 10,
        labels: {
          padding: 4,

        },
        display: true,
        position: 'bottom',
        fullWidth: false,
        align: 'start'
      },
      scales: {
        xAxes: [{
          display: false,
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          display: true,
          stacked: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    },
    yAxisCount: true,
    titleCount: true,
    colors: [
      {
        backgroundColor: ChartColors.Red
      },
      {
        backgroundColor: ChartColors.DarkOrange
      },
      {
        backgroundColor: ChartColors.Gold
      },
      {
        backgroundColor: ChartColors.Charcoal
      },
      {
        backgroundColor: ChartColors.Purple
      },
      {
        backgroundColor: ChartColors.Green
      },
      {
        backgroundColor: ChartColors.Blue
      }
    ],
    expectNumOfDataSets: 7
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
        label: 'Missing HCP KID #',
        data: [0, 0, 1, 0, 1, 3, 2, 0, 0, 0]
      },
      {
        label: 'Missing Values On Order',
        data: [0, 0, 0, 1, 2, 1, 1, 0, 0, 1]
      },
      {
        label: 'State License Number Error',
        data: [0, 0, 1, 3, 4, 2, 2, 0, 0, 2]
      },
      {
        label: 'DEA/Narcotic Number Error',
        data: [0, 0, 3, 2, 4, 2, 1, 0, 0, 1]
      },
      {
        label: 'Secondary Authorization Number Error',
        data: [0, 0, 1, 1, 1, 1, 0, 0, 0, 0]
      },
      {
        label: 'Restrictive Conditions',
        data: [0, 0, 4, 0, 1, 0, 2, 0, 0, 0]
      }
    ]
  }
};
