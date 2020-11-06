import { ChartColors } from '../components/chart/chart-colors';
export var WeeklyAODTrackingConfig = {
    config: {
        type: 'bar',
        options: {
            title: {
                display: true,
                text: 'Weekly AOD Tracking',
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
                        stacked: true
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
        legendCount: true,
        colors: [
            {
                backgroundColor: ChartColors.Grey
            },
            {
                backgroundColor: ChartColors.Blue
            },
            {
                backgroundColor: ChartColors.Green
            },
            {
                backgroundColor: ChartColors.DarkGreen
            },
        ],
        expectNumOfDataSets: 3
    },
    sampleData: {
        labels: [
            '  Sep 11 - Sep 17, 2018',
            '  Sep 18 - Sep 24, 2018',
            '  Sep 25 - Oct 1, 2018',
            '  Oct 2 - Oct 8, 2018',
            '  Oct 9 - Oct 15, 2018',
            '  Oct 16 - Oct 22, 2018'
        ],
        datasets: [
            {
                label: 'Delivered',
                data: [1, 2, 3, 4, 5]
            },
            {
                label: 'Potential Lost In Transit',
                data: [1, 2, 3, 4, 5]
            },
            {
                label: 'Lost in Transit (Some or all containers lost in transit)',
                data: [1, 2, 3, 4, 5]
            }
        ]
    }
};
//# sourceMappingURL=WeeklyAODTracking.js.map