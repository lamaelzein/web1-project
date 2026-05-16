import { NavLink } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Navbar() {
  const { cartCount } = useContext(CartContext)

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-stone-900 font-bold border-b-2 border-stone-800 pb-1 transition"
      : "text-stone-600 hover:text-stone-900 transition"

  return (
    <nav className="bg-white shadow-md px-8 py-5 flex justify-between items-center sticky top-0 z-50">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-stone-800">
        Soukoun
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6 font-medium">

        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>

        <NavLink to="/activities" className={navStyle}>
          Activities
        </NavLink>

        <NavLink to="/booking" className={navStyle}>
          Booking
        </NavLink>

        <NavLink to="/gallery" className={navStyle}>
          Gallery
        </NavLink>

        <NavLink to="/menu" className={navStyle}>
          Menu
        </NavLink>

        <NavLink to="/about" className={navStyle}>
          About
        </NavLink>

        <NavLink to="/contact" className={navStyle}>
          Contact
        </NavLink>

        <NavLink to="/login" className={navStyle}>
          Login
        </NavLink>

      </div>

      {/* Cart */}
      <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full shadow-sm">

        <FiShoppingCart className="text-stone-800" size={22} />

        <span className="font-bold text-stone-800">
          {cartCount}
        </span>

      </div>

    </nav>
  )
}

export default Navbar