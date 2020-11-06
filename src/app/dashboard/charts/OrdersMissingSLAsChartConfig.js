import { ChartColors } from '../components/chart/chart-colors';
export var OrdersMissingSLAsChartConfig = {
    config: {
        type: 'bar',
        options: {
            layout: {
                padding: {
                    left: 20,
                    bottom: 20
                }
            },
            title: {
                text: 'Dashboard.Charts.Orders.MissingSla'
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                        display: true
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        },
        xAxisCount: true,
        titleCount: true,
        colors: [
            {
                backgroundColor: [
                    ChartColors.Yellow, ChartColors.Red
                ]
            }
        ]
    },
    sampleData: {
        labels: [
            '     Within 4 Hrs Of SLA',
            '     Past SLA'
        ],
        datasets: [
            {
                data: [
                    73, 20
                ]
            }
        ]
    }
};
//# sourceMappingURL=OrdersMissingSLAsChartConfig.js.map