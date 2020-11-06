import { ChartColors } from '../components/chart/chart-colors';
export var IncomingAOCsChartConfig = {
    config: {
        type: 'bar',
        options: {
            layout: {
                padding: {
                    left: 10,
                    bottom: 10
                }
            },
            title: {
                display: true,
                text: 'Incoming AOCs',
                position: 'top',
                align: 'start',
                fontSize: 22
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
                backgroundColor: ChartColors.DarkGreen
            }
        ]
    },
    sampleData: {
        labels: [
            '    Sep 11 - Sep 17, 2018',
            '    Sep 18 - Sep 24, 2018',
            '    Sep 25 - Oct 1, 2018',
            '    Oct 2 - Oct 8, 2018',
            '    Oct 9 - Oct 15, 2018'
        ],
        datasets: [
            {
                data: [
                    103, 62, 54, 71, 107
                ]
            }
        ]
    }
};
//# sourceMappingURL=IncomingAOCsChartConfig.js.map