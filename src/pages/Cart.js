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
