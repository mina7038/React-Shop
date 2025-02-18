import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <Link to={`/products/${product.id}`} className="text-decoration-none text-dark">
          <img
            src={product.img}
            alt={product.name}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text fw-bold">{product.price.toLocaleString()}원</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
