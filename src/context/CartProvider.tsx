import { useState } from "react"
import { CartContext } from "./CartContext"

type Props = {
  children: React.ReactNode
}

function CartProvider({ children }: Props) {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount((prev) => prev + 1)
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider