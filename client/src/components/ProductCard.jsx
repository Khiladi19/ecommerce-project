import { Link } from "react-router-dom";
// import { addToCart } from "../redux/slices/cartSlice";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify"

const ProductCard = ({ product }) => (
  <Link to={`/product/${product._id}`} className="w-full">
    <div className="bg-white dark:bg-white-100 text-black dark:text-black items-center shadow-md rounded-xl overflow-hidden flex flex-col transition-transform hover:scale-105 duration-200">
      <img
        src={product.imgSrc || "https://via.placeholder.com/300x200"}
        alt={product.title}
        className="w-full h-48 object-contain p-2 mx-auto"
      />
      <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
      <div className="flex gap-3 mt-auto mb-5">
        <span className="bg-blue-500 px-3 py-1 rounded text-white font-semibold">
          ₹{product.price}
        </span>
        {/* <button
          className="bg-yellow-400 px-3 py-1 rounded font-semibold text-black hover:bg-yellow-500 transition"
          onClick={(e) => {
            e.preventDefault(); // prevent navigation when clicking the button
            // handleAddToCart(product); // Uncomment and implement this function
          }}
        >
          AddToCart
        </button> */}
      </div>
    </div>
  </Link>
);

export default ProductCard;

  
  