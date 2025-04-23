// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../redux/slices/productSlice";
// import ProductCard from "../components/ProductCard";

// export default function Products() {
//   const dispatch = useDispatch();

//   const { items = {}, loading, error } = useSelector((state) => state.products);
//   const products = items.products || [];

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>

//       {loading && (
//         <div className="text-center">
//           <p>Loading...</p>
//         </div>
//       )}

//       {error && (
//         <p className="text-center text-red-500">
//           {error}
//         </p>
//       )}

//       {!loading && products.length === 0 && (
//         <p className="text-center text-gray-500">No products available.</p>
//       )}

//       {!loading && products.length > 0 && (
//         <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/slices/productThunk";
import Spinner from "../components/Spinner";

export default function Products() {
  const dispatch = useDispatch();
  const { items, loading, error, token } = useSelector((state) => state.products);
  const products = items.products || [];

  const [search, setSearch] = useState("");
  const [catagory, setCatagory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts({ search, catagory, minPrice, maxPrice }));
  }, [search, catagory, minPrice, maxPrice, token]);

  const categories = ["Phones", "Laptops", "Accessories", "Electronics"];

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">All Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2 rounded-md"
          value={catagory}
          onChange={(e) => setCatagory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min ₹"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2 rounded-md w-24"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max ₹"
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white px-3 py-2 rounded-md w-24"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Products */}
      {loading ? (
        <>
          <p className="text-center mb-3">Loading...</p>
          <Spinner />
        </>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}




