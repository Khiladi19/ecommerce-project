// import { Payment } from "../models/payment.model.js";
// import Razorpay from "razorpay";
// import dotenv from 'dotenv'
// dotenv.config()

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// import Razorpay from "razorpay";
// import crypto from "crypto";

// 🔐 Initialize Razorpay instance
// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });



// checkout
// export const checkout = async (req, res) => {
//   const { amount, cartItems, userShipping, userId } = req.body;
//   try {
//     let options = {
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(201).json({
//       orderId: order.id,
//       amount: amount,
//       cartItems,
//       userShipping,
//       userId,
//       payStatus: "created",
//     });
//   } catch (error) {
//     console.log("Error fetchin in payment controllers", error);
//   }
// };

// verify-payment
// export const verify = async (req, res) => {
//   const {
//     orderId,
//     paymentId,
//     signature,
//     amount,
//     orderItems,
//     userId,
//     userShipping,
//   } = req.body;
//   // const secret = razorpay.key_secret;
//   // const body = orderId + "|" + paymentId;

//   // save to db
//   let orderConfirm = await Payment.create({
//     orderId,
//     paymentId,
//     signature,
//     amount,
//     orderItems,
//     userId,
//     userShipping,
//     payStatus:"paid"
//   });

// res.status(201).json({
//   sucess:true,
//   message:"payment sucessfully",
//   orderConfirm
// })

// };

// user specifiorder
// export const userOrder = async(req,res)=>{
//   let userId = req.user._id.toString();
  
//   let orders = await Payment.find({userId}).sort({orderDate :-1});
//   res.status(201).json({
//     sucess:true,
//     message:"Order Sucessfully",
//     orders
//   })
// }
// user specifiorder
// export const allOrder = async(req,res)=>{
   
//   let orders = await Payment.find().sort({orderDate :-1});
//   res.status(201).json({
//     sucess:true,
//     message:"All Order",
//     orders
//   })
// }


import Razorpay from 'razorpay';
import crypto from 'crypto';
import {Order} from '../models/order.model.js';
import dotenv from 'dotenv'
dotenv.config()

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;
  // console.log("Body :-",req.body)
  // console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
  // console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);
  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }
  // console.log("Received amount:", amount, typeof amount);

  try {
    const options = {
      amount:  Math.round(amount * 100), // in paise
      currency: "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`
    };
    const order = await instance.orders.create(options);
    res.status(201).json({order});
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Order creation failed", error: error.message });

  }
};

// export const verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     cartItems,
//     address,
//     amount
//   } = req.body;

//   // console.log("body :-", req.body)



//   // console.log("Verifying with:", {
//   //   razorpay_order_id,
//   //   razorpay_payment_id,
//   //   razorpay_signature
//   // });
  

//   const sign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   if (sign === razorpay_signature) {
//     await Order.create({
//       user: req.user._id,
//       cartItems,
//       shippingAddress: address,
//       paymentInfo: {
//         id: razorpay_payment_id,
//         status: "Paid"
//       },
//       totalAmount: amount
//     });
//     res.status(200).json({ success: true });
//   } else {
//     res.status(400).json({ success: false, message: "Invalid signature" });
//   }
// };

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      cartItems,
      address,
      amount,
    } = req.body;

    // Signature verification
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Save order to MongoDB
    const newOrder = new Order({
      user: req.user._id, // assuming you're using auth middleware
      cartItems,
      shippingAddress: address,
      amount,
      paymentId: razorpay_payment_id,
      isPaid: true,
      paidAt: new Date(),
    });
    
    const savedOrder = await newOrder.save();

    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};






