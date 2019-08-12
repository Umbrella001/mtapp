import axios from 'axios'

// 配置接口
const instance = axios.create({
    baseURL: `http://${process.env.HOST||'loclhost'}:${process.env.PORT||3000}`,   // 配置基础url
    timeout: 1000,
    headers:{

    }
})

export default instance