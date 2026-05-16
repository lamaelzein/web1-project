import { createContext } from "react"

export type CartContextType = {
  cartCount: number
  addToCart: () => void
}

export const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
})