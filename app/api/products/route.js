import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

// ✅ GET all products
export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

// ✅ POST new product
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    //  validation
    if (!data.name || !data.category || data.price === undefined || !data.slug || data.inventory === undefined) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create product
    const newProduct = new Product({
      name: data.name,
      category: data.category,
      price: data.price,
      slug: data.slug,
      description: data.description || "",
      inventory: data.inventory,
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error adding product:", err);
    return NextResponse.json(
      { message: "Failed to add product", error: err.message },
      { status: 500 }
    );
  }
}
