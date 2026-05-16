import { useState } from "react"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setLoggedIn(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-stone-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">

        {!loggedIn ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8">
              Welcome Back ☕
            </h1>

            <div className="flex flex-col gap-5">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-4 border rounded-xl outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 border rounded-xl outline-none"
              />

              <button
                onClick={handleLogin}
                className="bg-stone-800 text-white py-4 rounded-xl hover:bg-stone-900 transition"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </div>
          </>
        ) : (
          <div className="text-center">

            <h1 className="text-4xl font-bold mb-6">
              Logged In Successfully ✨
            </h1>

            <button
              onClick={() => setLoggedIn(false)}
              className="bg-red-500 text-white px-6 py-3 rounded-xl"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  )
}

export default Login