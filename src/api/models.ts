import {Model, TinybirdResponse} from "@/api/types.ts";


export async function fetchModels(): Promise<Model[]> {
  const token = import.meta.env.VITE_TB_LOCAL_TOKEN;

  if (!token) {
    console.error('TB_LOCAL_TOKEN not found in environment variables');
    return [];
  }

  try {
    const response = await fetch(
      `http://localhost:7181/v0/pipes/get_models.json?token=${token}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TinybirdResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}
