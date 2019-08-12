/**
 * 创建mongoose数据库模型面板,并配置必须的库类型
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const UserScheme = new Schema({
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