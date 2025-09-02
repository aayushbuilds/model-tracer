import { ReportsByProductResponse, ReportSummary } from '@/api/types';

export async function fetchReportsByProduct(product: string): Promise<ReportSummary[]> {
  const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

  if (!token) {
    console.error('token not found in environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `http://localhost:7181/v0/pipes/reports_product.json?token=${token}&product=${encodeURIComponent(product)}`
    );

    if (!response.ok) {
      console.error('HTTP error! status: ', response.status);
      return []
    }

    const data: ReportsByProductResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching reports by product:', error);
    return [];
  }
}
