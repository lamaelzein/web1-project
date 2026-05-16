import { useState } from "react"

function Login() {
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert("Login Successful")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-stone-100">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8">
          Login ☕
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            className="p-4 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-4 border rounded-xl"
          />

          <button
            onClick={handleLogin}
            className="bg-stone-800 text-white py-4 rounded-xl"
          >
            {loading ? "Loading..." : "Login"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default Login