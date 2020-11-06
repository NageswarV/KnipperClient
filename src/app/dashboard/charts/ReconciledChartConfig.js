import { ChartColors } from '../components/chart/chart-colors';
export var ReconciledChartConfig = {
    config: {
        type: 'bar',
        options: {
            title: {
                display: false,
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
        colors: [
            {
                backgroundColor: ChartColors.Red
            },
            {
                backgroundColor: ChartColors.KnipperBlue
            }
        ],
        expectNumOfDataSets: 2
    },
    sampleData: {
        labels: [
            'Q1',
            'Q2',
            'Q3',
            'Q4'
        ],
        datasets: [
            {
                label: 'UnReconciled',
                data: [2, 3, 5, 1, 1]
            },
            {
                label: 'Reconciled',
                data: [13, 10, 6, 9, 5]
            }
        ]
    }
};
//# sourceMappingURL=ReconciledChartConfig.js.map