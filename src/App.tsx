import { Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "./layouts/MainLayout"
import ProtectedRoute from "./layouts/ProtectedRoute"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Booking"
import Activities from "./pages/Activities"
import Cart from "./pages/Cart"
import About from "./pages/About"
import Gallery from "./pages/Gallery"
import Menu from "./pages/Menu"
import Profile from "./pages/Profile"


function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Protected */}
      <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="activities" element={<Activities />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="menu" element={<Menu />} />
        <Route path="profile" element={<Profile />} />

      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App