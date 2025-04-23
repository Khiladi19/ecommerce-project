import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProceedToPay = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(address).some((v) => !v);
    if (isEmpty) {
      toast.error("Please fill in all fields");
      return;
    }

    localStorage.setItem("shippingAddress", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🏠 Shipping Address</h2>
      <form onSubmit={handleProceedToPay} className="space-y-4">
        <input name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="addressLine" placeholder="Address Line" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="city" placeholder="City" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="state" placeholder="State" onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Proceed to Pay
        </button>
      </form>
    </div>
  );
}
