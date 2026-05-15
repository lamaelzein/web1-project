
import croissant from "../assets/croissant.jpg"
import shake from "../assets/shake.jpg"
import nescafe from "../assets/nescafe.jpg"
import icedcoffee from "../assets/icedcoffee.jpg"
import cupcake from "../assets/cupcake.jpg"
import cookies from "../assets/cookies.jpg"

type MenuItem = {
  name: string
  price: string
  image: string
}

function Menu() {
  const menuItems: MenuItem[] = [
    {
      name: "Butter Croissant 🥐",
      price: "$4",
      image: croissant,
    },
    {
      name: "Chocolate Shake 🍫",
      price: "$6",
      image: shake,
    },
    {
      name: "Nescafe ☕",
      price: "$3",
      image: nescafe,
    },
    {
      name: "Iced Coffee 🧋",
      price: "$5",
      image: icedcoffee,
    },
    {
      name: "Vanilla Cupcake 🧁",
      price: "$4",
      image: cupcake,
    },
    {
      name: "Cookies 🍪",
      price: "$3",
      image: cookies,
    },
  ]

  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-5xl font-bold text-stone-900 text-center mb-14">
        Our Menu ☕
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                {item.name}
              </h2>

              <p className="text-xl text-stone-600 mb-4">
                {item.price}
              </p>

              <button className="bg-stone-800 text-white px-6 py-3 rounded-full hover:bg-stone-900 transition">
                Order Now
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Menu
