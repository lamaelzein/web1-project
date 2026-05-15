import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-stone-800">
        Soukoun
      </h1>

      <div className="flex gap-6 text-stone-700 font-medium">

        <Link to="/" className="hover:text-stone-900 transition">
          Home
        </Link>
        <Link to="/menu" className="hover:text-stone-900 transition">
          Menu
        </Link>
        <Link to="/activities" className="hover:text-stone-900 transition">
          Activities
        </Link>

        <Link to="/booking" className="hover:text-stone-900 transition">
          Booking
        </Link>

        <Link to="/gallery" className="hover:text-stone-900 transition">
          Gallery
        </Link>

        <Link to="/about" className="hover:text-stone-900 transition">
          About
        </Link>

        <Link to="/contact" className="hover:text-stone-900 transition">
          Contact
        </Link>

      </div>

    </nav>
  )
}

export default Navbar