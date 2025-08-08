# React 쇼핑몰 만들기 정리

## ✅ 구현 범위 요약

| 페이지 | 주요 기능 |
| --- | --- |
| `/` | 메인페이지 |
| `/products` | 상품 전체 목록 조회 |
| `/product/:id` | 상품 상세 보기 + 장바구니 담기 |
| `/cart` | 장바구니 페이지 |

---

## 📁 기본 폴더 구조

```
/src
 ├── /components
 │    ├── Header.js
 │    └── ProductCard.js
 ├── /pages
 │    ├── MainPage.js
 │    ├── ProductList.js
 │    ├── ProductDetail.js
 │    └── Cart.js
 ├── /data
 │    └── Product.json
 ├── App.js            
 └── index.js
```

---

## App.js - 라우팅 설정

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPages from "./pages/MainPages";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPages />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## MainPage.js - 메인페이지

```jsx
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
```

---

## Header.js - 헤더

```jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Shop</Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
```

---

## ProductCard.js - 상품 카드

```jsx
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
```

---

## ProductList.js - 전체 상품 목록

```jsx
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
```

---

## ProductDetail.js - 상품 상세 + 장바구니 담기

```jsx
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
```

---

## Cart.js - 장바구니

```jsx
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 장바구니</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          장바구니가 비어 있습니다.
        </div>
      ) : (
        <>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>이미지</th>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
                <th>소계</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td><img style={{maxWidth:100}} src={item.img} alt={item.name}/></td>
                  <td style={{verticalAlign:'middle'}}>{item.name}</td>
                  <td style={{verticalAlign:'middle'}}>{item.quantity}</td>
                  <td style={{verticalAlign:'middle'}}>{item.price.toLocaleString()}원</td>
                  <td style={{verticalAlign:'middle'}}>{(item.price * item.quantity).toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end fw-bold fs-5">
            총 합계: {total.toLocaleString()}원
          </div>
        </>
      )}
    </div>
  );
}
```

---

## products.json - 상품 데이터

```json
[
  {
    "id": 1,
    "name": "설화수 윤조에센스",
    "price": 42000,
    "img": "img/sulwhasoo1.jpg"
  },
  {
    "id": 2,
    "name": "라네즈 워터뱅크 크림",
    "price": 31000,
    "img": "img/laneige1.jpg"
  },
  {
    "id": 3,
    "name": "이니스프리 블랙티 앰플",
    "price": 28000,
    "img": "img/innisfree1.jpg"
  }
]
```
