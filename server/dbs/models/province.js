/**
 * descripe: 创建mongoose数据库模型面板,并配置必须的库类型
 * author: umbrella
 * date: 2018-6-29PM13:33:21
 * -------------------说明------------------
 * --导入所需的moogoose模型包
 * --定义Schema模型,每一个schema对应一个mongoDB collection 并且在那个collection里面定义了documents的模型
 * --填写模型所需要的表结构字段
 * --导出mongoose模型Province
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Province = new Schema({
    id:{
        type: String,
        require: true
    },
    value:{
        type: Array,
        required: true
    }
})

export default mongoose.model('Province',Province)