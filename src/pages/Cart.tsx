import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext)
        console.log(cart)
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-5xl font-bold mb-10 text-center">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl text-stone-600">
          No items added yet
        </p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-8">

            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold mb-2">
                    {item.name}
                  </h2>

                  <p className="text-lg text-stone-600 mb-5">
                    ${item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-6 py-3 rounded-xl"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="text-center mt-10">

            <h2 className="text-3xl font-bold">
              Total: ${total}
            </h2>

          </div>
        </>
      )}

    </div>
  )
}

export default Cart