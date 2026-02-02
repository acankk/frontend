import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Wishlist from "@/pages/wishlist";
import Profile from "@/pages/profile";
import ProductDetail from "@/pages/product-detail";
import AdminProducts from "@/pages/admin/products";


function Layout() {
  const location = useLocation();


  const hideNavbar = ["/login", "/signup", "/admin/products"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/products" element={<AdminProducts />} />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
