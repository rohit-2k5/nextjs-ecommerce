import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export const dynamic = "force-dynamic"; // always fetch fresh data

async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find().lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("❌ Error fetching products from DB:", error.message);
    return [];
  }
}

export default async function DashboardPage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Inventory Dashboard
        </h1>
        <p className="text-gray-500">No products found or failed to load.</p>
      </main>
    );
  }

  const totalProducts = products.length;
  const lowStockThreshold = 5;
  const lowStockCount = products.filter(
    (p) => (p.inventory ?? 0) <= lowStockThreshold
  ).length;
  const totalInventory = products.reduce(
    (sum, p) => sum + (p.inventory ?? 0),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Inventory Dashboard
      </h1>

      {/* Summary cards */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-5 text-center">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">
            {totalProducts}
          </p>
        </div>
        <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-5 text-center">
          <p className="text-sm text-gray-500">
            Low Stock (≤ {lowStockThreshold})
          </p>
          <p className="text-3xl font-semibold text-amber-600 mt-1">
            {lowStockCount}
          </p>
        </div>
        <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-5 text-center">
          <p className="text-sm text-gray-500">Total Inventory</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">
            {totalInventory}
          </p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 max-w-5xl mx-auto overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Current Stock
        </h2>

        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border border-gray-200">Name</th>
              <th className="p-3 border border-gray-200">Category</th>
              <th className="p-3 border border-gray-200">Inventory</th>
              <th className="p-3 border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const inventory = p.inventory ?? 0;
              const isLow = inventory <= lowStockThreshold;
              return (
                <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-3 border border-gray-200">{p.name}</td>
                  <td className="p-3 border border-gray-200">{p.category}</td>
                  <td className="p-3 border border-gray-200">{inventory}</td>
                  <td className="p-3 border border-gray-200">
                    <span
                      className={`px-2 py-1 rounded text-sm border ${
                        isLow
                          ? "text-amber-700 bg-amber-50 border-amber-200"
                          : "text-green-700 bg-green-50 border-green-200"
                      }`}
                    >
                      {isLow ? "Low" : "OK"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
