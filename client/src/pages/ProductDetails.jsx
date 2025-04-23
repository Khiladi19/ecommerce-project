import { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

import {
  fetchSingleProduct,
  fetchRelatedProducts,
} from "../redux/slices/productThunk";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleProduct, loading, error, relatedProducts } = useSelector(
    (state) => state.products
  );
  const product = singleProduct?.product;

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (product?.catagory) {
      dispatch(fetchRelatedProducts(product.catagory));
    }
  }, [product, dispatch]);

  if (loading) return <Spinner />;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-6 text-center">No product found.</div>;

  const { title, price, description, imgSrc, _id } = product;

  // ✅ Add to Cart handler
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: _id,
        title,
        price,
        qty: 1,
        imgSrc,
      })
    );

    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 1500,
    });
  
    // Redirect after short delay
    setTimeout(() => {
      navigate("/cart");
    }, 1600);

  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Product Display */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <img
          src={imgSrc}
          alt={title || "Product Image"}
          className="w-full md:w-1/2 h-80 object-contain rounded shadow-md"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-extrabold">{title}</h2>
          <p className="text-2xl text-green-600 font-semibold">₹{price}</p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts
            .filter((item) => item._id !== product._id)
            .map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="border p-2 rounded shadow hover:shadow-lg transition block"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="h-40 w-full object-contain mb-2"
                />
                <p className="font-bold">{item.title}</p>
                <p className="text-green-600">₹{item.price}</p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

