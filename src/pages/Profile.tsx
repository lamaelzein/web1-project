import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Mail, Edit3, Check, X, Star, Ticket, ShoppingBag, TrendingUp } from "lucide-react"

function Profile() {
  const { points, coupons, history } = useCart()

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}") }
    catch { return {} }
  })

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ firstName: user.firstName || "", lastName: user.lastName || "" })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const updatedUser = { ...user, firstName: form.firstName, lastName: form.lastName }
    // Update in users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: { email: string }) =>
      u.email === user.email ? { ...u, firstName: form.firstName, lastName: form.lastName } : u
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const totalSpent = history.reduce((s, o) => s + o.total, 0)
  const availableCoupons = coupons.filter(c => !c.used)
  const pointsToNext = 500 - (points % 500)

  const inputStyle = {
    padding: "9px 12px", fontSize: 14,
    border: "0.5px solid #f0d8d2", borderRadius: 10,
    background: "#fdf6f4", color: "#3d1f1a",
    outline: "none", width: "100%",
    boxSizing: "border-box" as const,
  }

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: 32, fontFamily: "sans-serif" }}>

      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>My Profile</h1>
      <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 28px" }}>Manage your account and view your activity</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>

        {/* LEFT — Account info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Avatar + name card */}
          <div style={{
            background: "#fff", border: "0.5px solid #f0d8d2",
            borderRadius: 16, padding: "24px 20px",
          }}>
            {/* Avatar */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#c97b63", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 500, color: "#fff",
              margin: "0 auto 16px",
            }}>
              {user.firstName?.charAt(0).toUpperCase()}
            </div>

            {saved && (
              <div style={{
                background: "#eaf3de", border: "0.5px solid #c0dd97",
                borderRadius: 8, padding: "8px 14px", marginBottom: 14,
                fontSize: 12, color: "#3b6d11", textAlign: "center",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <Check size={13} color="#3b6d11" /> Changes saved
              </div>
            )}

            {editing ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 4 }}>First name</label>
                  <input
                    style={inputStyle}
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 4 }}>Last name</label>
                  <input
                    style={inputStyle}
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button onClick={handleSave} style={{
                    flex: 1, padding: "8px 0", background: "#2d1a1a",
                    color: "#f5e6e0", border: "none", borderRadius: 999,
                    fontSize: 13, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <Check size={13} color="#f5e6e0" /> Save
                  </button>
                  <button onClick={() => { setEditing(false); setForm({ firstName: user.firstName, lastName: user.lastName }) }} style={{
                    flex: 1, padding: "8px 0", background: "transparent",
                    color: "#b08070", border: "0.5px solid #f0d8d2", borderRadius: 999,
                    fontSize: 13, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: 18, fontWeight: 500, color: "#3d1f1a", textAlign: "center", margin: "0 0 4px" }}>
                  {user.firstName} {user.lastName}
                </p>
                <p style={{ fontSize: 13, color: "#b08070", textAlign: "center", margin: "0 0 16px",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <Mail size={12} color="#b08070" /> {user.email}
                </p>
                <button onClick={() => setEditing(true)} style={{
                  width: "100%", padding: "8px 0", background: "transparent",
                  color: "#c97b63", border: "0.5px solid #f0d8d2", borderRadius: 999,
                  fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                  <Edit3 size={13} color="#c97b63" /> Edit name
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { icon: <Star size={16} color="#c97b63" />,       label: "Points",       value: points },
              { icon: <ShoppingBag size={16} color="#c97b63" />, label: "Orders",       value: history.length },
              { icon: <TrendingUp size={16} color="#c97b63" />,  label: "Total spent",  value: `${totalSpent.toFixed(2)} $` },
              { icon: <Ticket size={16} color="#c97b63" />,      label: "Coupons",      value: availableCoupons.length },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                background: "#fff", border: "0.5px solid #f0d8d2",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  {icon}
                  <span style={{ fontSize: 12, color: "#b08070" }}>{label}</span>
                </div>
                <p style={{ fontSize: 20, fontWeight: 500, color: "#3d1f1a", margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Points progress */}
          <div style={{ background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: 0 }}>Points progress</p>
              <span style={{ fontSize: 12, color: "#c97b63", fontWeight: 500 }}>{points} / {Math.ceil(points / 500) * 500} pts</span>
            </div>
            <div style={{ background: "#fceee9", borderRadius: 999, height: 8, overflow: "hidden", marginBottom: 6 }}>
              <div style={{
                width: `${((500 - pointsToNext) / 500) * 100}%`,
                height: "100%", background: "#c97b63", borderRadius: 999,
                transition: "width 0.4s",
              }} />
            </div>
            <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>
              {pointsToNext} points until your next 20$ coupon
            </p>
          </div>

          {/* Available coupons */}
          {availableCoupons.length > 0 && (
            <div style={{ background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "16px 18px" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 12px",
                display: "flex", alignItems: "center", gap: 6 }}>
                <Ticket size={14} color="#c97b63" /> Available coupons
              </p>
              {availableCoupons.map(c => (
                <div key={c.code} style={{
                  background: "#fceee9", borderRadius: 8, padding: "10px 12px",
                  marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <p style={{ fontSize: 12, fontFamily: "monospace", color: "#3d1f1a", margin: "0 0 2px" }}>{c.code}</p>
                    <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>Created {c.createdAt}</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "#c97b63" }}>−20$</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Order history */}
        <div style={{ background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 16, padding: "20px" }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: "#3d1f1a", margin: "0 0 16px",
            display: "flex", alignItems: "center", gap: 7 }}>
            <ShoppingBag size={16} color="#c97b63" /> Order history
          </p>

          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <ShoppingBag size={32} color="#f0d8d2" style={{ margin: "0 auto 10px", display: "block" }} />
              <p style={{ fontSize: 13, color: "#b08070", margin: 0 }}>No orders yet</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {history.map(order => (
                <div key={order.id} style={{
                  border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "14px 16px",
                }}>
                  {/* Order header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 500, color: "#3d1f1a", margin: "0 0 2px" }}>{order.id}</p>
                      <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>{order.date}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 15, fontWeight: 500, color: "#c97b63", margin: "0 0 2px" }}>
                        {order.total.toFixed(2)} $
                      </p>
                      <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>
                        +{order.pointsEarned} pts
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {order.items.map(i => (
                      <div key={i.id} style={{
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                        {i.image && (
                          <img src={i.image} alt={i.name}
                            style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, color: "#3d1f1a", margin: 0 }}>{i.name}</p>
                          <p style={{ fontSize: 11, color: "#b08070", margin: 0 }}>×{i.quantity} · {(i.price * i.quantity).toFixed(2)} $</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  {order.couponUsed && (
                    <div style={{
                      marginTop: 8, paddingTop: 8,
                      borderTop: "0.5px solid #f0d8d2",
                      fontSize: 11, color: "#993556",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <Ticket size={11} color="#993556" /> Coupon used: {order.couponUsed}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile