import coffee1 from "../assets/coffee1.jpg"
import coffee2 from "../assets/coffee2.jpg"
import pottery from "../assets/pottery.jpg"
import candle from "../assets/candle.jpg"
import activities from "../assets/activities.jpg"
import painting from "../assets/painting.jpg"
import reading from "../assets/reading.jpg"
import floral from "../assets/floral.jpg"
import craft from "../assets/craft.jpg"
 export default function Gallery() {
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
    <div style={{ padding: "40px" }}>
      <h1>Gallery 📸</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`gallery-${index}`}
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        ))}
      </div>
    </div>
  );
}