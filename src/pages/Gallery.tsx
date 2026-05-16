import coffee1 from "../assets/coffee1.jpg"
import coffee2 from "../assets/coffee2.jpg"
import pottery from "../assets/pottery.jpg"
import candle from "../assets/candle.jpg"
import activities from "../assets/activities.jpg"
import painting from "../assets/painting.jpg"
import reading from "../assets/reading.jpg"
import floral from "../assets/floral.jpg"
import craft from "../assets/craft.jpg"
function Gallery() {
  const images = [
    coffee1,
    coffee2,
    pottery,
    candle,
    activities,
    painting,
    reading,
    floral,
    craft,
  ]

  return (
    <div className="min-h-screen bg-stone-100 p-10">

      <h1 className="text-5xl font-bold text-stone-900 mb-10 text-center">
        ✨ Gallery ✨
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {images.map((img, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl shadow-xl"
          >

            <img
              src={img}
              alt="Gallery"
              className="w-full h-72 object-cover hover:scale-110 transition duration-500"
            />

          </div>
        ))}

      </div>

    </div>
  )
}

export default Gallery