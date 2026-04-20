import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/product/product-detail-client";
import { getProductById, getRelatedProducts } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name}`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
