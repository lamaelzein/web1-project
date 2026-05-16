import { createContext, useState } from "react"

type CartContextType = {
  cartCount: number
  addToCart: () => void
}

export const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
})

function CartProvider({ children }: any) {
  const [cartCount, setCartCount] = useState(0)

  const addToCart = () => {
    setCartCount(cartCount + 1)
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider