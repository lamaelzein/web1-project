import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Coffee, UtensilsCrossed, Cake, Sparkles, ShoppingBag, Plus, Minus } from "lucide-react"

import croissant from "../assets/croissant.jpg"
import shake from "../assets/shake.jpg"
import nescafe from "../assets/nescafe.jpg"
import cupcake from "../assets/cupcake.jpg"
import cookies from "../assets/cookies.jpg"
import icedcoffee from "../assets/icedcoffee.jpg"
import strawberry from "../assets/stawberry.jpg"
import cheesecake from "../assets/cheesecake.jpg"
import chocolatecake from "../assets/chocolatcake.jpg"
import chickenAlfredo from "../assets/chickenalfredo.jpg"
import caeserSalad from "../assets/caeserSalad.jpg"
import avocadoToast from "../assets/avocadoToast.jpg"
import cheeseSAndwich from "../assets/grilledSandwich.jpg"
import chickenSandwich from "../assets/chickenSandwich.jpg"

type Category = "all" | "drinks" | "food" | "desserts"

const items = [
  { id: 1,  name: "Croissant",               price: 4,  image: croissant,       category: "desserts" as Category },
  { id: 2,  name: "Nescafe",                 price: 3,  image: nescafe,         category: "drinks"   as Category },
  { id: 3,  name: "Iced Coffee",             price: 5,  image: icedcoffee,      category: "drinks"   as Category },
  { id: 4,  name: "Chocolate Shake",         price: 6,  image: shake,           category: "drinks"   as Category },
  { id: 5,  name: "Vanilla Cupcake",         price: 4,  image: cupcake,         category: "desserts" as Category },
  { id: 6,  name: "Cookies",                 price: 3,  image: cookies,         category: "desserts" as Category },
  { id: 7,  name: "Cheesecake",              price: 5,  image: cheesecake,      category: "desserts" as Category },
  { id: 8,  name: "Strawberry Tart",         price: 6,  image: strawberry,      category: "desserts" as Category },
  { id: 9,  name: "Chocolate Cake",          price: 5,  image: chocolatecake,   category: "desserts" as Category },
  { id: 10, name: "Chicken Alfredo",         price: 12, image: chickenAlfredo,  category: "food"     as Category },
  { id: 11, name: "Caesar Salad",            price: 8,  image: caeserSalad,     category: "food"     as Category },
  { id: 12, name: "Avocado Toast",           price: 7,  image: avocadoToast,    category: "food"     as Category },
  { id: 13, name: "Grilled Cheese Sandwich", price: 9,  image: cheeseSAndwich,  category: "food"     as Category },
  { id: 14, name: "Chicken Sandwich",        price: 10, image: chickenSandwich, category: "food"     as Category },
]

const filters: { label: string; value: Category; icon: React.ReactNode }[] = [
  { label: "All",      value: "all",      icon: <Sparkles size={14} />        },
  { label: "Drinks",   value: "drinks",   icon: <Coffee size={14} />          },
  { label: "Food",     value: "food",     icon: <UtensilsCrossed size={14} /> },
  { label: "Desserts", value: "desserts", icon: <Cake size={14} />            },
]

type Toast = { id: number; name: string; image: string }

function Menu() {
  const { addToCart, removeFromCart, updateQuantity, cart } = useCart()
  const [active, setActive] = useState<Category>("all")
  const [toasts, setToasts] = useState<Toast[]>([])

  const filtered = active === "all" ? items : items.filter(i => i.category === active)

  const getQty = (id: number) => cart.find(i => i.id === id)?.quantity ?? 0

  const handleAdd = (item: typeof items[0]) => {
    addToCart(item)
    // eslint-disable-next-line react-hooks/purity
    const toastId = Date.now()
    setToasts(prev => [...prev, { id: toastId, name: item.name, image: item.image }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId))
    }, 3000)
  }

  const handleIncrease = (item: typeof items[0]) => {
    addToCart(item)
  }

  const handleDecrease = (item: typeof items[0]) => {
    const qty = getQty(item.id)
    if (qty <= 1) removeFromCart(item.id)
    else updateQuantity(item.id, qty - 1)
  }

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: "32px", fontFamily: "sans-serif" }}>

      {/* Toast container — top right, large */}
      <div style={{
        position: "fixed", top: 24, right: 24,
        display: "flex", flexDirection: "column", gap: 10,
        zIndex: 1000,
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: "#fff",
            border: "0.5px solid #f0d8d2",
            borderRadius: 16,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "0 8px 32px rgba(45,26,26,0.14)",
            animation: "slideDown 0.3s ease",
            minWidth: 300,
          }}>
            <img
              src={t.image}
              alt={t.name}
              style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", margin: "0 0 4px" }}>
                {t.name}
              </p>
              <p style={{ fontSize: 12, color: "#b08070", margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
                <ShoppingBag size={11} color="#c97b63" />
                Added to cart
              </p>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#c97b63", display: "flex",
              alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <UtensilsCrossed size={14} color="#fff" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", textAlign: "center", margin: "0 0 6px" }}>
        Our Menu
      </h1>
      <p style={{ textAlign: "center", color: "#b08070", fontSize: 14, margin: "0 0 28px" }}>
        Picked with love for our girls
      </p>

      {/* Filter tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
        {filters.map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 20px", borderRadius: 999,
              border: active === value ? "1.5px solid #c97b63" : "0.5px solid #f0d8d2",
              background: active === value ? "#2d1a1a" : "#fff",
              color: active === value ? "#f5e6e0" : "#b08070",
              fontSize: 13, fontWeight: active === value ? 500 : 400,
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 20,
      }}>
        {filtered.map((item) => {
          const qty = getQty(item.id)
          return (
            <div
              key={item.id}
              style={{
                background: "#fff", borderRadius: 16,
                overflow: "hidden", border: "0.5px solid #f0d8d2",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              {/* Image + badge */}
              <div style={{ position: "relative" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                {qty > 0 && (
                  <div style={{
                    position: "absolute", top: 10, right: 10,
                    background: "#c97b63", color: "#fff",
                    borderRadius: 999, padding: "3px 10px",
                    fontSize: 11, fontWeight: 600,
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <ShoppingBag size={10} color="#fff" />
                    {qty} in cart
                  </div>
                )}
              </div>

              <div style={{ padding: "16px 18px" }}>
                <h2 style={{ fontSize: 16, fontWeight: 500, color: "#3d1f1a", margin: "0 0 4px" }}>
                  {item.name}
                </h2>
                <p style={{ fontSize: 13, color: "#b08070", margin: "0 0 14px" }}>
                  {item.price.toFixed(2)} €
                </p>

                {/* Add to cart button OR quantity control */}
                {qty === 0 ? (
                  <button
                    onClick={() => handleAdd(item)}
                    style={{
                      width: "100%", padding: "9px 0",
                      background: "#2d1a1a", color: "#f5e6e0",
                      border: "none", borderRadius: 999,
                      fontSize: 13, cursor: "pointer",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", gap: 7,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
                  >
                    <ShoppingBag size={13} color="#f5e6e0" />
                    Add to cart
                  </button>
                ) : (
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    background: "#fdf6f4",
                    border: "0.5px solid #f0d8d2",
                    borderRadius: 999, overflow: "hidden",
                    height: 38,
                  }}>
                    <button
                      onClick={() => handleDecrease(item)}
                      style={{
                        width: 44, height: "100%",
                        background: "transparent", border: "none",
                        color: "#c97b63", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <Minus size={14} color="#c97b63" />
                    </button>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#3d1f1a", minWidth: 24, textAlign: "center" }}>
                      {qty}
                    </span>
                    <button
                      onClick={() => handleIncrease(item)}
                      style={{
                        width: 44, height: "100%",
                        background: "#2d1a1a", border: "none",
                        color: "#f5e6e0", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        borderRadius: "0 999px 999px 0",
                      }}
                    >
                      <Plus size={14} color="#f5e6e0" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Menu