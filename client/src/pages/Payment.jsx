import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = "/payment";
const RAZORPAY_KEY_ID = "rzp_test_cIzGMKNJEco16I";

export default function Payment() {
  const hasRun = useRef(false);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const totalAmount = Math.round(subtotal + tax);
  const address = JSON.parse(localStorage.getItem("shippingAddress"));

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      setLoading(false);
      navigate("/");
      return;
    }

    if (!address) {
      toast.error("Shipping address not found");
      setLoading(false);
      navigate("/shipping");
      return;
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/create-order`, {
        amount: totalAmount,
      });

      const order = data.order;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "A.K.Kumar",
        description: "Thanks for shopping",
        order_id: order.id,
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          try {
            const { data } = await axios.post(`${BASE_URL}/verify-payment`, {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              cartItems,
              address,
              amount: totalAmount,
            });


            // console.log("order frontend :- ",data)

            if (data.success) {
              toast.success("Payment Successful & Order Placed!");
              dispatch(clearCart());
              localStorage.removeItem("shippingAddress");
              navigate("/success")
              setTimeout(() => {
                navigate("/orders");
              }, 1500);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error.response?.data || error.message);
            toast.error("Something went wrong during verification.");
          }
        },
        prefill: {
          name: address.fullName,
          email: "abhishek@example.com",
          contact: address.phone,
        },
        notes: {
          address: `${address.addressLine}, ${address.city}`,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      setLoading(false); // Hide loader when payment popup opens
      paymentObject.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Order creation failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      handlePayment();
      hasRun.current = true;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {loading ? (
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto animate-spin border-t-blue-500"></div>
          <h2 className="text-xl font-bold">Redirecting to Razorpay...</h2>
        </div>
      ) : (
        <h2 className="text-xl font-bold">Payment Popup Opened</h2>
      )}
    </div>
  );
}



