import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

export default function ProductList() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">📦 전체 상품 목록</h2>
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
