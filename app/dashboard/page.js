import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProducts() {
  const res = await fetch("`${process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL + '/api/products' : '/api/products'", { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function DashboardPage() {
  const products = await getProducts();

  const totalProducts = products.length;
  const lowStockThreshold = 5;
  const lowStockCount = products.filter((p) => (p.inventory ?? 0) <= lowStockThreshold).length;
  const totalInventory = products.reduce((sum, p) => sum + (p.inventory ?? 0), 0);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Inventory Dashboard</h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">{totalProducts}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">Low Stock (≤ {lowStockThreshold})</p>
          <p className="text-3xl font-semibold text-amber-600 mt-1">{lowStockCount}</p>
        </div>
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-500">Total Inventory</p>
          <p className="text-3xl font-semibold text-indigo-600 mt-1">{totalInventory}</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Current Stock</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left">
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
                      <span className={isLow ? "text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded text-sm" : "text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded text-sm"}>
                        {isLow ? "Low" : "OK"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
