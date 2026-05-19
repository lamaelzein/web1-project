import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

function Cart() {
  const { cart, removeFromCart, updateQuantity, points, coupons, checkout } = useCart()
  const [couponInput, setCouponInput] = useState("")
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const availableCoupon = coupons.find(c => c.code === couponInput && !c.used)
  const discount = availableCoupon ? availableCoupon.value : 0
  const total = Math.max(0, subtotal - discount)
  const pointsToEarn = Math.floor(total) * 5
  const pointsToNext = 500 - (points % 500)

  const handleCheckout = () => {
    const result = checkout(couponInput || undefined)
    setMessage({ text: result.message, ok: result.success })
    if (result.success) setCouponInput("")
  }

  const inputStyle = {
    padding: "9px 12px", fontSize: 13,
    border: "0.5px solid #f0d8d2", borderRadius: 10,
    background: "#fdf6f4", color: "#3d1f1a", outline: "none",
  }

  if (cart.length === 0 && !message?.ok) return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: 32, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>Cart</h1>
      <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 24px" }}>Your items</p>
      <div style={{
        background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 16,
        padding: 40, textAlign: "center",
      }}>
        <p style={{ fontSize: 36, margin: "0 0 10px" }}>🛍</p>
        <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 16px" }}>Your cart is empty</p>
        <Link to="/dashboard/menu" style={{
          padding: "9px 20px", background: "#2d1a1a", color: "#f5e6e0",
          borderRadius: 999, fontSize: 13, textDecoration: "none",
        }}>Browse menu</Link>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: 32, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>Cart</h1>
      <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 24px" }}>Review your order</p>

      {/* Success message */}
      {message?.ok && (
        <div style={{
          background: "#eaf3de", border: "0.5px solid #c0dd97", borderRadius: 12,
          padding: "14px 18px", marginBottom: 20, fontSize: 14, color: "#3b6d11",
        }}>
          ✅ {message.text}
          <Link to="/dashboard/cart" style={{ marginLeft: 12, color: "#3b6d11", fontWeight: 500 }}>
            View history ↓
          </Link>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" }}>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {cart.map(item => (
            <div key={item.id} style={{
              background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12,
              padding: "14px 18px", display: "flex", alignItems: "center", gap: 16,
            }}>
              {item.image && (
                <img src={item.image} alt={item.name}
                  style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", margin: "0 0 4px" }}>{item.name}</p>
                <p style={{ fontSize: 13, color: "#c97b63", margin: 0 }}>{item.price.toFixed(2)} $ each</p>
              </div>
              {/* Quantity */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{
                  width: 28, height: 28, borderRadius: "50%", border: "0.5px solid #f0d8d2",
                  background: "#fdf6f4", color: "#3d1f1a", fontSize: 16, cursor: "pointer",
                }}>−</button>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", minWidth: 16, textAlign: "center" }}>
                  {item.quantity}
                </span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{
                  width: 28, height: 28, borderRadius: "50%", border: "0.5px solid #f0d8d2",
                  background: "#fdf6f4", color: "#3d1f1a", fontSize: 16, cursor: "pointer",
                }}>+</button>
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", minWidth: 52, textAlign: "right" }}>
                {(item.price * item.quantity).toFixed(2)} $
              </span>
              <button onClick={() => removeFromCart(item.id)} style={{
                background: "none", border: "none", color: "#f09595", fontSize: 18, cursor: "pointer", padding: 4,
              }}>✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Points info */}
          <div style={{
            background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "16px 18px",
          }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 10px" }}>⭐ Your points</p>
            <p style={{ fontSize: 24, fontWeight: 500, color: "#c97b63", margin: "0 0 4px" }}>{points}</p>
            <p style={{ fontSize: 12, color: "#b08070", margin: "0 0 10px" }}>
              {pointsToNext} points until next 20$ coupon
            </p>
            {/* Progress bar */}
            <div style={{ background: "#fceee9", borderRadius: 999, height: 6, overflow: "hidden" }}>
              <div style={{
                width: `${((500 - pointsToNext) / 500) * 100}%`,
                height: "100%", background: "#c97b63", borderRadius: 999,
                transition: "width 0.4s",
              }} />
            </div>
            <p style={{ fontSize: 11, color: "#b08070", margin: "6px 0 0" }}>
              5 points per 1$ spent
            </p>
          </div>

          {/* Available coupons */}
          {coupons.filter(c => !c.used).length > 0 && (
            <div style={{
              background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "16px 18px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 10px" }}>🎟 Your coupons</p>
              {coupons.filter(c => !c.used).map(c => (
                <div key={c.code} style={{
                  background: "#fceee9", borderRadius: 8, padding: "8px 12px",
                  marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <span style={{ fontSize: 12, color: "#3d1f1a", fontFamily: "monospace" }}>{c.code}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#c97b63" }}>−20$</span>
                  <button
                    onClick={() => setCouponInput(c.code)}
                    style={{
                      fontSize: 11, padding: "3px 10px", background: "#2d1a1a",
                      color: "#f5e6e0", border: "none", borderRadius: 999, cursor: "pointer",
                    }}
                  >Apply</button>
                </div>
              ))}
            </div>
          )}

          {/* Order summary */}
          <div style={{
            background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "18px 18px",
          }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 14px" }}>Order summary</p>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#5a2d25", marginBottom: 6 }}>
              <span>Subtotal</span><span>{subtotal.toFixed(2)} $</span>
            </div>

            {/* Coupon input */}
            <div style={{ display: "flex", gap: 8, margin: "10px 0" }}>
              <input
                style={{ ...inputStyle, flex: 1 }}
                placeholder="Coupon code"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
              />
            </div>
            {couponInput && (
              <p style={{ fontSize: 12, margin: "0 0 8px", color: availableCoupon ? "#3b6d11" : "#f09595" }}>
                {availableCoupon ? "✅ Coupon applied — −20$" : "❌ Invalid or used coupon"}
              </p>
            )}

            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#3b6d11", marginBottom: 6 }}>
                <span>Discount</span><span>−{discount.toFixed(2)} $</span>
              </div>
            )}

            <div style={{
              display: "flex", justifyContent: "space-between",
              fontSize: 16, fontWeight: 500, color: "#3d1f1a",
              borderTop: "0.5px solid #f0d8d2", paddingTop: 10, marginTop: 4,
            }}>
              <span>Total</span><span>{total.toFixed(2)} $</span>
            </div>

            <p style={{ fontSize: 12, color: "#b08070", margin: "8px 0 14px" }}>
              You'll earn {pointsToEarn} points for this order
            </p>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              style={{
                width: "100%", padding: "11px 0", background: "#2d1a1a",
                color: "#f5e6e0", border: "none", borderRadius: 999,
                fontSize: 14, fontWeight: 500, cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
              onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
            >
              Pay now
            </button>
          </div>
        </div>
      </div>

      {/* Order history */}
      <OrderHistorySection />
    </div>
  )
}

function OrderHistorySection() {
  const { history } = useCart()
  if (history.length === 0) return null

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, color: "#3d1f1a", margin: "0 0 16px" }}>Order history</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {history.map(order => (
          <div key={order.id} style={{
            background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 12, padding: "16px 20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a" }}>{order.id}</span>
                <span style={{ fontSize: 12, color: "#b08070", marginLeft: 10 }}>{order.date}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {order.couponUsed && (
                  <span style={{ fontSize: 11, background: "#fceee9", color: "#993556", padding: "2px 10px", borderRadius: 999 }}>
                    Coupon used
                  </span>
                )}
                <span style={{ fontSize: 14, fontWeight: 500, color: "#c97b63" }}>{order.total.toFixed(2)} $</span>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {order.items.map(i => (
                <span key={i.id} style={{
                  fontSize: 12, background: "#fdf6f4", border: "0.5px solid #f0d8d2",
                  padding: "3px 10px", borderRadius: 999, color: "#5a2d25",
                }}>
                  {i.name} ×{i.quantity}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "#b08070", margin: "8px 0 0" }}>
              +{order.pointsEarned} points earned
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart