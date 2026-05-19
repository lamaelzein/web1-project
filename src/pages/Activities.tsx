import { useNavigate } from "react-router-dom"
import paintingImg from "../assets/painting.jpg"
import potteryImg from "../assets/pottery.jpg"
import candleImg from "../assets/candle.jpg"
import embroideryImg from "../assets/embroidery.jpg"
import photoSessionImg from "../assets/photoSession.jpg"
import teaImg from "../assets/tea.jpg"


type Activity = {
  id: number
  image?: string
  name: string
  description: string
  price: number
  duration: string
}

const activities: Activity[] = [
  { id: 1, image: paintingImg, name: "Painting",      description: "Express yourself on canvas in a relaxed atmosphere.",  price: 15, duration: "2h" },
  { id: 2, image: potteryImg,        name: "Pottery",       description: "Shape clay into something beautiful with your hands.", price: 18, duration: "2.5h" },
  { id: 3, image: candleImg,        name: "Candle Making", description: "Create your own scented candles to take home.",        price: 12, duration: "1.5h" },
  { id: 4, image: embroideryImg,        name: "Embroidery",    description: "Learn the art of needlework in a cozy setting.",       price: 10, duration: "2h" },
  { id: 5, image: photoSessionImg,        name: "Photo Session",    description: "A guided walk around the café with photography tips.", price: 8,  duration: "1h" },
  { id: 6, image: teaImg,        name: "Tea Ceremony",  description: "A calming guided tea ritual, just for you.",           price: 10, duration: "1h" },
]

function Activities() {
  const navigate = useNavigate()

  const handleBook = (activity: Activity) => {
    navigate("/dashboard/bookings", { state: { activity } })
  }

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: "32px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>
        Activities
      </h1>
      <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 28px" }}>
        Book a cozy experience at Soukoun ✨
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
      }}>
        {activities.map((a) => (
          <div
            key={a.id}
            style={{
              background: "#fff",
              border: "0.5px solid #f0d8d2",
              borderRadius: 16,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {/* Image or emoji cover */}
            {a.image ? (
              <img
                src={a.image}
                alt={a.name}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />
            ) : (
              <div style={{
                width: "100%", height: 160,
                background: "#fceee9",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 56,
              }}>
              </div>
            )}

            {/* Content */}
            <div style={{
              padding: "16px 18px",
              display: "flex", flexDirection: "column", gap: 8, flex: 1,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 500, color: "#3d1f1a", margin: 0 }}>
                {a.name}
              </h2>
              <p style={{ fontSize: 13, color: "#b08070", margin: 0, lineHeight: 1.5, flex: 1 }}>
                {a.description}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "#c97b63" }}>
                  {a.price.toFixed(2)} €
                </span>
                <span style={{
                  fontSize: 11, color: "#b08070",
                  background: "#fceee9", padding: "2px 10px", borderRadius: 999,
                }}>
                  {a.duration}
                </span>
              </div>

              <button
                onClick={() => handleBook(a)}
                style={{
                  padding: "9px 0", background: "#2d1a1a",
                  color: "#f5e6e0", border: "none",
                  borderRadius: 999, fontSize: 13, cursor: "pointer",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
                onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
              >
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activities