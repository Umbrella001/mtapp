import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
    name: {
        type: String   // 景点名称
    },
    province: {
        type: String   // 景点所在省份
    },
    city: {
        type: String   // 景点所在城市
    },
    county: {
        type: String   // 景点所在市级
    },
    areaCode: {
        type: String   // 景点所在区域代码
    },
    tel: {
        type: String   // 景点联系电话
    },
    area: {
        type: String   // 景点区域名称
    },
    addr: {
        type: String   // 景点具体地址
    },
    type: {
        type: String   // 景点类型名
    },
    module: {
        type: String   // 景点具体详情
    },
    longtide:{
        type: Number   // 景点经度
    },
    latitude:{
        type: Number   // 景点纬度
    }
})

export default mongoose.model('Poi', Poi)
