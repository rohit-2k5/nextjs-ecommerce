import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export async function PUT(request, { params }) {
  const resolved = await params;
  const { id } = resolved;

  await connectDB();
  const data = await request.json();

  const update = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.category !== undefined) update.category = data.category;
  if (data.price !== undefined) update.price = data.price;
  if (data.description !== undefined) update.description = data.description;
  if (data.inventory !== undefined) update.inventory = data.inventory;
  if (data.slug !== undefined) update.slug = data.slug;

  const updated = await Product.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  if (!updated) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product updated", product: updated });
}



