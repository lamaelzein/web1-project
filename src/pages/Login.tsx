import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

type Mode = "login" | "register"

function Login() {
  const navigate = useNavigate()
  const { loadUserData } = useCart()
  const [mode, setMode] = useState<Mode>("login")
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError("")
  }

  const handleRegister = () => {
    if (!form.firstName || !form.email || !form.password) {
      setError("Please fill in all required fields.")
      return
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if (users.find((u: { email: string }) => u.email === form.email)) {
      setError("This email is already registered.")
      return
    }
    const newUser = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    }
    localStorage.setItem("users", JSON.stringify([...users, newUser]))
    setError("")
    setMode("login")
    setForm({ firstName: "", lastName: "", email: form.email, password: "" })
  }

  const handleLogin = () => {
    if (!form.email || !form.password) {
      setError("Please enter your email and password.")
      return
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find(
      (u: { email: string; password: string }) =>
        u.email === form.email && u.password === form.password
    )
    if (!user) {
      setError("Incorrect email or password.")
      return
    }

    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", "logged-in")
    localStorage.setItem("currentUserEmail", form.email)

    // Load this specific user's data into CartContext
    loadUserData(form.email)

    navigate("/dashboard")
  }

  const inputStyle = {
    width: "100%", padding: "10px 14px", fontSize: 14,
    border: "0.5px solid #f0d8d2", borderRadius: 10,
    background: "#fdf6f4", color: "#3d1f1a",
    outline: "none", boxSizing: "border-box" as const, marginTop: 4,
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#fdf6f4",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "sans-serif", padding: 20,
    }}>
      <div style={{
        background: "#fff", border: "0.5px solid #f0d8d2",
        borderRadius: 20, padding: "40px 36px",
        width: "100%", maxWidth: 400,
      }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#2d1a1a", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 24, margin: "0 auto 12px",
          }}>☕</div>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "#3d1f1a", margin: "0 0 4px" }}>Soukoun</h1>
          <p style={{ fontSize: 13, color: "#b08070", margin: 0 }}>Your cozy corner ✨</p>
        </div>

        <div style={{
          display: "flex", background: "#fdf6f4",
          borderRadius: 999, padding: 4, marginBottom: 24,
          border: "0.5px solid #f0d8d2",
        }}>
          {(["login", "register"] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setError("") }} style={{
              flex: 1, padding: "8px 0", borderRadius: 999, border: "none",
              background: mode === m ? "#2d1a1a" : "transparent",
              color: mode === m ? "#f5e6e0" : "#b08070",
              fontSize: 13, fontWeight: mode === m ? 500 : 400,
              cursor: "pointer", transition: "all 0.15s",
            }}>
              {m === "login" ? "Sign in" : "Register"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "register" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: "#b08070" }}>First name *</label>
                <input name="firstName" style={inputStyle} placeholder="Lama"
                  value={form.firstName} onChange={handleChange} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#b08070" }}>Last name</label>
                <input name="lastName" style={inputStyle} placeholder="El Zein"
                  value={form.lastName} onChange={handleChange} />
              </div>
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, color: "#b08070" }}>Email *</label>
            <input name="email" type="email" style={inputStyle} placeholder="you@email.com"
              value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#b08070" }}>Password *</label>
            <input name="password" type="password" style={inputStyle} placeholder="••••••••"
              value={form.password} onChange={handleChange} />
          </div>
        </div>

        {error && (
          <p style={{ fontSize: 12, color: "#f09595", margin: "12px 0 0", textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          onClick={mode === "login" ? handleLogin : handleRegister}
          style={{
            width: "100%", marginTop: 20, padding: "11px 0",
            background: "#2d1a1a", color: "#f5e6e0", border: "none",
            borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
          onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
        >
          {mode === "login" ? "Sign in" : "Create account"}
        </button>

        <p style={{ fontSize: 12, color: "#b08070", textAlign: "center", marginTop: 16 }}>
          {mode === "login"
            ? <><span>No account yet? </span><span style={{ color: "#c97b63", cursor: "pointer" }} onClick={() => setMode("register")}>Register here</span></>
            : <><span>Already have an account? </span><span style={{ color: "#c97b63", cursor: "pointer" }} onClick={() => setMode("login")}>Sign in</span></>
          }
        </p>
      </div>
    </div>
  )
}

export default Login