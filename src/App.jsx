import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import SignUp from "./pages/signup.jsx";
import Navbar from "./components/navbar.jsx"; 


function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default function App() {
  console.log(import.meta.env.VITE_API_BASE_URL);

  return (
    <Router>
      <Layout />
    </Router>
  );
}
