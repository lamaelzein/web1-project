/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

export type Coupon = {
  code: string
  value: number
  used: boolean
  createdAt: string
}

export type OrderHistory = {
  id: string
  items: CartItem[]
  total: number
  pointsEarned: number
  couponUsed?: string
  date: string
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
  clearCart: () => void
  points: number
  coupons: Coupon[]
  history: OrderHistory[]
  checkout: (couponCode?: string) => { success: boolean; message: string }
  loadUserData: (email: string) => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch { return fallback }
}

const saveUserData = (
  email: string,
  points: number,
  coupons: Coupon[],
  history: OrderHistory[],
  cart: CartItem[]
) => {
  if (!email) return
  localStorage.setItem(`data_${email}`, JSON.stringify({
    points, coupons, orderHistory: history, cart,
  }))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart,    setCart]    = useState<CartItem[]>    ([])
  const [points,  setPoints]  = useState<number>        (0)
  const [coupons, setCoupons] = useState<Coupon[]>      ([])
  const [history, setHistory] = useState<OrderHistory[]>([])

  const getEmail = () => localStorage.getItem("currentUserEmail") || ""

  // Load data for a specific user — called on login
  const loadUserData = (email: string) => {
    const userData = load(`data_${email}`, {
      points: 0, coupons: [], orderHistory: [], cart: [],
    })
    setPoints (userData.points       ?? 0)
    setCoupons(userData.coupons      ?? [])
    setHistory(userData.orderHistory ?? [])
    setCart   (userData.cart         ?? [])
  }

  // On first mount — load current user's data if already logged in
  useEffect(() => {
    const email = getEmail()
    if (email) loadUserData(email)
  }, [])

  // Save under user email whenever anything changes
  useEffect(() => {
    const email = getEmail()
    if (email) saveUserData(email, points, coupons, history, cart)
  }, [cart, points, coupons, history])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(i => i.id !== id))

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => setCart([])

  const checkout = (couponCode?: string) => {
    if (cart.length === 0) return { success: false, message: "Your cart is empty." }

    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
    let discount = 0
    let usedCoupon: string | undefined

    if (couponCode) {
      const coupon = coupons.find(c => c.code === couponCode && !c.used)
      if (!coupon) return { success: false, message: "Invalid or already used coupon." }
      discount = coupon.value
      usedCoupon = coupon.code
      setCoupons(prev => prev.map(c => c.code === couponCode ? { ...c, used: true } : c))
    }

    const total        = Math.max(0, subtotal - discount)
    const earnedPoints = Math.floor(total) * 5
    const newPoints    = points + earnedPoints

    const oldThreshold = Math.floor(points / 500)
    const newThreshold = Math.floor(newPoints / 500)
    const newCoupons: Coupon[] = []
    for (let i = oldThreshold; i < newThreshold; i++) {
      newCoupons.push({
        code: `SOUKOUN-${Date.now()}-${i}`,
        value: 20,
        used: false,
        createdAt: new Date().toLocaleDateString(),
      })
    }

    const updatedCoupons = [...coupons.map(c =>
      c.code === usedCoupon ? { ...c, used: true } : c
    ), ...newCoupons]

    const order: OrderHistory = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total,
      pointsEarned: earnedPoints,
      couponUsed: usedCoupon,
      date: new Date().toLocaleString(),
    }
    const updatedHistory = [order, ...history]

    setPoints(newPoints)
    setCoupons(updatedCoupons)
    setHistory(updatedHistory)
    clearCart()

    saveUserData(getEmail(), newPoints, updatedCoupons, updatedHistory, [])

    return {
      success: true,
      message: newCoupons.length > 0
        ? `Order placed! You earned ${earnedPoints} points and got a 20$ coupon!`
        : `Order placed! You earned ${earnedPoints} points.`,
    }
  }

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      points, coupons, history, checkout, loadUserData,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext)