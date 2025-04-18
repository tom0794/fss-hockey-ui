// src/api.ts
import axios from 'axios'

const BASE_URL = (window.__RUNTIME_API_URL__ !== '{{BACKEND_URL}}' && window.__RUNTIME_API_URL__) || 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const endpointGet = async (endpoint: string) => {
  const res = await apiClient.get(endpoint)
  return res.data
}

export const fetchSchedule = async (date: string) => {
  const res = await apiClient.get(`/schedule/getGamesOnDate/${date}`)
  return res.data
}
