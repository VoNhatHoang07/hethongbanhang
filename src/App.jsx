
import { useState } from "react";
import {
  Package, Users, ShoppingCart, LayoutDashboard,
  Plus, Trash2, Search
} from "lucide-react";
import "./App.css";

function App() {
  const [tab, setTab] = useState("dashboard");

  const [products, setProducts] = useState(() =>
    JSON.parse(localStorage.getItem("products") || "[]")
  );

  const [customers, setCustomers] = useState(() =>
    JSON.parse(localStorage.getItem("customers") || "[]")
  );

  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("orders") || "[]")
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [search, setSearch] = useState("");

  function saveProducts(data) {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  }

  function saveCustomers(data) {
    setCustomers(data);
    localStorage.setItem("customers", JSON.stringify(data));
  }

  function saveOrders(data) {
    setOrders(data);
    localStorage.setItem("orders", JSON.stringify(data));
  }

  function addProduct() {
    if (!name || !price || Number(price) <= 0) {
      alert("Vui lòng nhập tên và giá sản phẩm hợp lệ!");
      return;
    }

    saveProducts([
      ...products,
      { id: Date.now(), name, price: Number(price) }
    ]);

    setName("");
    setPrice("");
  }

  function addCustomer() {
    if (!name || !phone) {
      alert("Vui lòng nhập tên và số điện thoại!");
      return;
    }

    saveCustomers([
      ...customers,
      { id: Date.now(), name, phone }
    ]);

    setName("");
    setPhone("");
  }

  function addOrder() {
    if (products.length === 0 || customers.length === 0) {
      alert("Cần có sản phẩm và khách hàng trước!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: customers[0].name,
      product: products[0].name,
      total: products[0].price,
      date: new Date().toLocaleDateString("vi-VN")
    };

    saveOrders([...orders, order]);
    alert("Tạo đơn hàng thành công!");
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>SHOP MANAGER</h2>

        <button onClick={() => setTab("dashboard")}>
          <LayoutDashboard /> Tổng quan
        </button>

        <button onClick={() => setTab("products")}>
          <Package /> Sản phẩm
        </button>

        <button onClick={() => setTab("customers")}>
          <Users /> Khách hàng
        </button>

        <button onClick={() => setTab("orders")}>
          <ShoppingCart /> Đơn hàng
        </button>
      </aside>

      <main className="main">
        <h1>HỆ THỐNG QUẢN LÝ BÁN HÀNG</h1>

        {tab === "dashboard" && (
          <>
            <h2>Tổng quan hệ thống</h2>
            <div className="cards">
              <div className="card">
                <Package />
                <h3>Sản phẩm</h3>
                <h2>{products.length}</h2>
              </div>

              <div className="card">
                <Users />
                <h3>Khách hàng</h3>
                <h2>{customers.length}</h2>
              </div>

              <div className="card">
                <ShoppingCart />
                <h3>Đơn hàng</h3>
                <h2>{orders.length}</h2>
              </div>
            </div>
          </>
        )}

        {tab === "products" && (
          <>
            <h2>Quản lý sản phẩm</h2>

            <div className="form">
              <input
                placeholder="Tên sản phẩm"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Giá sản phẩm"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />

              <button onClick={addProduct}>
                <Plus /> Thêm sản phẩm
              </button>
            </div>

            <div className="search">
              <Search />
              <input
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.price.toLocaleString("vi-VN")} đ</td>
                    <td>
                      <button className="delete"
                        onClick={() => saveProducts(
                          products.filter(x => x.id !== p.id)
                        )}>
                        <Trash2 /> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === "customers" && (
          <>
            <h2>Quản lý khách hàng</h2>

            <div className="form">
              <input
                placeholder="Tên khách hàng"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <input
                placeholder="Số điện thoại"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />

              <button onClick={addCustomer}>
                <Plus /> Thêm khách hàng
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>
                      <button className="delete"
                        onClick={() => saveCustomers(
                          customers.filter(x => x.id !== c.id)
                        )}>
                        <Trash2 /> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === "orders" && (
          <>
            <h2>Quản lý đơn hàng</h2>

            <button onClick={addOrder}>
              <Plus /> Tạo đơn hàng
            </button>

            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Sản phẩm</th>
                  <th>Tổng tiền</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>{o.product}</td>
                    <td>{o.total.toLocaleString("vi-VN")} đ</td>
                    <td>{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
