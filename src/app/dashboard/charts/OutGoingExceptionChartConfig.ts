import { ChartColors } from '../components/chart/chart-colors';

export const OutGoingExceptionChartConfig = {
    config: {
      type: 'bar',
      options: {
        title: {
          display:true,
          text: 'Outgoing Exception Letters',
          position: 'top',
          fontSize: 22,
          align:'start'
        },
        legend: {
          display: true,
          position: 'bottom',
          reverse: true
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
        }
      },
      xAxisCount: true,
      titleCount: true,
      colors:  [
        {
          backgroundColor: ChartColors.KnipperBlue
        },
        {
          backgroundColor: ChartColors.Red
        }
      ],
      expectNumOfDataSets: 2
    },
    sampleData: {
      labels: [
        '   Sep 11 - Sep 17, 2018',
        '   Sep 18 - Sep 24, 2018',
        '   Sep 25 - Oct 1, 2018',
        '   Oct 2 - Oct 8, 2018',
        '   Oct 9 - Oct 15, 2018',
      ],
      datasets: [
        {
          label: 'Sent',
          data: [42, 37, 66, 51, 48]
        },
        {
          label: 'Non-Delivered',
          data: [5, 14, 20, 27, 8]
        }
      ]
    }
};
