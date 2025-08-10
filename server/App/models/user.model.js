import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: false
  },
  referrals: {
    type: Number,
    default: 0
  },
  rewards: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)
export default userModel