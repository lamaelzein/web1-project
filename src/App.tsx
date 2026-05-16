import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Menu from "./pages/Menu"
import Home from "./pages/Home"
import Activities from "./pages/Activities"
import Booking from "./pages/Booking"
import Gallery from "./pages/Gallery"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"

function App() {
  return (
    <BrowserRouter>

      <div className="bg-stone-100 min-h-screen">

        <Navbar />

        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />

          <Route path="/activities" element={<Activities />} />

          <Route path="/booking" element={<Booking />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/menu" element={<Menu />} />

        </Routes>

        <Footer />

      </div>

    </BrowserRouter>
  )
}

export default App