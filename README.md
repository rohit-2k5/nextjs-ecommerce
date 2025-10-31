# 🛒 Next.js E-Commerce Project  
**Author:** Rohit kumar  
**Date:** October 31, 2025  

visit : "https://nextjs-ecommerce-mjxw.vercel.app/";

A modern full-stack **E-Commerce Web Application** built using **Next.js (App Router)**, **MongoDB**, and **Tailwind CSS**.  
It demonstrates product listing, filtering, search, sorting, and an admin dashboard for product management (CRUD).  

---

## 🚀 Getting Started

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Run the development server
bash
Copy code
npm run dev
Then open your browser at 👉 http://localhost:3000

🧩 Rendering Strategies
Page	Type	Description
/	Static Site Generation (SSG)	Displays all products with search and price sorting handled on the client.
/products/[slug]	Incremental Static Regeneration (ISR)	Regenerates every 60s using revalidate. Shows product details dynamically.
/dashboard	Server-Side Rendering (SSR)	Always fetches the latest product list and stats for admin use.
/admin	Client-Side Rendering (CSR)	Handles CRUD operations via API routes.


🧱 Data Model
json
Copy code
{
  "_id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": 0,
  "category": "string",
  "inventory": 0,
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
🗄️ Tech Stack
Frontend: Next.js 15 (App Router) + Tailwind CSS

Backend: Next.js API Routes + Mongoose

Database: MongoDB (Atlas)

Styling: Tailwind CSS

Runtime: Node.js 20+

🧠 Features
✅ Product listing with client-side filtering and sorting
✅ Dynamic product detail pages (ISR)
✅ Admin dashboard for product management (CRUD)
✅ Secure admin routes using x-admin-key
✅ MongoDB integration with Mongoose
✅ Fully responsive layout using Tailwind


---

