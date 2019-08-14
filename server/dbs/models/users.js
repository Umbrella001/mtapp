/**
 * descripe: 创建mongoose数据库模型面板,并配置必须的库类型
 * author: umbrella
 * date: 2018-6-28PM16:42:26
 * -------------------说明------------------
 * --导入所需的moogoose模型包
 * --定义Schema模型,每一个schema对应一个mongoDB collection 并且在那个collection里面定义了documents的模型
 * --填写模型所需要的表结构
 * --导出mongoose模型UserSchema
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
})

export default mongoose.model('User',UserSchema)