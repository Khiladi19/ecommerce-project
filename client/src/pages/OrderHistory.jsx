import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrders, fetchMyOrders } from "../redux/slices/orderSlice";
import Spinner from "../components/Spinner";

export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    dispatch(clearOrders());
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const statusSteps = [
    "Ordered",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status || "Packed");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">📦 My Orders</h2>
      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && orders.length === 0 && (
        <p className="text-center text-gray-500">
          🛒 No orders placed yet. Place your first order!
        </p>
      )}
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg mb-6 p-4 bg-white shadow-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <p>
                <strong>🆔 Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>💰 Total:</strong> ₹{order.amount}
              </p>
              <p>
                <strong>✅ Paid:</strong> Success
              </p>
            </div>
            <button
              onClick={() => toggleOrder(order._id)}
              className="text-blue-600 hover:underline text-sm"
            >
              {expandedOrders[order._id] ? "Hide Details" : "View Details"}
            </button>
          </div>

          {expandedOrders[order._id] && (
            <div className="mt-4 text-sm text-gray-700 border-t pt-3 space-y-3">
              <div>
                <strong>📋 Items:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {order.cartItems.map((item, i) => (
                    <li key={i}>
                      {item.title}
                      <h3>qty:- {item.qty}</h3>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong>📍 Shipping Address:</strong>
                <p>{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.phone}</p>
                <p>{`${order.shippingAddress?.addressLine}, ${order.shippingAddress?.city}`}</p>
              </div>

              {/* 🚚 Shipment Timeline */}
              <div className="bg-gray-100 rounded-md p-4 mt-4">
                <p className="font-semibold text-blue-700 mb-3">
                  🚚 Shipment Tracking
                </p>
                <div className="flex flex-col space-y-2">
                  {statusSteps.map((step, i) => (
                    <div key={i} className="flex items-start">
                      <div
                        className={`h-4 w-4 mt-1 mr-2 rounded-full ${
                          i <= getStatusIndex(order.status)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <p
                        className={`${
                          i <= getStatusIndex(order.status)
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  📆 Est. Delivery:{" "}
                  {order.expectedDeliveryDate
                    ? new Date(order.expectedDeliveryDate).toLocaleDateString()
                    : "3–5 business days"}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
