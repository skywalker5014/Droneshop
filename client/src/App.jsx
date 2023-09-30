import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Login from "./components/Login";
import Register from "./components/Register";
import Seller from "./components/Seller";
import Myorders from "./components/Myorders";


function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Seller />} />
        <Route path="/orders" element={<Myorders />} />
      </Routes>
    </>
  );
}

export default App;
