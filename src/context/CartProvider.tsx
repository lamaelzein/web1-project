import React, { useState } from "react"
import { CartContext } from "./CartContext"
import type { CartItem } from "./CartContext"

type Props = {
  children: React.ReactNode
}

function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartItem[]>([])
    console.log(cart)
  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])

    alert(`${item.name} added to cart 🛒`)
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider