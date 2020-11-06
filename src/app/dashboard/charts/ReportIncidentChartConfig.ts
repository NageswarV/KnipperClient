import { ChartColors } from '../components/chart/chart-colors';

export const ReportableIncidentsChartConfig = {
  config: {
    type: 'horizontalBar',
    options: {
      title: {
        text: 'Report Incidents',
      },
      legend: {
        itemMaxWidth: 10,
        labels: {
          padding: 4,

        },
        display: false,
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
        backgroundColor: ChartColors.DarkRed
      }
    ],
    expectNumOfDataSets: 7
  },
  sampleData: {
    labels: [
     'Losses - Initial',
'Losses - Final',
 'Lost in Transit - Final',
'Lost in Transit - Total',
'Negative SVL Responses - Initial',
'Negative SVL Responses - Final',
'Recon Variance - Initial',
'Recon Variance - Final','Thefts - Initial','Thefts - Final',

    ],
    datasets: [
      {
        data: [
          27, 43, 276, 287, 231, 247, 300, 9, 11, 64
        ]
      }
    ]
  }
};
