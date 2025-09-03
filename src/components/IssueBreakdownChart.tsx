import {useState, useEffect, useMemo, useCallback} from 'react';
import {fetchReportsByModel} from '@/api/reportsByModel';
import {fetchReportsByModelProduct} from '@/api/reportsByModelProduct';
import {ReportSummary} from '@/api/types';
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';
import {percentOfTotal} from '@/utils';
import TabsSlider from '@/components/TabsSlider';

const COLORS = ['#0D6B9C', '#aae0ee', '#fc7016', '#fbc171', '#eb5252', '#522078', '#ff7c7c'];

interface IssueBreakdownChartProps {
    modelId: number;
    products: string[];
}

type ReportByProduct = {
    [key: string]: ReportSummary[]
};

const ChartContent = ({data}: { data: ReportSummary }) => {
    const issueData = useMemo(() => {
        const items = [
            {issue: 'Hallucinations', count: percentOfTotal(data.hallucinations, data.total_reports)},
            {issue: 'Biases', count: percentOfTotal(data.biases, data.total_reports)},
            {issue: 'Wrong Outputs', count: percentOfTotal(data.wrong_outputs, data.total_reports)},
            {issue: 'Unsafe', count: percentOfTotal(data.unsafes, data.total_reports)},
            {issue: 'Overconfidence', count: percentOfTotal(data.overconfidences, data.total_reports)},
            {issue: 'Not Responding', count: percentOfTotal(data.model_not_responding, data.total_reports)},
        ];
        return items.filter(item => item.count > 0);
    }, [data]);

    if (issueData.length === 0) {
        return (
            <div className="text-gray-500 text-center mt-10">
                No issues reported yet
            </div>
        );
    }

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={issueData}
                        dataKey="count"
                        nameKey="issue"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                    >
                        {issueData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`}/>
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 text-sm text-gray-600">
                Total Reports: {data.total_reports} | Unique Sessions: {data.unique_sessions || 0}
            </div>
        </>
    );
};

export default function IssueBreakdownChart({modelId, products}: IssueBreakdownChartProps) {
    const [selectedProduct, setSelectedProduct] = useState<string>('all');
    const [reportData, setReportData] = useState<ReportByProduct>({});
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [initialLoading, setInitialLoading] = useState(true);

    const tabOptions = useMemo(() => [
        {value: 'all', label: 'All'},
        ...products.map(product => ({value: product, label: product}))
    ], [products]);

    useEffect(() => {
        const fetchAllData = async () => {
            setInitialLoading(true);
            const fetchPromises: Promise<void>[] = [];
            const newLoadingStates: Record<string, boolean> = {};

            newLoadingStates['all'] = true;
            fetchPromises.push(
                fetchReportsByModel(modelId).then(reportsData => {
                    setReportData(prev => ({...prev, all: reportsData}));
                    setLoadingStates(prev => ({...prev, all: false}));
                })
            );

            products.forEach(product => {
                newLoadingStates[product] = true;
                fetchPromises.push(
                    fetchReportsByModelProduct(modelId, product).then(reportsData => {
                        setReportData(prev => ({...prev, [product]: reportsData}));
                        setLoadingStates(prev => ({...prev, [product]: false}));
                    })
                );
            });

            setLoadingStates(newLoadingStates);

            await Promise.all(fetchPromises);
            setInitialLoading(false);
        };

        void fetchAllData();
    }, [modelId, products]);

    const handleTabChange = useCallback((value: string) => {
        setSelectedProduct(value);
    }, []);

    const currentData = reportData[selectedProduct];
    const isLoading = loadingStates[selectedProduct] || initialLoading;

    if (isLoading) {
        return (
            <div className="text-gray-500 text-center mt-10">
                Loading chart data...
            </div>
        );
    }

    return (
        <>
            <TabsSlider
                options={tabOptions}
                value={selectedProduct}
                onChange={handleTabChange}
            />

            {currentData && currentData.length > 0 && currentData[0].total_reports > 0 ? (
                <ChartContent data={currentData[0]}/>
            ) : (
                <div className="text-gray-500 text-center mt-20">
                    No issue data available yet
                </div>
            )}
        </>
    );
}
