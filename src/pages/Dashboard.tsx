import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { ShoppingBag, CalendarDays, Star, Ticket, BookOpen, ArrowRight } from "lucide-react"

const Dashboard = () => {
  let user = { firstName: "User", lastName: "" }
  try {
    const u = localStorage.getItem("user")
    if (u) user = JSON.parse(u)
  } catch { /* ignore */ }

  const { cart, points, coupons, history } = useCart()

  const bookings: { id: number; name: string; activity: string; date?: string }[] = (() => {
  try {
    const email = localStorage.getItem("currentUserEmail")
    const key = email ? `bookings_${email}` : "bookings"
    return JSON.parse(localStorage.getItem(key) || "[]")
  }
  catch { return [] }
})()

  const cartCount   = cart.reduce((s, i) => s + i.quantity, 0)
  const totalSpent  = history.reduce((s, o) => s + o.total, 0)
  const pointsToNext = 500 - (points % 500)
  const availableCoupons = coupons.filter(c => !c.used)

  const stats = [
    { label: "Cart items",  value: cartCount,        sub: "ready to order",   icon: ShoppingBag, to: "/dashboard/cart",      color: "#c97b63" },
    { label: "Bookings",    value: bookings.length,  sub: "reservations",     icon: CalendarDays, to: "/dashboard/bookings", color: "#9b72aa" },
    { label: "Points",      value: points,           sub: "collected",        icon: Star,         to: "/dashboard/profile",  color: "#d4943a" },
    { label: "Total spent", value: `${totalSpent.toFixed(0)}€`, sub: "all time", icon: BookOpen, to: "/dashboard/cart",     color: "#5a8a6a" },
  ]

  // Get current hour for greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

  return (
    <div style={{ padding: "28px", background: "#fdf6f4", minHeight: "100%", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 12, color: "#b08070", textTransform: "uppercase", letterSpacing: "0.6px", margin: "0 0 4px" }}>
          {greeting}
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 500, color: "#3d1f1a", margin: 0 }}>
          {user.firstName} {user.lastName} ☁️
        </h1>
      </div>

      {/* Hero banner */}
      <div style={{
        background: "#2d1a1a", borderRadius: 16,
        padding: "22px 28px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        marginBottom: 20,
      }}>
        <div>
          <p style={{ fontSize: 16, fontWeight: 500, color: "#f5e6e0", margin: "0 0 6px" }}>
            Your cozy corner awaits
          </p>
          <p style={{ fontSize: 13, color: "#a87c72", margin: "0 0 14px" }}>
            Everything is calm at Soukoun today.
          </p>
          <Link to="/dashboard/menu" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 16px", background: "#c97b63",
            color: "#fff", borderRadius: 999, fontSize: 12,
            textDecoration: "none", fontWeight: 500,
          }}>
            Browse menu <ArrowRight size={12} color="#fff" />
          </Link>
        </div>
        <span style={{ fontSize: 52, opacity: 0.5 }}>☕</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
        {stats.map(({ label, value, sub, icon: Icon, to, color }) => (
          <Link key={label} to={to} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#fff", border: "0.5px solid #f0d8d2",
                borderRadius: 12, padding: "14px 16px",
                transition: "transform 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <p style={{ fontSize: 11, color: "#b08070", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
                  {label}
                </p>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: `${color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={14} color={color} />
                </div>
              </div>
              <p style={{ fontSize: 22, fontWeight: 500, color: "#3d1f1a", margin: "0 0 2px" }}>{value}</p>
              <p style={{ fontSize: 11, color: "#c97b63", margin: 0 }}>{sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Points progress bar */}
      <div style={{
        background: "#fff", border: "0.5px solid #f0d8d2",
        borderRadius: 12, padding: "16px 20px", marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Star size={14} color="#c97b63" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a" }}>Points progress</span>
          </div>
          <span style={{ fontSize: 12, color: "#c97b63", fontWeight: 500 }}>
            {pointsToNext} pts until 20€ coupon
          </span>
        </div>
        <div style={{ background: "#fceee9", borderRadius: 999, height: 7, overflow: "hidden" }}>
          <div style={{
            width: `${((500 - pointsToNext) / 500) * 100}%`,
            height: "100%", background: "#c97b63", borderRadius: 999,
            transition: "width 0.4s",
          }} />
        </div>
        {availableCoupons.length > 0 && (
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <Ticket size={12} color="#993556" />
            <span style={{ fontSize: 12, color: "#993556" }}>
              You have {availableCoupons.length} coupon{availableCoupons.length > 1 ? "s" : ""} available —{" "}
              <Link to="/dashboard/cart" style={{ color: "#993556", fontWeight: 500 }}>use in cart</Link>
            </span>
          </div>
        )}
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Recent orders */}
        <div style={{ background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h4 style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <ShoppingBag size={14} color="#c97b63" /> Recent orders
            </h4>
            <Link to="/dashboard/cart" style={{ fontSize: 11, color: "#c97b63", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
              View all <ArrowRight size={10} color="#c97b63" />
            </Link>
          </div>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <p style={{ fontSize: 13, color: "#b08070", margin: "0 0 10px" }}>No orders yet</p>
              <Link to="/dashboard/menu" style={{
                fontSize: 12, color: "#c97b63", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                Browse menu <ArrowRight size={11} color="#c97b63" />
              </Link>
            </div>
          ) : (
            history.slice(0, 3).map((o) => (
              <div key={o.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: "0.5px solid #fceee9", fontSize: 13,
              }}>
                <div>
                  <p style={{ fontSize: 12, color: "#3d1f1a", margin: "0 0 2px" }}>
                    {o.items.map(i => i.name).join(", ").slice(0, 28)}{o.items.length > 1 ? "…" : ""}
                  </p>
                  <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>{o.date}</p>
                </div>
                <span style={{ fontWeight: 500, color: "#c97b63", flexShrink: 0, marginLeft: 8 }}>
                  {o.total.toFixed(2)} €
                </span>
              </div>
            ))
          )}
        </div>

        {/* Upcoming bookings */}
        <div style={{ background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h4 style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
              <CalendarDays size={14} color="#c97b63" /> Upcoming bookings
            </h4>
            <Link to="/dashboard/bookings" style={{ fontSize: 11, color: "#c97b63", textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
              View all <ArrowRight size={10} color="#c97b63" />
            </Link>
          </div>
          {bookings.length === 0 ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <p style={{ fontSize: 13, color: "#b08070", margin: "0 0 10px" }}>No bookings yet</p>
              <Link to="/dashboard/activities" style={{
                fontSize: 12, color: "#c97b63", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                See activities <ArrowRight size={11} color="#c97b63" />
              </Link>
            </div>
          ) : (
            bookings.slice(0, 4).map((b) => (
              <div key={b.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 0", borderBottom: "0.5px solid #fceee9", fontSize: 13, color: "#5a2d25",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#c97b63", flexShrink: 0, display: "inline-block" }} />
                  <span>
                    <p style={{ fontSize: 12, color: "#3d1f1a", margin: "0 0 1px" }}>{b.activity || b.name}</p>
                    <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>{b.name}</p>
                  </span>
                </span>
                {b.date && <span style={{ fontSize: 11, color: "#b08070", flexShrink: 0, marginLeft: 8 }}>{b.date}</span>}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard