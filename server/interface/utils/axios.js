/**
 * descripe: 封装前后端通信axios配置
 * author: umbrella
 * date: 018-6-28PM17:24:28
 * ---------------说明----------------
 * --导入所需的axios包,创建axios实例
 * --配置基础的URL,请求超时timeout,及公共头部headers
 * --参考文档：http://www.axios-js.com/docs/#Creating-an-instance
 * --导出该axios接口实例instance
 */
import axios from 'axios'

const instance = axios.create({
    baseURL: `http://${process.env.HOST||'loclhost'}:${process.env.PORT||3000}`,
    timeout: 5000,
    headers:{}
})

export default instance