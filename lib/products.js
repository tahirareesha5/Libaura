import { products } from "@/data/products";

export function getCategories() {
  return [...new Set(products.map((product) => product.category))];
}

export function getDiscountedPrice(product) {
  if (!product.discount) {
    return product.price;
  }

  return Number((product.price * (1 - product.discount / 100)).toFixed(2));
}

export function getFeaturedProducts(limit = 8) {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function getRelatedProducts(product, limit = 4) {
  return products
    .filter(
      (candidate) =>
        candidate.category === product.category && candidate.id !== product.id
    )
    .slice(0, limit);
}

export function getProductsMaxPrice() {
  return Math.max(...products.map((product) => getDiscountedPrice(product)));
}
