import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modelsData } from '@/data/modelsData';
import Header from "@/components/Header";
import ShamelessRaindropPlug from "@/components/ShamelessRaindropPlug";
import IssueForm from "@/components/IssueForm";

export default function ModelDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const model = modelsData.find(m => m.id === parseInt(id || ''));

    React.useEffect(() => {
        if (!model) {
            navigate('/');
        }
    }, [model, navigate]);

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
                    {model.products.map((product, index) => (
                        <span
                            key={index}
                            className="px-5 py-1 border-[#7a7a7a] border-2 bg-[#e3e4e8] rounded-3xl text-gray-700"
                        >
                            {product}
                        </span>))}
                </div>
            </div>
            <IssueForm products={model.products} />
        </div>
    );
}