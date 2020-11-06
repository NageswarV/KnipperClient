import { ChartColors } from '../components/chart/chart-colors';
export var OrdersReceivedChartConfig = {
    config: {
        type: 'horizontalBar',
        options: {
            title: {
                display: true,
                text: 'Orders Received By Date',
                fontSize: 22,
                position: 'top',
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
        colors: [
            {
                backgroundColor: ChartColors.Blue
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
                    0, 0, 217, 231, 276, 297, 264, 0, 0, 107
                ]
            }
        ]
    }
};
//# sourceMappingURL=OrdersReceivedChartConfig.js.map