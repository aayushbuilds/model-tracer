import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchModels, Model } from '@/api/models';

const ModelsList: React.FC = () => {
  const [modelsData, setModelsData] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModels().then(data => {
      setModelsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-gray-500">Loading models...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <h2 className="text-3xl font-bold mb-6 text-black text-center" style={{ fontFamily: 'var(--font-alpha-lyrae)' }}>
        Models We Monitor
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modelsData.map((model) => (
          <Link
            key={model.id}
            to={`/model/${model.id}`}
            className="block p-4 border bg-[#FAFAFA] border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all duration-200"
          >
            <div>
              <h3 className="font-semibold text-[#7a7a7a] text-lg mb-2">{model.model}</h3>
              <div className="flex flex-wrap gap-1">
                {model.products.slice(0, 3).map((product: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-600"
                  >
                    {product}
                  </span>
                ))}
                {model.products.length > 3 && (
                  <span className="text-xs px-2 py-1 text-gray-500">
                    +{model.products.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModelsList;
