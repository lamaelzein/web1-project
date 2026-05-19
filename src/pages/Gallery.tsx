import { useState } from "react"
import { X, ZoomIn, Coffee, Palette, Flower } from "lucide-react"

import coffee1    from "../assets/coffee1.jpg"
import coffee2    from "../assets/coffee2.jpg"
import pottery    from "../assets/pottery.jpg"
import candle     from "../assets/candle.jpg"
import activities from "../assets/activities.jpg"
import painting   from "../assets/painting.jpg"
import reading    from "../assets/reading.jpg"
import floral     from "../assets/floral.jpg"
import craft      from "../assets/craft.jpg"

type Category = "all" | "drinks" | "activities" | "vibes"

const images: { src: string; label: string; category: Category }[] = [
  { src: coffee1,    label: "Morning brew",    category: "drinks"     },
  { src: coffee2,    label: "Latte art",        category: "drinks"     },
  { src: pottery,    label: "Pottery session",  category: "activities" },
  { src: candle,     label: "Candle making",    category: "activities" },
  { src: activities, label: "Creative corner",  category: "activities" },
  { src: painting,   label: "Painting class",   category: "activities" },
  { src: reading,    label: "Reading nook",     category: "vibes"      },
  { src: floral,     label: "Floral vibes",     category: "vibes"      },
  { src: craft,      label: "Craft afternoon",  category: "vibes"      },
]

const filters: { label: string; value: Category; icon: React.ReactNode }[] = [
  { label: "All",        value: "all",        icon: <ZoomIn size={13} />   },
  { label: "Drinks",     value: "drinks",     icon: <Coffee size={13} />   },
  { label: "Activities", value: "activities", icon: <Palette size={13} />  },
  { label: "Vibes",      value: "vibes",      icon: <Flower size={13} />   },
]

export default function Gallery() {
  const [active,   setActive]   = useState<Category>("all")
  const [selected, setSelected] = useState<number | null>(null)

  const filtered = active === "all" ? images : images.filter(i => i.category === active)

  const handlePrev = () => {
    if (selected === null) return
    setSelected((selected - 1 + filtered.length) % filtered.length)
  }

  const handleNext = () => {
    if (selected === null) return
    setSelected((selected + 1) % filtered.length)
  }

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: "32px", fontFamily: "sans-serif" }}>

      {/* Header */}
      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>Gallery</h1>
      <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 24px" }}>A peek into our cozy world</p>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {filters.map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => { setActive(value); setSelected(null) }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 18px", borderRadius: 999,
              border: active === value ? "1.5px solid #c97b63" : "0.5px solid #f0d8d2",
              background: active === value ? "#2d1a1a" : "#fff",
              color: active === value ? "#f5e6e0" : "#b08070",
              fontSize: 13, fontWeight: active === value ? 500 : 400,
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {filtered.map((img, index) => (
          <div
            key={img.src}
            onClick={() => setSelected(index)}
            style={{
              position: "relative", borderRadius: 14,
              overflow: "hidden", cursor: "pointer",
              aspectRatio: "4/3",
              border: "0.5px solid #f0d8d2",
            }}
            onMouseEnter={e => {
              const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement
              if (overlay) overlay.style.opacity = "1"
            }}
            onMouseLeave={e => {
              const overlay = e.currentTarget.querySelector(".overlay") as HTMLElement
              if (overlay) overlay.style.opacity = "0"
            }}
          >
            <img
              src={img.src}
              alt={img.label}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <div
              className="overlay"
              style={{
                position: "absolute", inset: 0,
                background: "rgba(45,26,26,0.55)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 8, opacity: 0, transition: "opacity 0.2s",
              }}
            >
              <ZoomIn size={24} color="#f5e6e0" />
              <span style={{ fontSize: 13, color: "#f5e6e0", fontWeight: 500 }}>{img.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(20,10,10,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: 24,
          }}
        >
          {/* Close */}
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "absolute", top: 20, right: 20,
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} color="#f5e6e0" />
          </button>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); handlePrev() }}
            style={{
              position: "absolute", left: 20,
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 24, color: "#f5e6e0",
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 700, width: "100%", textAlign: "center" }}
          >
            <img
              src={filtered[selected].src}
              alt={filtered[selected].label}
              style={{
                width: "100%", maxHeight: "75vh",
                objectFit: "contain", borderRadius: 16,
              }}
            />
            <p style={{ fontSize: 14, color: "#f5c4b3", marginTop: 12, fontWeight: 500 }}>
              {filtered[selected].label}
            </p>
            <p style={{ fontSize: 12, color: "#a87c72", margin: "4px 0 0" }}>
              {selected + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); handleNext() }}
            style={{
              position: "absolute", right: 20,
              width: 44, height: 44, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 24, color: "#f5e6e0",
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}