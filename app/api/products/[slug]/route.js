import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";

export async function GET(request, { params }) {
  // ✅ Await params before using it in Next.js 15/16
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  await connectDB();

  const product = await Product.findOne({ slug });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  await connectDB();

  const data = await request.json();

  // Only allow known fields to be updated
  const update = {};
  if (data.name !== undefined) update.name = data.name;
  if (data.category !== undefined) update.category = data.category;
  if (data.price !== undefined) update.price = data.price;
  if (data.description !== undefined) update.description = data.description;
  if (data.inventory !== undefined) update.inventory = data.inventory;
  // Prevent slug changes via this endpoint to keep URL stable

  const updated = await Product.findOneAndUpdate({ slug }, update, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product updated", product: updated });
}

export async function DELETE(request, { params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  await connectDB();

  const deleted = await Product.findOneAndDelete({ slug });
  if (!deleted) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted" });
}