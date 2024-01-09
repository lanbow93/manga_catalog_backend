import mongoose from '../config/database.js'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    displayName: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    verificationToken: String,
    isVerified: { type: Boolean, default: false, required: true },
    isAdult: { type: Boolean, default: false },
    resetToken: String,
    resetTokenExpiry: Date
  },
  { timestamps: true }
)

const User = model('User', userSchema)

export default User
