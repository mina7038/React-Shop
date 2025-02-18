import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    const updatedCart = existing
      ? cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("장바구니에 담겼습니다!");
    navigate("/cart");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <img
              src={`/${product.img}`}
              alt={product.name}
              className="card-img-top"
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="card-body text-center">
              <h3 className="card-title">{product.name}</h3>
              <p className="card-text fs-5 fw-bold">{product.price.toLocaleString()}원</p>
              <button className="btn btn-primary mt-3" onClick={addToCart}>
                장바구니 담기 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
