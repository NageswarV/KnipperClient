import { ChartColors } from '../components/chart/chart-colors';
export var OrdersRejectedChartConfig = {
    config: {
        type: 'horizontalBar',
        options: {
            title: {
                text: 'Dashboard.Charts.Events.Rejected'
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
        colors: [
            {
                backgroundColor: [ChartColors.Pink, ChartColors.Red, ChartColors.Pink, ChartColors.Red, ChartColors.Pink,
                    ChartColors.Red, ChartColors.Pink, ChartColors.Red, ChartColors.Pink, ChartColors.Red, ChartColors.Pink,
                    ChartColors.Red, ChartColors.Pink, ChartColors.Red,]
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
                data: [
                    0, 0, 16, 20, 7, 5, 4, 0, 0, 1
                ]
            }
        ]
    }
};
//# sourceMappingURL=OrdersRejectedChartConfig.js.map