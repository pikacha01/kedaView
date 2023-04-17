import axios, { type Method } from 'axios'
export const baseUrl = 'https://zhuyiyun.com/api/smoker/'
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: baseUrl,
  timeout: 10000
})

instance.interceptors.response.use(
  (res) => {
    // 摘取核心响应数据
    return res.data
  }
)

type Data<T> = T

export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

export default request