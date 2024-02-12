import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:4000',
})

export class HttpService {
  async get<T>(url: string) {
    const response = await api.get<T>(url)
    return response.data
  }
  async post<T>(url: string, data: any) {
    const response = await api.post<T>(url, data)
    return response.data
  }
  async put<T>(url: string, data: any) {
    const response = await api.put<T>(url, data)
    return response.data
  }
  async delete<T>(url: string) {
    const response = await api.delete<T>(url)
    return response.data
  }
}

export const apiService = new HttpService()