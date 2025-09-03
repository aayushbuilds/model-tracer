import {ReportsDailySummaryResponse, DailySummaryData} from '@/api/types';

export async function fetchReportsDailySummary(): Promise<DailySummaryData[]> {
    const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

    if (!token) {
        console.error('token not found in environment variables');
        return [];
    }

    try {
        const response = await fetch(
            `https://api.us-east.aws.tinybird.co/v0/pipes/reports_daily_summary.json?token=${token}`
        );

        if (!response.ok) {
            console.error('HTTP error! status: ', response.status);
            return []
        }

        const data: ReportsDailySummaryResponse = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching reports daily summary:', error);
        return [];
    }
}