import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import ProductListClient from "@/components/ProductListClient";

export const dynamic = "force-static";

export default async function HomePage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
      <ProductListClient products={JSON.parse(JSON.stringify(products))} />
    </main>
  );
}
