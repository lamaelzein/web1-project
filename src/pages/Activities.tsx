import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Palette, Flame, Scissors, Camera, Coffee, Leaf, Plus, Pencil, X, Upload, Trash2 } from "lucide-react"
import paintingImg from "../assets/painting.jpg"
import potteryImg from "../assets/pottery.jpg"
import candleImg from "../assets/candle.jpg"
import embroideryImg from "../assets/embroidery.jpg"
import photoSessionImg from "../assets/photoSession.jpg"
import teaImg from "../assets/tea.jpg"

type Activity = {
  id: number
  name: string
  description: string
  price: number
  duration: string
  image?: string
  isDefault?: boolean
}

const defaultActivities: Activity[] = [
  { id: 1, name: "Painting",      description: "Express yourself on canvas in a relaxed atmosphere.",  price: 15, duration: "2h",   image: paintingImg,     isDefault: true },
  { id: 2, name: "Pottery",       description: "Shape clay into something beautiful with your hands.", price: 18, duration: "2.5h", image: potteryImg,      isDefault: true },
  { id: 3, name: "Candle Making", description: "Create your own scented candles to take home.",        price: 12, duration: "1.5h", image: candleImg,       isDefault: true },
  { id: 4, name: "Embroidery",    description: "Learn the art of needlework in a cozy setting.",       price: 10, duration: "2h",   image: embroideryImg,   isDefault: true },
  { id: 5, name: "Photo Walk",    description: "A guided walk around the café with photography tips.", price: 8,  duration: "1h",   image: photoSessionImg, isDefault: true },
  { id: 6, name: "Tea Ceremony",  description: "A calming guided tea ritual, just for you.",           price: 10, duration: "1h",   image: teaImg,          isDefault: true },
]

const defaultIcons: Record<string, React.ReactNode> = {
  "Painting":      <Palette size={40} color="#c97b63" />,
  "Pottery":       <Leaf size={40} color="#c97b63" />,
  "Candle Making": <Flame size={40} color="#c97b63" />,
  "Embroidery":    <Scissors size={40} color="#c97b63" />,
  "Photo Walk":    <Camera size={40} color="#c97b63" />,
  "Tea Ceremony":  <Coffee size={40} color="#c97b63" />,
}

const STORAGE_KEY = "activities_custom"

function loadActivities(): Activity[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return [...defaultActivities, ...JSON.parse(saved)]
  } catch { /* ignore */ }
  return defaultActivities
}

function saveCustomActivities(all: Activity[]) {
  const custom = all.filter(a => !a.isDefault)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom))
}

type FormState = {
  name: string
  description: string
  price: string
  duration: string
  image: string
}

const emptyForm: FormState = { name: "", description: "", price: "", duration: "", image: "" }

function Activities() {
  const navigate = useNavigate()
  const [activities, setActivities]     = useState<Activity[]>(loadActivities)
  const [showModal, setShowModal]       = useState(false)
  const [editTarget, setEditTarget]     = useState<Activity | null>(null)
  const [form, setForm]                 = useState<FormState>(emptyForm)
  const [preview, setPreview]           = useState("")
  const [confirmDelete, setConfirmDelete] = useState<Activity | null>(null)
  const [nameError, setNameError]       = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const handleBook = (activity: Activity) => {
    navigate("/dashboard/bookings", { state: { activity } })
  }

  const openAdd = () => {
    setEditTarget(null)
    setForm(emptyForm)
    setPreview("")
    setNameError("")
    setShowModal(true)
  }

  const openEdit = (a: Activity) => {
    setEditTarget(a)
    setForm({
      name:        a.name,
      description: a.description,
      price:       String(a.price),
      duration:    a.duration,
      image:       a.image || "",
    })
    setPreview(a.image || "")
    setNameError("")
    setShowModal(true)
  }

  const handleDelete = (id: number) => {
    const updated = activities.filter(a => a.id !== id)
    setActivities(updated)
    saveCustomActivities(updated)
    setConfirmDelete(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setForm(f => ({ ...f, image: result }))
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!form.name || !form.price || !form.duration) return

    // Check duplicate name only when adding new
    if (!editTarget) {
      const nameExists = activities.some(
        a => a.name.toLowerCase().trim() === form.name.toLowerCase().trim()
      )
      if (nameExists) {
        setNameError(`An activity named "${form.name}" already exists.`)
        return
      }
    }

    setNameError("")

    let updated: Activity[]

    if (editTarget) {
      updated = activities.map(a => a.id === editTarget.id ? {
        ...a,
        name:        form.name,
        description: form.description,
        price:       parseFloat(form.price),
        duration:    form.duration,
        image:       form.image || a.image,
      } : a)
    } else {
      const newActivity: Activity = {
        id:          Date.now(),
        name:        form.name,
        description: form.description,
        price:       parseFloat(form.price),
        duration:    form.duration,
        image:       form.image || undefined,
      }
      updated = [...activities, newActivity]
    }

    setActivities(updated)
    saveCustomActivities(updated)
    setShowModal(false)
  }

  const inputStyle = {
    width: "100%", padding: "9px 12px", fontSize: 13,
    border: "0.5px solid #f0d8d2", borderRadius: 8,
    background: "#fdf6f4", color: "#3d1f1a",
    outline: "none", boxSizing: "border-box" as const,
  }

  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: "32px", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>Activities</h1>
          <p style={{ fontSize: 14, color: "#b08070", margin: 0 }}>Book a cozy experience at Soukoun</p>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "9px 18px", background: "#2d1a1a",
            color: "#f5e6e0", border: "none", borderRadius: 999,
            fontSize: 13, cursor: "pointer",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
          onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
        >
          <Plus size={15} color="#f5e6e0" /> Add activity
        </button>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
      }}>
        {activities.map((a) => (
          <div
            key={a.id}
            style={{
              background: "#fff", border: "0.5px solid #f0d8d2",
              borderRadius: 16, overflow: "hidden",
              display: "flex", flexDirection: "column",
              transition: "transform 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {a.image ? (
              <img src={a.image} alt={a.name}
                style={{ width: "100%", height: 160, objectFit: "cover" }} />
            ) : (
              <div style={{
                width: "100%", height: 160, background: "#fceee9",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {defaultIcons[a.name] ?? <Palette size={40} color="#c97b63" />}
              </div>
            )}

            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
              <h2 style={{ fontSize: 16, fontWeight: 500, color: "#3d1f1a", margin: 0 }}>{a.name}</h2>
              <p style={{ fontSize: 13, color: "#b08070", margin: 0, lineHeight: 1.5, flex: 1 }}>{a.description}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 500, color: "#c97b63" }}>${a.price.toFixed(2)}</span>
                <span style={{ fontSize: 11, color: "#b08070", background: "#fceee9", padding: "2px 10px", borderRadius: 999 }}>
                  {a.duration}
                </span>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button
                  onClick={() => handleBook(a)}
                  style={{
                    flex: 1, padding: "8px 0", background: "#2d1a1a",
                    color: "#f5e6e0", border: "none", borderRadius: 999,
                    fontSize: 13, cursor: "pointer",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#c97b63")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#2d1a1a")}
                >
                  Book now
                </button>
                <button
                  onClick={() => openEdit(a)}
                  style={{
                    width: 36, height: 36, borderRadius: 999,
                    background: "#fceee9", border: "0.5px solid #f0d8d2",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0,
                  }}
                >
                  <Pencil size={14} color="#c97b63" />
                </button>
                <button
                  onClick={() => setConfirmDelete(a)}
                  style={{
                    width: 36, height: 36, borderRadius: 999,
                    background: "rgba(220,80,80,0.08)",
                    border: "0.5px solid rgba(220,80,80,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0,
                  }}
                >
                  <Trash2 size={14} color="#f09595" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div
          onClick={() => setConfirmDelete(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(20,10,10,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1001, padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 20,
              padding: "28px", width: "100%", maxWidth: 380,
              boxShadow: "0 20px 60px rgba(45,26,26,0.2)",
              textAlign: "center",
            }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "rgba(220,80,80,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <Trash2 size={22} color="#f09595" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 500, color: "#3d1f1a", margin: "0 0 8px" }}>
              Delete activity?
            </h3>
            <p style={{ fontSize: 13, color: "#b08070", margin: "0 0 20px" }}>
              Are you sure you want to delete <strong style={{ color: "#3d1f1a" }}>{confirmDelete.name}</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                style={{
                  flex: 1, padding: "10px 0",
                  background: "rgba(220,80,80,0.85)", color: "#fff",
                  border: "none", borderRadius: 999,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}
              >
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1, padding: "10px 0", background: "transparent",
                  color: "#b08070", border: "0.5px solid #f0d8d2",
                  borderRadius: 999, fontSize: 13, cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(20,10,10,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 20,
              padding: "28px", width: "100%", maxWidth: 480,
              boxShadow: "0 20px 60px rgba(45,26,26,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontSize: 17, fontWeight: 500, color: "#3d1f1a", margin: 0 }}>
                {editTarget ? "Edit activity" : "Add new activity"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#fdf6f4", border: "0.5px solid #f0d8d2",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} color="#b08070" />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Image upload */}
              <div>
                <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 6 }}>Photo</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    width: "100%", height: 140, borderRadius: 12,
                    border: "1px dashed #f0d8d2", background: "#fdf6f4",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    cursor: "pointer", overflow: "hidden",
                  }}
                >
                  {preview ? (
                    <img src={preview} alt="preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <>
                      <Upload size={24} color="#c97b63" />
                      <p style={{ fontSize: 12, color: "#b08070", margin: "8px 0 0" }}>Click to upload photo</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*"
                  style={{ display: "none" }} onChange={handleImageUpload} />
              </div>

              {/* Name */}
              <div>
                <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>
                  Activity name *
                </label>
                <input
                  style={{
                    ...inputStyle,
                    border: nameError ? "0.5px solid #f09595" : "0.5px solid #f0d8d2",
                  }}
                  placeholder="e.g. Watercolor Workshop"
                  value={form.name}
                  onChange={e => {
                    setForm(f => ({ ...f, name: e.target.value }))
                    setNameError("")
                  }}
                />
                {nameError && (
                  <p style={{
                    fontSize: 12, color: "#f09595",
                    margin: "5px 0 0",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <X size={11} color="#f09595" /> {nameError}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>Description</label>
                <textarea
                  style={{ ...inputStyle, resize: "none", height: 72, fontFamily: "sans-serif" }}
                  placeholder="Describe the activity..."
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>

              {/* Price + Duration */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>Price ($) *</label>
                  <input style={inputStyle} type="number" placeholder="e.g. 15"
                    value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#b08070", display: "block", marginBottom: 5 }}>Duration *</label>
                  <input style={inputStyle} placeholder="e.g. 2h"
                    value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.price || !form.duration}
                style={{
                  flex: 1, padding: "10px 0",
                  background: !form.name || !form.price || !form.duration ? "#ccc" : "#2d1a1a",
                  color: "#f5e6e0", border: "none", borderRadius: 999,
                  fontSize: 13, fontWeight: 500,
                  cursor: !form.name || !form.price || !form.duration ? "not-allowed" : "pointer",
                }}
                onMouseEnter={e => { if (form.name && form.price && form.duration) e.currentTarget.style.background = "#c97b63" }}
                onMouseLeave={e => { if (form.name && form.price && form.duration) e.currentTarget.style.background = "#2d1a1a" }}
              >
                {editTarget ? "Save changes" : "Add activity"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px 20px", background: "transparent", color: "#b08070",
                  border: "0.5px solid #f0d8d2", borderRadius: 999, fontSize: 13, cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Activities