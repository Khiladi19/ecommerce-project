import {Order} from "../models/order.model.js";


// createOrder or save mongodb

// export const createOrder = async (req, res) => {
//   try {
//     const { cartItems, shippingAddress, paymentId, amount } = req.body;
//     const userId = req.user.id;
//     const order = new Order({
//       user: userId,
//       cartItems,
//       shippingAddress,
//       amount,
//       paymentId,
//       isPaid: true,
//     });

//     await order.save();
//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ msg: "Order creation failed", error: err.message });
//   }
// };

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean()
      .exec(); // <-- makes it faster and cleaner
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Fetching orders failed", error: err.message });
  }
};
