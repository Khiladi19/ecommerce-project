// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   cartItems: [
//     {
//       name: String,
//       quantity: Number,
//       price: Number,
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
//     }
//   ],
//   shippingAddress: {
//     fullName: String,
//     phone: String,
//     addressLine: String,
//     city: String
//   },
//   paymentInfo: {
//     id: String,
//     status: String
//   },
//   totalAmount: Number,
//   createdAt: { type: Date, default: Date.now }
// });

// export const Order =  mongoose.model('Order', orderSchema);

// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     cartItems: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         title: String,
//         qty: Number,
//         price: Number,
//         imgSrc: String,
//       },
//     ],
//     shippingAddress: {
//       fullName: String,
//       phone: String,
//       addressLine: String,
//       city: String,
//       pincode: String,
//       state: String,
//     },
//     amount: Number,
//     paymentId: String,
//     isPaid: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// export const Order =  mongoose.model("Order", orderSchema);



import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        title: String,
        qty: Number,
        imgSrc: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine: String,
      city: String,
      pincode: String,
      state: String,
    },
    paymentId: String,
    amount: Number,
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
