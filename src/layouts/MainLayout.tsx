import { Outlet, Link, useNavigate } from "react-router-dom";

const MainLayout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <aside style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>

        <h2>☕ Soukoun</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/drinks">Drinks</Link>
        <Link to="/dashboard/bookings">Bookings</Link>
        <Link to="/dashboard/activities">Activities</Link>
<Link to="/dashboard/about">About</Link>
<Link to="/dashboard/gallery">Gallery</Link>
<Link to="/dashboard/menu">Menu</Link>
<Link to="/dashboard/cart">Cart</Link>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            background: "red",
            color: "white",
            border: "none",
            padding: "10px"
          }}
        >
          Logout
        </button>

      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;