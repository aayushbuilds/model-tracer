import {ReportData} from "@/api/types.ts";


function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function sendReport(data: ReportData): Promise<boolean> {
  const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

  if (!token) {
    console.error('token not found in environment variables');
    return false;
  }

  const payload = {
    timestamp: new Date().toISOString(),
    session_id: generateSessionId(),
    model_id: data.model_id.toString(),
    model_name: data.model_name,
    product: data.product,
    issue: data.issue,
    purpose: data.purpose
  };

  try {
    const response = await fetch('http://localhost:7181/v0/events?name=reports', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('HTTP error! status: ', response.status);
      return false
    }

    return true;
  } catch (error) {
    console.error('Error sending report:', error);
    return false;
  }
}
