type WorkshopCardProps = {
  title: string
  description: string
  image: string
}

function WorkshopCard({ title, description, image }: WorkshopCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition">

      <img src={image} className="w-full h-64 object-cover" />

      <div className="p-6">

        <h2 className="text-2xl font-bold text-stone-900 mb-3">
          {title}
        </h2>

        <p className="text-stone-600 mb-5">
          {description}
        </p>

        <button className="bg-stone-800 text-white px-6 py-3 rounded-full hover:bg-stone-900 transition">
          Reserve Spot
        </button>

      </div>
    </div>
  )
}

export default WorkshopCard