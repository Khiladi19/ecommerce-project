import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  catagory: { type: String, require: true },
  qty: { type: Number, require: true },
  imgSrc: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
});
export const Product = mongoose.model("Product", productSchema);
