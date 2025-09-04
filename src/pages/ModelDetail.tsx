import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {fetchModels} from '@/api/models';
import Header from "@/components/Header";
import ShamelessRaindropPlug from "@/components/ShamelessRaindropPlug";
import IssueForm from "@/components/IssueForm";
import IssueBreakdownChart from "@/components/IssueBreakdownChart";
import {Model, ModelProductStatusData, ProductWeekData} from "@/api/types.ts";
import {fetchReportsByModelProductStatus} from "@/api/reportsByModelProductsStatus.ts";
import {fetchReportsModelProductWeek} from "@/api/reportsModelProductWeek.ts";
import {LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

export default function ModelDetail() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [model, setModel] = useState<Model | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [statusData, setStatusData] = useState<Record<string, ModelProductStatusData>>({});
    const [weeklyData, setWeeklyData] = useState<ProductWeekData[]>([]);

    const getStatusIndicator = (product: string) => {
        const status = statusData[product];
        if (!status) return;
        const isAboveAverage = status.is_above_average === 1;

        return (
            <div className="inline-flex items-center ml-2">
                <span
                    className={`w-2 h-2 rounded-full ${isAboveAverage ? 'bg-[#b84630]' : 'bg-[#8ec75b]'}`}
                />
            </div>
        );
    };

    const prepareChartData = () => {
        if (!weeklyData || weeklyData.length === 0) return [];

        const hoursInWeek = 168;
        const chartData = [];
        const today = new Date();

        for (let i = 0; i < hoursInWeek; i++) {
            const daysAgo = Math.floor(i / 24);
            const date = new Date(today);
            date.setDate(today.getDate() - (6 - daysAgo)); // Start from 6 days ago to today

            const dataPoint: any = {
                hour: i,
                label: i % 24 === 0
                    ? date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
                    : `${i % 24}h`
            };

            weeklyData.forEach(product => {
                dataPoint[product.product] = product.hourly_counts[i] || 0;
            });

            chartData.push(dataPoint);
        }

        return chartData;
    };

    const colors = [
        '#0D6B9C',
        '#fc7016',
        '#522078',
        '#8ec75b',
        '#aae0ee',
        '#eb5252'
    ];

    useEffect(() => {
        const loadModel = async () => {
            const modelId = parseInt(id || '');
            const modelsData = await fetchModels();

            const foundModel = modelsData.find(m => m.id === modelId);
            if (!foundModel) {
                navigate('/');
                return;
            }

            setModel(foundModel);
            setLoading(false);
        };

        void loadModel();
    }, [id, navigate]);

    useEffect(() => {
        if (!model) return;

        const fetchModelStatus = async () => {
            const statusResults: Record<string, ModelProductStatusData> = {};

            const data = await fetchReportsByModelProductStatus(model.id);
            data.forEach(item => {
                statusResults[item.product] = item;
            });

            setStatusData(statusResults);
        };

        void fetchModelStatus();
    }, [model?.id]);

    useEffect(() => {
        if (!model) return;

        const fetchWeeklyData = async () => {
            const data = await fetchReportsModelProductWeek(model.id);
            setWeeklyData(data);
        };

        void fetchWeeklyData();
    }, [model?.id]);


    if (loading) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <p className="text-gray-500">Loading model details...</p>
            </div>
        );
    }


    if (!model) {
        return null;
    }


    return (
        <div className="min-h-screen p-8">
            <Header/>
            <ShamelessRaindropPlug/>
            <h1 className="text-4xl font-bold mb-4">{model.model}</h1>
            <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                    {model && model.products.map((product, index) => (
                        <span
                            key={index}
                            className="px-5 py-1 border-[#7a7a7a] border-2 bg-[#e3e4e8] rounded-3xl text-gray-700 inline-flex items-center"
                        >
                            {product}
                            {getStatusIndicator(product)}
                        </span>
                    ))}
                </div>
            </div>
            <div className=" mt-2 flex flex-row align-top gap-8">
                <div className="w-[70%]">
                    <IssueForm products={model.products} modelId={model.id} modelName={model.model}/>
                </div>
                <div className="w-[40%]">
                    <IssueBreakdownChart
                        modelId={model.id}
                        products={model.products}
                    />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl  mb-4">WEEKLY TREND</h2>
                {weeklyData.length > 0 ? (
                    <div className="p-6">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={prepareChartData()} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                                <XAxis
                                    dataKey="label"
                                    interval={23}
                                    tick={{fontSize: 12}}
                                    stroke="#666"
                                />
                                <Tooltip
                                    formatter={(value: number) => value}
                                    labelFormatter={(label) => `Hour: ${label}`}
                                    contentStyle={{backgroundColor: '#fff', border: '1px solid #e0e0e0'}}
                                />
                                <Legend
                                    wrapperStyle={{paddingTop: '20px'}}
                                    iconType="line"
                                />
                                {weeklyData.map((product, index) => (
                                    <Line
                                        key={product.product}
                                        type="monotone"
                                        dataKey={product.product}
                                        stroke={colors[index]}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{r: 4}}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-gray-500 text-center py-10">
                        No weekly data available
                    </div>
                )}
            </div>
        </div>
    );
}
