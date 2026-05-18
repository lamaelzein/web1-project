type Drink = {
  id: number;
  name: string;
  price: number;
};

type Booking = {
  id: number;
  name: string;
};

const Dashboard = () => {

  // ✅ Get user safely
  let user = { firstName: "User", lastName: "" };

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error: unknown) {
    console.error(error);
  }

  // ❌ DO NOT update localStorage here
  // (move this to login or profile page)

  let drinks: Drink[] = [];
  let bookings: Booking[] = [];

  try {
    const d = localStorage.getItem("drinks");
    if (d) drinks = JSON.parse(d);
  } catch {
    drinks = [];
  }

  try {
    const b = localStorage.getItem("bookings");
    if (b) bookings = JSON.parse(b);
  } catch {
    bookings = [];
  }

  return (
    <div>

      <h1>
        Welcome {user.firstName} {user.lastName}
      </h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "30px",
      }}>

        <div style={{
          padding: "20px",
          border: "1px solid #ccc",
          width: "200px",
        }}>
          <h2>Drinks</h2>
          <p>{drinks.length}</p>
        </div>

        <div style={{
          padding: "20px",
          border: "1px solid #ccc",
          width: "200px",
        }}>
          <h2>Bookings</h2>
          <p>{bookings.length}</p>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;