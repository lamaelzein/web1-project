import { Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Drinks from "./pages/Drinks";
import Bookings from "./pages/Booking";
import Activities from "./pages/Activities";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Menu from "./pages/Menu";

function App() {
  return (
    <Routes>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      {/* MAIN APP */}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="drinks" element={<Drinks />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="activities" element={<Activities />} />
        <Route path="cart" element={<Cart />} />
        {/* NEW PAGES */}
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="menu" element={<Menu />} />
      </Route>

    </Routes>
  );
}

export default App;