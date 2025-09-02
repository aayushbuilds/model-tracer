import { ReportsByIssueResponse, ReportSummary } from '@/api/types';

export async function fetchReportsByIssue(issue: string): Promise<ReportSummary[]> {
  const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

  if (!token) {
    console.error('TB_LOCAL_TOKEN not found in environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `http://localhost:7181/v0/pipes/reports_issue.json?token=${token}&issue=${encodeURIComponent(issue)}`
    );

    if (!response.ok) {
      console.error('HTTP error! status: ', response.status);
      return []
    }

    const data: ReportsByIssueResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching reports by issue:', error);
    return [];
  }
}
