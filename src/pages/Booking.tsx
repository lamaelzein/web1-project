/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { ChevronDown, CalendarDays, Trash2 } from "lucide-react"

type Booking = {
  id: number
  activity: string
  image?: string
  price: number
  duration: string
  date: string
  name: string
}

type ActivityOption = {
  id: number
  name: string
  image?: string
  price: number
  duration: string
}

type LocationState = {
  activity?: ActivityOption
}

// Same activities as Activities.tsx
import paintingImg from "../assets/painting.jpg"
import { Palette, Flame, Scissors, Camera, Coffee, Leaf } from "lucide-react"

const activityOptions: ActivityOption[] = [
  { id: 101, name: "Painting",      image: paintingImg, price: 15, duration: "2h"   },
  { id: 102, name: "Pottery",                           price: 18, duration: "2.5h" },
  { id: 103, name: "Candle Making",                     price: 12, duration: "1.5h" },
  { id: 104, name: "Embroidery",                        price: 10, duration: "2h"   },
  { id: 105, name: "Photo Walk",                        price: 8,  duration: "1h"   },
  { id: 106, name: "Tea Ceremony",                      price: 10, duration: "1h"   },
]

const activityIcons: Record<string, React.ReactNode> = {
  "Painting":      <Palette size={16} color="#c97b63" />,
  "Pottery":       <Leaf size={16} color="#c97b63" />,
  "Candle Making": <Flame size={16} color="#c97b63" />,
  "Embroidery":    <Scissors size={16} color="#c97b63" />,
  "Photo Walk":    <Camera size={16} color="#c97b63" />,
  "Tea Ceremony":  <Coffee size={16} color="#c97b63" />,
}

function Bookings() {
  const location = useLocation()
  const state = location.state as LocationState | null
  const { addToCart, removeFromCart, cart } = useCart()

  const [bookings, setBookings] = useState<Booking[]>(
    () => JSON.parse(localStorage.getItem("bookings") || "[]")
  )

  const [form, setForm] = useState({
    name: "",
    date: "",
    selectedActivity: state?.activity ?? null as ActivityOption | null,
  })
  const [showForm, setShowForm] = useState(!!state?.activity)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (state?.activity) {
      setForm(f => ({ ...f, selectedActivity: state.activity! }))
      setShowForm(true)
    }
  }, [state])

  const handleAdd = () => {
    if (!form.name || !form.date || !form.selectedActivity) return

    const newBooking: Booking = {
      id: Date.now(),
      activity: form.selectedActivity.name,
      image: form.selectedActivity.image,
      price: form.selectedActivity.price,
      duration: form.selectedActivity.duration,
      date: form.date,
      name: form.name,
    }

    // Add to bookings list
    const updated = [...bookings, newBooking]
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))

    // Add to cart for payment
    addToCart({
      id: newBooking.id,
      name: `${form.selectedActivity.name} (${form.date})`,
      price: form.selectedActivity.price,
      image: form.selectedActivity.image,
    })

    setShowForm(false)
    setForm({ name: "", date: "", selectedActivity: null })
  }

  const handleDelete = (booking: Booking) => {
    const updated = bookings.filter(b => b.id !== booking.id)
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
    // Remove from cart too
    removeFromCart(booking.id)
  }

  const isInCart = (id: number) => cart.some(i => i.id === id)

  const inputStyle = {
    width: "100%", padding: "9px 12px", fontSize: 13,
    border: "0.5px solid #f0d8d2", borderRadius: 8,
    background: "#fdf6f4", color: "#3d1f1a",
    outline: "none", boxSizing: "border-box" as const,
  }

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: "32px", fontFamily: "sans-serif" }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 4px" }}>Bookings</h1>
          <p style={{ fontSize: 14, color: "#b08070", margin: 0 }}>Manage your reservations</p>
        </div>
        <button
          onClick={() => { setShowForm(v => !v); setDropdownOpen(false) }}
          style={{
            padding: "9px 18px", background: "#2d1a1a", color: "#f5e6e0",
            border: "none", borderRadius: 999, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          <CalendarDays size={14} color="#f5e6e0" />
          New booking
        </button>
      </div>

      {/* Booking form */}
      {showForm && (
        <div style={{
          background: "#fff", border: "0.5px solid #f0d8d2",
          borderRadius: 16, padding: "20px 24px", marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 500, color: "#3d1f1a", margin: "0 0 18px" }}>
            New reservation
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>Your name</label>
              <input
                style={inputStyle}
                placeholder="e.g. Layla"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
            {/* Date */}
            <div>
              <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>Date</label>
              <input
                type="date"
                style={inputStyle}
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>

          {/* Activity dropdown */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>Activity</label>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                style={{
                  width: "100%", padding: "9px 12px",
                  background: "#fdf6f4", border: "0.5px solid #f0d8d2",
                  borderRadius: 8, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  fontSize: 13, color: form.selectedActivity ? "#3d1f1a" : "#b08070",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {form.selectedActivity ? (
                    <>
                      {activityIcons[form.selectedActivity.name]}
                      {form.selectedActivity.name}
                      <span style={{
                        fontSize: 11, background: "#fceee9", color: "#c97b63",
                        padding: "2px 8px", borderRadius: 999,
                      }}>
                        {form.selectedActivity.price.toFixed(2)} € · {form.selectedActivity.duration}
                      </span>
                    </>
                  ) : "Select an activity"}
                </span>
                <ChevronDown
                  size={14} color="#b08070"
                  style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
                />
              </button>

              {/* Dropdown list */}
              {dropdownOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
                  background: "#fff", border: "0.5px solid #f0d8d2",
                  borderRadius: 10, zIndex: 100, overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(45,26,26,0.1)",
                }}>
                  {activityOptions.map(a => (
                    <button
                      key={a.id}
                      onClick={() => { setForm(f => ({ ...f, selectedActivity: a })); setDropdownOpen(false) }}
                      style={{
                        width: "100%", padding: "10px 14px",
                        background: form.selectedActivity?.id === a.id ? "#fceee9" : "transparent",
                        border: "none", borderBottom: "0.5px solid #fdf6f4",
                        cursor: "pointer", textAlign: "left",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3d1f1a" }}>
                        {activityIcons[a.name]}
                        {a.name}
                      </span>
                      <span style={{ fontSize: 12, color: "#b08070" }}>
                        {a.price.toFixed(2)} € · {a.duration}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Selected activity preview */}
          {form.selectedActivity?.image && (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "#fceee9", borderRadius: 10, padding: "10px 14px", marginBottom: 14,
            }}>
              <img
                src={form.selectedActivity.image}
                alt={form.selectedActivity.name}
                style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }}
              />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 2px" }}>
                  {form.selectedActivity.name}
                </p>
                <p style={{ fontSize: 12, color: "#b08070", margin: 0 }}>
                  {form.selectedActivity.duration} · Will be added to cart for payment
                </p>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 14, fontWeight: 500, color: "#c97b63" }}>
                {form.selectedActivity.price.toFixed(2)} €
              </span>
            </div>
          )}

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleAdd}
              style={{
                padding: "9px 20px", background: "#2d1a1a", color: "#f5e6e0",
                border: "none", borderRadius: 999, fontSize: 13, cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
            >
              Confirm booking
            </button>
            <button
              onClick={() => { setShowForm(false); setDropdownOpen(false) }}
              style={{
                padding: "9px 20px", background: "transparent", color: "#b08070",
                border: "0.5px solid #f0d8d2", borderRadius: 999, fontSize: 13, cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bookings list */}
      {bookings.length === 0 ? (
        <div style={{
          background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 16,
          padding: "40px", textAlign: "center",
        }}>
          <CalendarDays size={36} color="#f0d8d2" style={{ margin: "0 auto 10px", display: "block" }} />
          <p style={{ fontSize: 14, color: "#b08070", margin: 0 }}>
            No bookings yet. Go to Activities to book something!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bookings.map((b) => (
            <div key={b.id} style={{
              background: "#fff", border: "0.5px solid #f0d8d2",
              borderRadius: 12, padding: "14px 18px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {b.image ? (
                  <img src={b.image} alt={b.activity}
                    style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: "#fceee9", display: "flex",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {activityIcons[b.activity] ?? <CalendarDays size={20} color="#c97b63" />}
                  </div>
                )}
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", margin: "0 0 3px" }}>
                    {b.activity}
                  </p>
                  <p style={{ fontSize: 12, color: "#b08070", margin: 0 }}>
                    {b.name} · {b.date}{b.duration ? ` · ${b.duration}` : ""}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {b.price > 0 && (
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#c97b63" }}>
                    {b.price.toFixed(2)} €
                  </span>
                )}
                {isInCart(b.id) && (
                  <span style={{
                    fontSize: 11, background: "#eaf3de", color: "#3b6d11",
                    padding: "3px 10px", borderRadius: 999, border: "0.5px solid #c0dd97",
                  }}>
                    In cart
                  </span>
                )}
                <button
                  onClick={() => handleDelete(b)}
                  style={{
                    width: 32, height: 32, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: "rgba(220,80,80,0.08)",
                    border: "0.5px solid rgba(220,80,80,0.2)",
                    borderRadius: 8, cursor: "pointer",
                  }}
                >
                  <Trash2 size={14} color="#f09595" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings