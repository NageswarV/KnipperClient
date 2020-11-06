import { ChartColors } from '../components/chart/chart-colors';

export const MonthlyOrdersByStatusChartConfig = {
  config: {
      type: 'horizontalBar',
      options: {
        responsive: true,
        title: {
          display:true,
          text: 'Dashboard.Charts.Orders.MonthlyStatus'
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
          backgroundColor: [
              ChartColors.Blue, ChartColors.Blue, ChartColors.Blue, ChartColors.Yellow, ChartColors.Red,
              ChartColors.Red, ChartColors.Yellow, ChartColors.Blue, ChartColors.Blue, ChartColors.Yellow,
              ChartColors.Blue, ChartColors.Red, ChartColors.Blue, ChartColors.Blue, ChartColors.Blue,
              ChartColors.Blue, ChartColors.Blue, ChartColors.Yellow, ChartColors.Red, ChartColors.Red,
              ChartColors.Yellow, ChartColors.Red
          ]
        }
      ]
    },
    sampleData: {
        labels: [
            'Pending Data Entry', 'New', 'In Process', 'Exception', 'Exception Expired',
            'Rejection', 'On Hold', 'Pass Validation', 'Split Order', 'Backordered',
            'Select Day Verification', 'Canceled', 'Queued for WMS', 'Ready For Shipment', 'Shipped',
            'Delivered', 'AOC Received', 'Potential Lost In Transit', 'Lost In Transit', 'Lost in Transit - Partial',
            'Returned', 'System Error'
          ],
        datasets: [
            {
                data: [
                    231, 67, 317, 242, 12,
                    85, 134, 92, 147, 231,
                    161, 189, 267, 243, 267,
                    204, 98, 56, 27, 130
                ]
            }
        ]
    }
};
