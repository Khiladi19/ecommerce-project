import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/slices/productThunk";
import { toast } from "react-toastify";

const EditProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ ...product });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product._id, productData: form }));
    toast.success("Product Update Successfully")
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      {["title", "description", "price", "qty", "catagory", "imgSrc"].map((field) => (
        <div className="mb-2" key={field}>
          <label>{field.toUpperCase()}</label>
          <input
            type="text"
            className="form-control"
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button className="btn btn-success me-2" type="submit">Update</button>
      <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditProductForm;
