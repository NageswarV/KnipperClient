import { ChartColors } from '../components/chart/chart-colors';

export const OutGoingSRFsChartConfig = {
    config: {
      type: 'bar',
      options: {
        title: {
          display:true,
          text: 'Outgoing SRFs',
          fontSize: 22,
          position: 'top',
          align: 'start'
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
          data: [13, 10, 6, 9, 5]
        },
        {
          label: 'Non-Delivered',
          data: [2, 3, 5, 1, 1]
        }
      ]
    }
};
