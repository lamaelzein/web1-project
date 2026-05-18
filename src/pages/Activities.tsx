function Activities() {
  return (
    <div className="min-h-screen bg-stone-100 px-10 py-16">

      <h1 className="text-5xl font-bold text-center mb-14">
        Our Activities ✨
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          🎨 Painting
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          🏺 Pottery
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">
          🕯️ Candle Making
        </div>

      </div>
    </div>
  );
}

export default Activities;