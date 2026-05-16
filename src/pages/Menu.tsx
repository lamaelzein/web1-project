import { useContext } from "react"

import { CartContext } from "../context/CartContext"
import croissant from "../assets/croissant.jpg"
import shake from "../assets/shake.jpg"
import nescafe from "../assets/nescafe.jpg"
import cupcake from "../assets/cupcake.jpg"
import cookies from "../assets/cookies.jpg"
import icedcoffee from "../assets/icedcoffee.jpg"

function Menu() {
  const { addToCart } = useContext(CartContext)

  const items = [
    {
      id: 1,
      name: "Croissant 🥐",
      price: 4,
      image: croissant,
    },

    {
      id: 2,
      name: "Nescafe ☕",
      price: 3,
      image: nescafe,
    },

    {
      id: 3,
      name: "Iced Coffee 🧋",
      price: 5,
      image: icedcoffee,
    },

    {
      id: 4,
      name: "Chocolate Shake 🍫",
      price: 6,
      image: shake,
    },

    {
      id: 5,
      name: "Vanilla Cupcake 🧁",
      price: 4,
      image: cupcake,
    },

    {
      id: 6,
      name: "Cookies 🍪",
      price: 3,
      image: cookies,
    },

  ]

  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-5xl font-bold text-center text-stone-900 mb-12">
        ✨ Our Menu ✨
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-500"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-72 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold text-stone-800 mb-2">
                {item.name}
              </h2>

              <p className="text-stone-600 text-lg mb-5">
                ${item.price}
              </p>

              <button
                onClick={() => addToCart(item)}
                className="bg-stone-800 text-white px-6 py-3 rounded-full hover:bg-stone-900 transition"
              >
                Order Now
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Menu