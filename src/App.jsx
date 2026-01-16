import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/navbar";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Wishlist from "@/pages/wishlist";
import Profile from "@/pages/profile";

function Layout() {
  const location = useLocation();

  // navbar tidak muncul di login & signup
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
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
