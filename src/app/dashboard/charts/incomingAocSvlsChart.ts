import { ChartColors } from '../components/chart/chart-colors';

export const IncomingAocSvlsChartConfig = {
  config: {
    type: 'doughnut',
    options: {
      //maintainAspectRatio: false,
      //responsive: true,
      title: {
        display: true,
        text: 'Incoming AOC Svls',
        fontSize: 18,
        position: 'top',
        align:'start'
      },
      legend: {
        display: true,
        position: 'left',
        reverse: true
      }
    },
    titleCount: true,
    colors: [
      {
        backgroundColor: [ChartColors.Grey,
        ChartColors.KnipperBlue,
        ChartColors.Gold,
        ChartColors.DarkGreen,
        ChartColors.Red,
        ChartColors.DarkOrange]
      }
    ],
  },
  styling: {
    borderWidth:10
  },
  sampleData: {
    labels: [
      'Awaiting Response Order Request SVLs',
      'InProcess Order Request SVLs',
      'Under Investigation Order Request SVLs',
      'Positive Response Order Request SVLs',
      'Negative Response Order Request SVLs',
      'Inconclusive Response Order Request SVLs'
    ],
    datasets: [
      {
        data: [10, 20, 31, 40, 15, 60]
      }]
  },
};
