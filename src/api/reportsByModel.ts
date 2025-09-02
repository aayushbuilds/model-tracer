import { ReportsByModelResponse, ReportSummary } from '@/api/types';

export async function fetchReportsByModel(modelId: number): Promise<ReportSummary[]> {
  const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

  if (!token) {
    console.error('token not found in environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `http://localhost:7181/v0/pipes/reports_model.json?token=${token}&model_id=${modelId}`
    );

    if (!response.ok) {
      console.error('HTTP error! status: ', response.status);
      return []
    }

    const data: ReportsByModelResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching reports by model:', error);
    return [];
  }
}
