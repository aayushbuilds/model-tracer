import {ReportsByModelProductResponse, ReportSummary} from '@/api/types';

export async function fetchReportsByModelProduct(modelId: number, product: string): Promise<ReportSummary[]> {
    const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

    if (!token) {
        console.error('token not found in environment variables');
        return [];
    }

    try {
        const response = await fetch(
            `https://api.us-east.aws.tinybird.co/v0/pipes/reports_model_product.json?token=${token}&model_id=${modelId}&product=${encodeURIComponent(product)}`
        );

        if (!response.ok) {
            console.error('HTTP error! status: ', response.status);
            return []
        }

        const data: ReportsByModelProductResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching reports by model and product:', error);
        return []
    }
}
