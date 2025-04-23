import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/slices/productThunk";
import EditProductForm from "./EditProductForm";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const products = items.products || []
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h4>Product List</h4>
      {products.map((product) => (
        <div key={product._id} className="card mb-3">
          <div className="card-body">
            {editId === product._id ? (
              <EditProductForm
                product={product}
                onClose={() => setEditId(null)}
              />
            ) : (
              <>
                <h5 className="card-title">{product.title}</h5>
                <p>{product.description}</p>
                <p>Price: ₹{product.price}</p>
                <p>Qty: {product.qty}</p>
                <p>Category: {product.catagory}</p>
                <button className="btn btn-warning me-2" onClick={() => setEditId(product._id)}>Edit</button>
                <button className="btn btn-danger" onClick={() => dispatch(deleteProduct(product._id))}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
