import { ChartColors } from '../components/chart/chart-colors';
export var OutGoingRejectionChartConfig = {
    config: {
        type: 'bar',
        options: {
            title: {
                display: true,
                text: 'Outgoing Rejection Letters',
                position: 'top',
                fontSize: 22,
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
        colors: [
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
            'Sep 11 - Sep 17, 2018',
            'Sep 18 - Sep 24, 2018',
            'Sep 25 - Oct 1, 2018',
            'Oct 2 - Oct 8, 2018',
            'Oct 9 - Oct 15, 2018',
        ],
        datasets: [
            {
                label: 'Sent',
                data: [37, 16, 52, 197, 165]
            },
            {
                label: 'Non-Delivered',
                data: [5, 0, 2, 32, 3]
            }
        ]
    }
};
//# sourceMappingURL=OutGoingRejectionsChartConfig.js.map