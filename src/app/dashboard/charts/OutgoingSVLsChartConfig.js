import { ChartColors } from '../components/chart/chart-colors';
export var OutgoingSVLsChartConfig = {
    config: {
        type: 'bar',
        options: {
            title: {
                display: true,
                text: 'Outgoing SVLs',
                fontSize: 22,
                position: 'top',
                align: 'start'
            },
            legend: {
                display: true,
                position: 'bottom',
                reverse: true,
                fullWidth: false
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
        titleCount: true,
        legendCount: true,
        colors: [
            {
                backgroundColor: ChartColors.KnipperBlue,
            },
            {
                backgroundColor: ChartColors.Yellow,
            },
            {
                backgroundColor: ChartColors.DarkGreen,
            },
            {
                backgroundColor: ChartColors.Red,
            }
        ],
        expectNumOfDataSets: 2,
        stacks: [
            'order-svl',
            'aoc-svl'
        ]
    },
    sampleData: {
        labels: [
            'Aug 2018',
            'Sep 2018',
            'Oct 2018'
        ],
        datasets: [
            {
                label: 'Sent Order Request SVLs',
                stack: 'order-svl',
                data: [10, 12, 13]
            },
            {
                label: 'Non-Delivered Order Request SVLs',
                stack: 'order-svl',
                data: [1, 2, 1]
            },
            {
                label: 'Sent AOC SVLs',
                stack: 'aoc-svl',
                data: [6, 8, 7]
            },
            {
                label: 'Non-Delivered AOC SVLs',
                stack: 'aoc-svl',
                data: [5, 5, 5]
            }
        ]
    }
};
//# sourceMappingURL=OutgoingSVLsChartConfig.js.map