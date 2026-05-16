import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Menu() {
  const { addToCart } = useContext(CartContext)

  const items = [
    { id: 1, name: "Croissant 🥐", price: 4 },
    { id: 2, name: "Nescafe ☕", price: 3 },
    { id: 3, name: "Iced Coffee 🧋", price: 5 },
    { id: 4, name: "Shake 🍫", price: 6 },
  ]

  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-5xl font-bold text-center mb-10">
        Menu ☕
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {items.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-xl font-bold mb-2">
              {item.name}
            </h2>

            <p className="text-stone-600 mb-4">
              ${item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="bg-stone-800 text-white px-6 py-3 rounded-full"
            >
              Order Now
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Menu