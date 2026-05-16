import { useState } from "react"

function Login() {
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const login = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setLoggedIn(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-96">

        {!loggedIn ? (
          <>
            <h1 className="text-3xl mb-6">Login</h1>

            <button
              onClick={login}
              className="bg-stone-800 text-white w-full py-3 rounded-xl"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-6">Welcome ☕</h1>

            <button
              onClick={() => setLoggedIn(false)}
              className="bg-red-500 text-white w-full py-3 rounded-xl"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </div>
  )
}

export default Login