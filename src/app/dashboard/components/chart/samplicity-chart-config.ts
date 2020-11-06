
export interface ISamplicityChartConfig {
    type: string;
    options?: any;
    colors?: any[];
    xAxisCount?: boolean;
    yAxisCount?: boolean;
    legendCount?: boolean;
    titleCount?: boolean;
    expectNumOfDataSets: number;
    stacks: string[];
}
