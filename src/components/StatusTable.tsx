import React, {useState, useEffect} from 'react';
import Table, {ColumnConfig} from './Table';
import {fetchReportsDailySummary} from '../api/reportsDailySummary';
import {DailySummaryData} from '../api/types';

interface StatusTableProps {
    items?: DailySummaryData[];
}

const StatusTable: React.FC<StatusTableProps> = ({items = []}) => {
    const [data, setData] = useState<DailySummaryData[]>(items);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const summaryData = await fetchReportsDailySummary();
                setData(summaryData);
            } catch (err) {
                setError('Failed to load reports data');
                console.error('Error loading reports data:', err);
            } finally {
                setLoading(false);
            }
        };

        void loadData();
    }, []);

    const columns: ColumnConfig<DailySummaryData>[] = [
        {
            key: 'model_name',
            label: 'Model Name',
            width: '30%'
        },
        {
            key: 'product',
            label: 'Product',
            width: '25%'
        },
        {
            key: 'issue',
            label: 'Issue',
            width: '25%'
        },
        {
            key: 'report_count',
            label: 'Reports',
            width: '20%',
            sortable: true
        }
    ];

    if (loading) {
        return (
            <div className="relative w-full overflow-hidden bg-[#fafafb] rounded-2xl border border-gray-200 px-2 pb-2">
                <div className="p-8 text-center text-gray-500">
                    Loading reports data...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative w-full overflow-hidden bg-[#fafafb] rounded-2xl border border-gray-200 px-2 pb-2">
                <div className="p-8 text-center text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    return <Table columns={columns} data={data}/>;
};

export default StatusTable;
