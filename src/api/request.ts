import axios, { type Method } from 'axios'
export const baseUrl = 'https://www.kedazhny.com/api/smoker/'
//@ts-ignore
import JSONbig from "json-bigint";

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: baseUrl,
  timeout: 10000,
  transformResponse: [
    function (data) {
      // 对 data 进行任意转换处理
      try {
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
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