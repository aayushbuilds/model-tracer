import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchModels } from '@/api/models';
import { fetchReportsByModel } from '@/api/reportsByModel';
import Header from "@/components/Header";
import ShamelessRaindropPlug from "@/components/ShamelessRaindropPlug";
import IssueForm from "@/components/IssueForm";
import {Model, ReportSummary} from "@/api/types.ts";
import { PieChart, Pie, Cell,  Tooltip,  ResponsiveContainer } from 'recharts';

const COLORS = ['#0D6B9C', '#aae0ee', '#fc7016', '#fbc171', '#eb5252', '#522078', '#ff7c7c'];

export default function ModelDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [model, setModel] = useState<Model | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState<ReportSummary[]>([]);

    useEffect(() => {
        const modelId = parseInt(id || '');

        Promise.all([
            fetchModels(),
            fetchReportsByModel(modelId)
        ]).then(([modelsData, reportsData]) => {
            const foundModel = modelsData.find(m => m.id === modelId);
            if (!foundModel) {
                navigate('/');
            } else {
                setModel(foundModel);
                setReportData(reportsData);
            }
            setLoading(false);
        });
    }, [id, navigate]);

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
            <Header />
            <ShamelessRaindropPlug />
            <h1 className="text-4xl font-bold mb-4">{model.model}</h1>
            <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                    {model && model.products.map((product, index) => (
                        <span
                            key={index}
                            className="px-5 py-1 border-[#7a7a7a] border-2 bg-[#e3e4e8] rounded-3xl text-gray-700"
                        >
                            {product}
                        </span>))}
                </div>
            </div>
            <div className=" mt-2 flex flex-row align-top gap-8">
                <div className="w-[70%]">
                    <IssueForm products={model.products} modelId={model.id} modelName={model.model} />
                </div>
                <div className="w-[40%]">
                    {reportData.length > 0 && reportData[0].total_reports > 0 ? (
                        <div>
                            {(() => {
                                const data = reportData[0];
                                const issueData = [
                                    { issue: 'Hallucinations', count: data.hallucinations || 0 },
                                    { issue: 'Biases', count: data.biases || 0 },
                                    { issue: 'Wrong Outputs', count: data.wrong_outputs || 0 },
                                    { issue: 'Unsafe', count: data.unsafes || 0 },
                                    { issue: 'Overconfidence', count: data.overconfidences || 0 },
                                    { issue: 'Not Responding', count: data.model_not_responding || 0 }
                                ].filter(item => item.count > 0);

                                return (
                                    <>
                                        {issueData.length > 0 ? (
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
                                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                        </Pie>
                                                        <Tooltip />
                                                    </PieChart>
                                                </ResponsiveContainer>

                                                <div className="mt-4 text-sm text-gray-600">
                                                    Total Reports: {data.total_reports} | Unique Sessions: {data.unique_sessions || 0}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-gray-500 text-center mt-10">
                                                No issues reported yet
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-center mt-20">
                            No issue data available yet
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
