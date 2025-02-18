import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function MainPage() {
  const latest = products.slice(0, 3); // 최근 3개 상품

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-3">뷰티 쇼핑몰</h1>
      <p className="text-center text-muted">당신만을 위한 뷰티 셀렉션</p>

      <h2 className="mt-5 mb-4">✨ 최신 상품</h2>

      <div className="row">
        {latest.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <Link to={`/products/${p.id}`} className="text-decoration-none text-dark">
                <img
                  src={p.img}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text fw-bold">{p.price.toLocaleString()}원</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end mt-3">
        <Link to="/products" className="btn btn-outline-primary">
          전체 상품 보기 →
        </Link>
      </div>
    </div>
  );
}
