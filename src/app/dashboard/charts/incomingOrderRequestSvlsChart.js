import { ChartColors } from '../components/chart/chart-colors';
export var IncomingOrderRequestChartConfig = {
    config: {
        type: 'doughnut',
        options: {
            // maintainAspectRatio: false,
            // responsive: true,
            title: {
                display: true,
                text: 'Incoming Order Request Svls',
                fontSize: 18,
                position: 'top',
                align: 'start'
            },
            legend: {
                display: true,
                position: 'left',
                reverse: true
            }
        },
        titleCount: true,
        colors: [
            {
                backgroundColor: [ChartColors.Grey,
                    ChartColors.KnipperBlue,
                    ChartColors.Gold,
                    ChartColors.DarkGreen,
                    ChartColors.Red,
                    ChartColors.DarkOrange]
            }
        ],
    },
    sampleData: {
        labels: [
            'Awaiting Response Order Request SVLs',
            'InProcess Order Request SVLs',
            'Under Investigation Order Request SVLs',
            'Positive Response Order Request SVLs',
            'Negative Response Order Request SVLs',
            'Inconclusive Response Order Request SVLs'
        ],
        datasets: [
            {
                data: [10, 20, 31, 40, 15, 60]
            }
        ]
    },
};
//# sourceMappingURL=incomingOrderRequestSvlsChart.js.map