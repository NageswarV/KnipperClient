import { ChartColors } from '../components/chart/chart-colors';
export var RepSamplingActivitiesChartConfig = {
    config: {
        type: 'horizontalBar',
        options: {
            title: {
                text: 'Report Incidents',
            },
            legend: {
                itemMaxWidth: 10,
                labels: {
                    padding: 4,
                },
                display: false,
                position: 'bottom',
                fullWidth: false,
                align: 'start'
            },
            scales: {
                xAxes: [{
                        display: false,
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                yAxes: [{
                        display: true,
                        stacked: true,
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
                backgroundColor: ChartColors.KnipperBlue
            },
            {
                backgroundColor: ChartColors.Blue
            }
        ],
        expectNumOfDataSets: 7
    },
    sampleData: {
        labels: [
            'Adjustments',
            'Disbursements',
            'Inventory',
            'Losses',
            'Returns',
            'Return Acknowledgement',
            'Shipments',
            'Shipment Acknowledgement', 'Thefts', 'Transfer-In', 'Transfer-Out',
        ],
        datasets: [
            {
                data: [
                    27, 43, 276, 287, 231, 247, 300, 9, 11, 64
                ]
            }
        ]
    }
};
//# sourceMappingURL=RepSamplingActivitiesChartConfig.js.map