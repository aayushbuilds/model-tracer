import {ReportsModelProductWeekResponse, ProductWeekData} from '@/api/types';

export async function fetchReportsModelProductWeek(modelId: number): Promise<ProductWeekData[]> {
    const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

    try {
        const response = await fetch(
            `https://api.us-east.aws.tinybird.co/v0/pipes/reports_model_product_week.json?token=${token}&model_id=${modelId}`
        );

        if (!response.ok) {
            console.error('HTTP error! status: ', response.status);
            return [];
        }

        const data: ReportsModelProductWeekResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching reports model product week:', error);
        return [];
    }
}
