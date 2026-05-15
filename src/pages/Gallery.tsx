import coffee1 from "../assets/coffee1.jpg"
import coffee2 from "../assets/coffee2.jpg"
import pottery from "../assets/pottery.jpg"
import candle from "../assets/candle.jpg"
import activities from "../assets/activities.jpg"
import painting from "../assets/painting.jpg"

function Gallery() {
  const images = [
    coffee1,
    coffee2,
    pottery,
    candle,
    activities,
    painting,
  ]

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-stone-900 mb-8">
         Gallery
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <img key={i} src={img} className="rounded-2xl shadow-lg" />
        ))}
      </div>
    </div>
  )
}

export default Gallery