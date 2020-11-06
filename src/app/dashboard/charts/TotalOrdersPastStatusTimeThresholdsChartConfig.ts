import { ChartColors } from '../components/chart/chart-colors';

export const TotalOrdersPastStatusTimeThresholdsChartConfig = {
  config: {
    type: 'horizontalBar',
      options: {
        layout: { padding: 18},
        title: {
          text: 'Dashboard.Charts.Orders.PastThresholds'
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
            display: true
          }]
        }
    },
    yAxisCount: true,
    titleCount: true,
    colors:  [
      {
        backgroundColor: ChartColors.Red
      }
    ]
  },
  sampleData: {
    labels: [
      'New',
      'Data Entry Audit',
      'In Process',
      'Pass Validation',
      'Queued for WMS',
      'Ready For Shipment',
      'Potential Lost In Transit',
      'System Error'
    ],
    datasets: [
      {
        data: [
          3, 35, 0, 0, 35, 3, 0, 1
        ]
      }
    ]
  }
};
