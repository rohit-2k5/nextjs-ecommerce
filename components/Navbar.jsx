'use client'
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 shadow-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          QuickCart
        </Link>
        <div className="flex gap-6 text-gray-700">
          <Link href="/" className="hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">Home</Link>
          <Link href="/dashboard" className="hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">Dashboard</Link>
          <Link href="/admin" className="hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
