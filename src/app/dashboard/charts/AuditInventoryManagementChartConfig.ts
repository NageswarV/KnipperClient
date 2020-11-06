import { ChartColors } from '../components/chart/chart-colors';

export const AuditInventoryManagementChartConfig = {
  config: {
    type: 'doughnut',
    options: {
      // maintainAspectRatio: false,
      // responsive: true,
      title: {
        display: false,
        text: 'Incoming Order Request Svls',
        fontSize: 18,
        position: 'top',
        align: 'start'
      },
      legend: {
        display: true,
        position: 'bottom',
        reverse: false
      }

    },
    titleCount: true,
    colors: [
      {
        backgroundColor: [ChartColors.Green,
        ChartColors.KnipperBlue,
        ChartColors.Grey,
        ChartColors.Yellow,
        ChartColors.DarkRed
        ]
      }
    ],
  },
  sampleData: {
    labels: [
      'Accepted',
      'Scheduled',
      'Closed',
      'Pending',
      'Scheduled Difficulty',
    ],
    datasets: [
      {
        data: [10, 20, 31, 40, 15]
      }]
  },
};
