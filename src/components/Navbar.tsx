import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Navbar() {
  const { cart } = useContext(CartContext)

  const style = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-stone-900 font-bold border-b-2 border-stone-800"
      : "text-stone-600 hover:text-stone-900"

  return (
    <nav className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-stone-800">
        Soukoun
      </h1>

      <div className="flex gap-6 font-medium items-center">

        <NavLink to="/" className={style}>Home</NavLink>
        <NavLink to="/activities" className={style}>Activities</NavLink>
        <NavLink to="/booking" className={style}>Booking</NavLink>
        <NavLink to="/gallery" className={style}>Gallery</NavLink>
        <NavLink to="/about"className={style}>About</NavLink>
        <NavLink to="/menu" className={style}>Menu</NavLink>
        <NavLink to="/cart" className={style}>
          Cart ({cart.length})
        </NavLink>
        <NavLink to="/login" className={style}>Login</NavLink>

      </div>

    </nav>
  )
}

export default Navbar