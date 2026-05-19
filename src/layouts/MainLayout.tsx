import { Outlet, Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useMemo } from "react"
import { useCart } from "../context/CartContext"
import {
  LayoutDashboard, CalendarDays, Sparkles, Info,
  Image, BookOpen, ShoppingBag, LogOut, UserCircle, Coffee, User
} from "lucide-react"

const navItems = [
  { to: "/dashboard",            label: "Dashboard",  icon: LayoutDashboard },
  { to: "/dashboard/profile",    label: "Profile",    icon: User            },
  { to: "/dashboard/menu",       label: "Menu",       icon: BookOpen        },
  { to: "/dashboard/activities", label: "Activities", icon: Sparkles        },
  { to: "/dashboard/bookings",   label: "Bookings",   icon: CalendarDays    },
  { to: "/dashboard/gallery",    label: "Gallery",    icon: Image           },
  { to: "/dashboard/about",      label: "About Us",      icon: Info         },

]

const MainLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, points, coupons, history } = useCart()
  const [showProfile, setShowProfile] = useState(false)

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  let user = { firstName: "User", lastName: "", email: "" }
  try {
    const u = localStorage.getItem("user")
    if (u) user = JSON.parse(u)
  } catch { /* ignore */ }

  const profileStats = useMemo(() => ({
    points,
    coupons: coupons.filter(c => !c.used).length,
    orders:  history.length,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [points, coupons, history, showProfile])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("currentUserEmail")
    navigate("/login")
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      <aside style={{ width: "220px", background: "#2d1a1a", display: "flex", flexDirection: "column" }}>

        {/* Brand row */}
        <div style={{
          padding: "16px 14px",
          borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#c97b63", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>
              <Coffee size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#f5e6e0" }}>Soukoun</div>
              <div style={{ fontSize: 9, color: "#a87c72", textTransform: "uppercase", letterSpacing: "0.4px" }}>
                Coffee & Calm
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Cart icon */}
            <Link to="/dashboard/cart" title="Cart" style={{
              position: "relative", width: 32, height: 32, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.07)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
            }}>
              <ShoppingBag size={16} color="#f5e6e0" />
              {cartCount > 0 && (
                <span style={{
                  position: "absolute", top: -5, right: -5,
                  minWidth: 17, height: 17, borderRadius: 999,
                  background: "#c97b63", color: "#fff",
                  fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 3px",
                }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Profile icon — opens dropdown AND navigates */}
            <button
              onClick={() => {
                setShowProfile(v => !v)
                navigate("/dashboard/profile")
              }}
              title="Profile"
              style={{
                width: 32, height: 32, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: location.pathname === "/dashboard/profile"
                  ? "rgba(201,123,99,0.25)"
                  : "rgba(255,255,255,0.07)",
                border: location.pathname === "/dashboard/profile"
                  ? "0.5px solid #c97b63"
                  : "0.5px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
            >
              <UserCircle size={16} color="#f5e6e0" />
            </button>
          </div>
        </div>

        {/* Profile dropdown — quick summary */}
        {showProfile && (
          <div style={{
            background: "#1a0f0f",
            borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            padding: "16px 14px",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "#c97b63", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 500, color: "#fff",
              margin: "0 auto 10px",
            }}>
              {user.firstName.charAt(0).toUpperCase()}
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#f5e6e0", textAlign: "center", margin: "0 0 2px" }}>
              {user.firstName} {user.lastName}
            </p>
            <p style={{
              fontSize: 11, color: "#a87c72", textAlign: "center", margin: "0 0 12px",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {user.email}
            </p>
            <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.08)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                { label: "Points",  value: `${profileStats.points} pts`        },
                { label: "Coupons", value: `${profileStats.coupons} available` },
                { label: "Orders",  value: `${profileStats.orders} total`      },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontSize: 12, padding: "3px 0",
                }}>
                  <span style={{ color: "#a87c72" }}>{label}</span>
                  <span style={{
                    color: "#f5c4b3", fontWeight: 500,
                    background: "rgba(201,123,99,0.15)",
                    padding: "2px 8px", borderRadius: 999, fontSize: 11,
                  }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Link to full profile page */}
            <Link
              to="/dashboard/profile"
              onClick={() => setShowProfile(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                marginTop: 12, padding: "7px 0",
                background: "rgba(201,123,99,0.15)",
                border: "0.5px solid rgba(201,123,99,0.3)",
                borderRadius: 999, fontSize: 12, color: "#f5c4b3",
                textDecoration: "none",
              }}
            >
              <User size={12} color="#f5c4b3" />
              View full profile
            </Link>
          </div>
        )}

        {/* Nav */}
        <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 1, overflowY: "auto" }}>
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 10px", borderRadius: 8,
                color: active ? "#f5c4b3" : "#c9a89e",
                background: active ? "rgba(201,123,99,0.18)" : "transparent",
                textDecoration: "none", fontSize: 13.5,
                transition: "background 0.15s, color 0.15s",
              }}>
                <Icon size={16} color={active ? "#f5c4b3" : "#c9a89e"} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "10px 8px", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: 9,
            width: "100%", padding: "9px 10px",
            background: "rgba(220,80,80,0.12)",
            border: "0.5px solid rgba(220,80,80,0.25)",
            borderRadius: 8, color: "#f09595",
            fontSize: 13, cursor: "pointer",
          }}>
            <LogOut size={15} color="#f09595" />
            Logout
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, background: "#fdf6f4", overflow: "auto" }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout