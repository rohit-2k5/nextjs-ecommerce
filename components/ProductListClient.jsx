'use client'
import { useMemo, useState } from 'react'
import ProductCard from '@/components/ProductCard'

export default function ProductListClient({ products }){
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')

  const filtered = useMemo(() => {
    let list = products || []
    const s = search.trim().toLowerCase()
    if (s) {
      list = list.filter(p => (p.name || '').toLowerCase().includes(s) || (p.category || '').toLowerCase().includes(s))
    }
    if (sort === 'low-to-high') list = [...list].sort((a,b)=> (a.price||0)-(b.price||0))
    if (sort === 'high-to-low') list = [...list].sort((a,b)=> (b.price||0)-(a.price||0))
    return list
  }, [products, search, sort])

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          type="text"
          placeholder="Search by name or category"
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
        />
        <select
          value={sort}
          onChange={e=>setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
        >
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low → High</option>
          <option value="high-to-low">High → Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}



