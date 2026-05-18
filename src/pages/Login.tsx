import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      const data = await loginUser(
        username,
        password
      );

      localStorage.setItem(
        "token",
        data.accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      navigate("/dashboard");

    
    } catch {

      setError("Invalid username or password");

    }
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >

        <h1>Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>

        {error && (
          <p>{error}</p>
        )}

      </form>

    </div>
  );
};

export default Login;