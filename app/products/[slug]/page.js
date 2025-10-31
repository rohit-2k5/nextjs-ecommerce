import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export const revalidate = 60;

async function getProduct(slug) {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export async function generateStaticParams() {
  await connectDB();
  const products = await Product.find({}, "slug").lean();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center items-center py-14 px-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full max-w-3xl p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image */}
          <div className="flex-1 bg-gray-100 h-64 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
            <span className="text-gray-400 text-sm tracking-wide">Product</span>
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 mb-2">{product.category}</p>
            <p className="text-indigo-600 text-2xl font-semibold mb-4">
              ₹{product.price}
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {product.description || "This product has no description yet."}
            </p>

            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition text-sm w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-10 border-gray-200" />

        {/* Extra Info */}
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>
            Last updated:{" "}
            <strong>
              {new Date(product.lastUpdated).toLocaleDateString()}
            </strong>
          </span>
          <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            ← Back to Products
          </a>
        </div>
      </div>
    </main>
  );
}
