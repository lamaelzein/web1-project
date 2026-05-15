function Booking() {
  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-5xl font-bold text-stone-900 text-center mb-12">
        Reserve Your Spot ☕
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        <form className="flex flex-col gap-6">

          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-xl border border-stone-300"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-xl border border-stone-300"
          />

          <select className="p-4 rounded-xl border border-stone-300">

            <option>Painting</option>

            <option>Pottery</option>

            <option>Candle Making</option>

            <option>Bracelet Making</option>

          </select>

          <button className="bg-stone-800 text-white py-4 rounded-xl hover:bg-stone-900 transition">
            Book Now
          </button>

        </form>

      </div>

    </div>
  )
}

export default Booking