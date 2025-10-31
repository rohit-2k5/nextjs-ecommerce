'use client'
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    slug: "",
    description: "",
    inventory: "",
  });
  const [editingSlug, setEditingSlug] = useState(null);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.slug || form.inventory === "") {
      alert("Please fill all required fields");
      return;
    }

    const isEditing = Boolean(editingSlug);

    const res = await fetch(isEditing ? `/api/products/${editingSlug}` : "/api/products", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        inventory: Number(form.inventory),
      }),
    });

    if (res.ok) {
      alert(isEditing ? "✅ Product updated successfully!" : "✅ Product added successfully!");
      setForm({ name: "", category: "", price: "", slug: "", description: "", inventory: "" });
      setEditingSlug(null);
      fetchProducts();
    } else {
      const err = await res.json().catch(()=>({message:'Failed'}));
      alert((isEditing ? "❌ Failed to update product" : "❌ Failed to add product") + (err?.message ? `: ${err.message}` : ""));
    }
  }

  function startEdit(product) {
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: String(product.price ?? ""),
      slug: product.slug || "",
      description: product.description || "",
      inventory: String(product.inventory ?? ""),
    });
    setEditingSlug(product.slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm({ name: "", category: "", price: "", slug: "", description: "", inventory: "" });
  }

  async function deleteProduct(slug) {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;
    const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
    if (res.ok) {
      alert("🗑️ Product deleted");
      if (editingSlug === slug) cancelEdit();
      fetchProducts();
    } else {
      const err = await res.json().catch(()=>({message:'Failed'}));
      alert("❌ Failed to delete product" + (err?.message ? `: ${err.message}` : ""));
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Panel</h1>

      {/* No admin key required */}

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">{editingSlug ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 shadow-sm" />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 shadow-sm" />
          <input type="number" name="price" placeholder="Price (₹)" value={form.price} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 shadow-sm" />
          <input type="number" name="inventory" placeholder="Inventory" value={form.inventory} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 shadow-sm" />
          <input type="text" name="slug" placeholder="Slug (unique ID)" value={form.slug} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 shadow-sm" />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 col-span-full shadow-sm" />
          <div className="col-span-full flex gap-3">
            <button type="submit" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
              {editingSlug ? "Update Product" : "Add Product"}
            </button>
            {editingSlug && (
              <button type="button" onClick={cancelEdit} className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition border border-gray-200">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 border border-gray-200">Name</th>
              <th className="p-3 border border-gray-200">Category</th>
              <th className="p-3 border border-gray-200">Price</th>
              <th className="p-3 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="odd:bg-white even:bg-gray-50">
                <td className="p-3 border border-gray-200">{p.name}</td>
                <td className="p-3 border border-gray-200">{p.category}</td>
                <td className="p-3 border border-gray-200">₹{p.price}</td>
                <td className="p-3 border border-gray-200 text-center space-x-2">
                  <button onClick={() => startEdit(p)} className="bg-amber-500 text-white px-3 py-1.5 rounded hover:bg-amber-600 transition">Edit</button>
                  <button onClick={() => deleteProduct(p.slug)} className="bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
