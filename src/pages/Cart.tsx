import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext)

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-4xl font-bold mb-10">
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 mb-4 rounded-xl flex justify-between">

              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p>${item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>

            </div>
          ))}

          <h2 className="text-2xl font-bold mt-6">
            Total: ${total}
          </h2>

          <button
            onClick={clearCart}
            className="mt-6 bg-stone-800 text-white px-6 py-3 rounded-full"
          >
            Checkout (Fake)
          </button>
        </>
      )}

    </div>
  )
}

export default Cart