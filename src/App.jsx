import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "@/components/navbar";
import ProtectedRoute from "@/routes/ProtectedRoute";

// Public Pages
import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Wishlist from "@/pages/wishlist";
import Profile from "@/pages/profile";
import ProductDetail from "@/pages/product-detail";
import TeamDetail from "@/pages/team-detail";

// Admin Pages
import AdminProducts from "@/pages/admin/products/AdminProducts";
import AdminService from "@/pages/admin/service/AdminService";
import AdminTeam from "@/pages/admin/team/AdminTeam";
import AdminMembers from "@/pages/admin/member/AdminMembers";
import AdminPortfolio from "@/pages/admin/portfolio/AdminPortfolio";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/team/:id"
          element={<TeamDetail />}
        />

        {/* Admin */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/service"
          element={
            <ProtectedRoute>
              <AdminService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/team"
          element={
            <ProtectedRoute>
              <AdminTeam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/members"
          element={
            <ProtectedRoute>
              <AdminMembers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/portfolio"
          element={
            <ProtectedRoute>
              <AdminPortfolio />
            </ProtectedRoute>
          }
        />
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