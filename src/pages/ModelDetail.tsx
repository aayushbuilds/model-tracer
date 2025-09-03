import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {fetchModels} from '@/api/models';
import Header from "@/components/Header";
import ShamelessRaindropPlug from "@/components/ShamelessRaindropPlug";
import IssueForm from "@/components/IssueForm";
import IssueBreakdownChart from "@/components/IssueBreakdownChart";
import {Model, ModelProductStatusData} from "@/api/types.ts";
import {fetchReportsByModelProductStatus} from "@/api/reportsByModelProductsStatus.ts";

export default function ModelDetail() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [model, setModel] = useState<Model | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [statusData, setStatusData] = useState<Record<string, ModelProductStatusData>>({});

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
        </div>
    );
}
