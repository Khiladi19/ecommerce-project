import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    unique: true,
    required: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  isAdmin: {
    type: Boolean,
    default: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

export const User = mongoose.model('User', userSchema);


