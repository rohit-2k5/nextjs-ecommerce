'use client'
import Link from "next/link"

export default function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl w-64 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center hover:-translate-y-0.5">
      
      {/* Image Placeholder */}
      <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center border border-dashed border-gray-200">
        <span className="text-gray-400 text-sm tracking-wide">Product</span>
      </div>

      {/* Product Info */}
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-1 truncate w-full">
        {product.name}
      </h2>
      <p className="text-gray-500 text-sm mb-1">{product.category}</p>
      <p className="text-indigo-600 font-semibold text-base mb-4">₹{product.price}</p>

      {/* Button */}
      <Link
        href={`/products/${product.slug}`}
        className="w-full text-center bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        View Details
      </Link>
    </div>
  );
}
