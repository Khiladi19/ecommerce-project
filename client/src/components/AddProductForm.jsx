import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/slices/productThunk";
import { toast } from "react-toastify";
const AddProductForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    qty: "",
    catagory: "",
    imgSrc: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(form));
    toast.success("Product Added Successfully")
    setForm({ title: "", description: "", price: "", qty: "", catagory: "", imgSrc: "" });
  };

  return (
    <div className="container mt-4">
      <h4>Add Product</h4>
      <form onSubmit={handleSubmit}>
        {["title", "description", "price", "qty", "catagory", "imgSrc"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.toUpperCase()}</label>
            <input
              type="text"
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary" type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProductForm;

