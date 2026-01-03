import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3000/api";

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function getData<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const { data } = await client.get<T>(endpoint, config);
  return data;
}

export async function postData<TResponse, TBody>(
  endpoint: string,
  body?: TBody,
  config?: AxiosRequestConfig
): Promise<TResponse> {
  const { data } = await client.post<TResponse>(endpoint, body, config);
  return data;
}
