import { MapPin, Clock, Phone, Mail, AtSign, Heart } from "lucide-react"

function About() {
  return (
    <div style={{ minHeight: "100%", background: "#fdf6f4", padding: "32px", fontFamily: "sans-serif" }}>

      <h1 style={{ fontSize: 26, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>About Soukoun</h1>
      <p style={{ fontSize: 14, color: "#b08070", margin: "0 0 28px" }}>Our story & where to find us</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Story */}
          <div style={{ background: "#2d1a1a", borderRadius: 16, padding: "24px 22px" }}>
            <p style={{ fontSize: 22, fontWeight: 500, color: "#f5e6e0", margin: "0 0 12px" }}>
              A place just for you ☕
            </p>
            <p style={{ fontSize: 13, color: "#a87c72", lineHeight: 1.8, margin: "0 0 10px" }}>
              Soukoun was born from a simple idea — every girl deserves a quiet, beautiful space
              to breathe, create, and enjoy. We built this café as a sanctuary away from the noise.
            </p>
            <p style={{ fontSize: 13, color: "#a87c72", lineHeight: 1.8, margin: 0 }}>
              From handcrafted drinks to cozy activities, everything here is designed with care,
              warmth, and a touch of magic.
            </p>
          </div>

          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

            {/* Hours */}
            <div style={{
              background: "#fff", border: "0.5px solid #f0d8d2",
              borderRadius: 12, padding: "14px 18px",
              display: "flex", alignItems: "flex-start", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#fceee9", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Clock size={16} color="#c97b63" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 6px" }}>Opening hours</p>
                {[
                  { day: "Mon – Thu", hours: "10:00 – 22:00" },
                  { day: "Fri – Sat", hours: "10:00 – 23:00" },
                  { day: "Sunday",    hours: "12:00 – 21:00" },
                ].map(({ day, hours }) => (
                  <div key={day} style={{ display: "flex", justifyContent: "space-between", gap: 24, marginBottom: 3 }}>
                    <span style={{ fontSize: 12, color: "#b08070" }}>{day}</span>
                    <span style={{ fontSize: 12, color: "#3d1f1a", fontWeight: 500 }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div style={{
              background: "#fff", border: "0.5px solid #f0d8d2",
              borderRadius: 12, padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "#fceee9", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <MapPin size={16} color="#c97b63" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 3px" }}>Our location</p>
                <p style={{ fontSize: 12, color: "#b08070", margin: 0 }}>Abu Samra, Tripoli, Lebanon</p>
              </div>
              <a
                href="https://maps.app.goo.gl/3fimvaiGfQfWQHDv6?g_st=ipc"
                target="_blank"
                rel="noreferrer"
                style={{
                  marginLeft: "auto", fontSize: 11, color: "#c97b63",
                  textDecoration: "none", padding: "5px 12px",
                  border: "0.5px solid #f0d8d2", borderRadius: 999,
                  display: "flex", alignItems: "center", gap: 4, flexShrink: 0,
                }}
              >
                <MapPin size={10} color="#c97b63" /> Open in Maps
              </a>
            </div>

            {/* Contact */}
            <div style={{
              background: "#fff", border: "0.5px solid #f0d8d2",
              borderRadius: 12, padding: "14px 18px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 10px" }}>Contact us</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: <Phone  size={13} color="#c97b63" />, label: "+961 70 781 311"    },
                  { icon: <Mail   size={13} color="#c97b63" />, label: "hello@soukoun.com" },
                  { icon: <AtSign size={13} color="#c97b63" />, label: "@soukoun.cafe"     },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {icon}
                    <span style={{ fontSize: 12, color: "#5a2d25" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Made with love */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "12px", background: "#fff",
            border: "0.5px solid #f0d8d2", borderRadius: 12,
            fontSize: 12, color: "#b08070",
          }}>
            Made with <Heart size={12} color="#c97b63" fill="#c97b63" /> for every girl who needs a break
          </div>
        </div>

        {/* RIGHT — Map */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          <div style={{
            background: "#fff", border: "0.5px solid #f0d8d2",
            borderRadius: 16, overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 18px", borderBottom: "0.5px solid #f0d8d2",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <MapPin size={14} color="#c97b63" />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a" }}>Find us here</span>
              <span style={{ fontSize: 12, color: "#b08070", marginLeft: 4 }}>Abu Samra, Tripoli</span>
            </div>
                  
            <iframe   /* hayde esma Google Maps embed, bnkhd shi esmo iframe bikhlina nfth website bi alb l website tabaana,khdna website location uni mn google maps*/
              title="Soukoun location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.341264878326!2d35.83646720000001!3d34.4180857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1521f6c858fa333b%3A0xce5ecd9fa09d4d06!2sCity%20University!5e0!3m2!1sen!2sde!4v1779209520385!5m2!1sen!2sde" 
              width="100%"
              height="340"
              style={{ border: "none", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Why Soukoun */}
          <div style={{ background: "#fff", border: "0.5px solid #f0d8d2", borderRadius: 16, padding: "20px" }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: "#3d1f1a", margin: "0 0 14px" }}>
              Why Soukoun? 
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "🌸", title: "Girls only space",    desc: "A safe, cozy environment made just for you"       },
                { icon: "☕", title: "Handcrafted drinks",  desc: "Every cup made with love and quality ingredients"  },
                { icon: "🎨", title: "Creative activities", desc: "Painting, pottery, candle making and more"         },
                { icon: "⭐", title: "Loyalty rewards",     desc: "Earn points and get free coupons with every order" },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "#fceee9", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {icon}
                  </span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#3d1f1a", margin: "0 0 2px" }}>{title}</p>
                    <p style={{ fontSize: 12, color: "#b08070", margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About