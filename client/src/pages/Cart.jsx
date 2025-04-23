// Cart.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  decreaseQty,
  clearCart,
  increaseQty,
} from "../redux/slices/cartSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
// import { NavLink } from "react-router-dom";
import { Link } from "react-router";


export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.error("Item removed from cart", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQty({ productId: id, qty: 1 }));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQty({ productId: id, qty: 1 }));
  };

  const handleClear = () => {
    const confirmClear = window.confirm("Are you sure you want to clear the cart?");
    if (confirmClear) {
      dispatch(clearCart());
      toast.error("Cart has been cleared!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

   // Razorpay Checkout Handler
  const handleCheckout = async () => {
    const res = await fetch("http://localhost:2000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }), // Pass the total amount from the cart
    });
    const order = await res.json();

    const options = {
      key: "rzp_test_cIzGMKNJEco16I", // Replace with your Razorpay key
      amount: order.amount,
      currency: "INR",
      name: "Your Store",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert(`Payment successful! Razorpay ID: ${response.razorpay_payment_id}`);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.productId}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p>Qty: {item.qty}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleDecrease(item.productId)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrease(item.productId)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Summary Section */}
          <div className="mt-8 p-4 border rounded shadow-sm bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <button
                onClick={handleClear}
                className="bg-red-600 text-white px-6 py-2 rounded"
              >
                Clear Cart
              </button>
              <Link to="/checkout"
              //  onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCart,
//   removeFromCart,
//   decreaseQty,
//   clearCart,
//   increaseQty,
// } from "../redux/slices/cartSlice";
// import Spinner from "../components/Spinner";
// import { toast } from "react-toastify";

// export default function Cart() {
//   const dispatch = useDispatch();
//   const { cartItems, loading } = useSelector((state) => state.cart);
//   const [totalAmount, setTotalAmount] = useState(0);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   useEffect(() => {
//     if (cartItems.length > 0) {
//       const amount = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
//       setTotalAmount(amount);
//     }
//   }, [cartItems]);

//   const handleRemove = (id) => {
//     dispatch(removeFromCart(id));
//     toast.error("Item removed from cart", {
//       position: "top-right",
//       autoClose: 1500,
//     });
//   };

//   const handleDecrease = (id) => {
//     dispatch(decreaseQty({ productId: id, qty: 1 }));
//   };

//   const handleIncrease = (id) => {
//     dispatch(increaseQty({ productId: id, qty: 1 }));
//   };

//   const handleClear = () => {
//     const confirmClear = window.confirm("Are you sure you want to clear the cart?");
//     if (confirmClear) {
//       dispatch(clearCart());
//       toast.error("Cart has been cleared!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   // Razorpay Checkout Handler
//   const handleCheckout = async () => {
//     const res = await fetch("http://localhost:2000/api/payment/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: totalAmount }), // Pass the total amount from the cart
//     });
//     const order = await res.json();

//     const options = {
//       key: "rzp_test_cIzGMKNJEco16I", // Replace with your Razorpay key
//       amount: order.amount,
//       currency: "INR",
//       name: "Your Store",
//       description: "Test Transaction",
//       order_id: order.id,
//       handler: function (response) {
//         alert(`Payment successful! Razorpay ID: ${response.razorpay_payment_id}`);
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   if (loading) return <Spinner />;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cartItems.map((item) => (
//               <li key={item.productId} className="flex items-center justify-between border-b pb-2">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.imgSrc}
//                     alt={item.title}
//                     className="w-20 h-20 object-contain"
//                   />
//                   <div>
//                     <h4 className="font-bold">{item.title}</h4>
//                     <p>Qty: {item.qty}</p>
//                     <p>₹{item.price}</p>
//                   </div>
//                 </div>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => handleDecrease(item.productId)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     -
//                   </button>
//                   <button
//                     onClick={() => handleIncrease(item.productId)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => handleRemove(item.productId)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between items-center mt-6">
//             <div>
//               <h3 className="font-bold text-lg">Total: ₹{totalAmount}</h3>
//             </div>
//             <div>
//               <button
//                 onClick={handleCheckout}
//                 className="bg-blue-600 text-white px-6 py-2 rounded"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>

//           <button
//             onClick={handleClear}
//             className="mt-6 bg-red-600 text-white px-6 py-2 rounded"
//           >
//             Clear Cart
//           </button>
//         </>
//       )}
//     </div>
//   );
// }



