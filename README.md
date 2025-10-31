# 🛒 Next.js E-Commerce Project  
**Author:** Rohit kumar  
**Date:** October 31, 2025  

visit : "";

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

⚙️ Environment Variables
Create a .env.local file in the root directory with the following:

bash
Copy code
MONGODB_URI=your-mongodb-connection-string
ADMIN_KEY=your-strong-admin-key
🧠 ADMIN_KEY is required for all admin API routes (POST, PUT, DELETE).
Send it as an x-admin-key header when performing admin operations.

🧩 Rendering Strategies
Page	Type	Description
/	Static Site Generation (SSG)	Displays all products with search and price sorting handled on the client.
/products/[slug]	Incremental Static Regeneration (ISR)	Regenerates every 60s using revalidate. Shows product details dynamically.
/dashboard	Server-Side Rendering (SSR)	Always fetches the latest product list and stats for admin use.
/admin	Client-Side Rendering (CSR)	Handles CRUD operations via API routes.

🔗 API Routes
Method	Endpoint	Description	Auth Required
GET	/api/products	Fetch all products	❌
GET	/api/products/[slug]	Fetch a single product by slug	❌
POST	/api/products	Add a new product	✅ (x-admin-key)
PUT	/api/products/[slug]	Update product by slug	✅ (x-admin-key)
PUT	/api/products/id/[id]	Update product by ID	✅ (x-admin-key)
DELETE	/api/products/[slug]	Delete product by slug	✅ (x-admin-key)

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

