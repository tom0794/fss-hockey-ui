// src/api.ts
import axios from 'axios'

const BASE_URL = window.__RUNTIME_API_URL__ || 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true // optional: include if you’re using cookies or auth
})

// Example helper
export const endpointGet = async (endpoint: string) => {
  const res = await apiClient.get(endpoint)
  return res.data
}
