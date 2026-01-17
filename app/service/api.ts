import axios from "axios";

export const BASE_URL = "https://fakestoreapi.com";

export const apiFetch = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("API fetch failed:", error);
    throw error;
  }
};
