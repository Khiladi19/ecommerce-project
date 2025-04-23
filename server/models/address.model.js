import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  pincode: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: Date.now,
  },
});

export const Address = mongoose.model("Address", addressSchema);
