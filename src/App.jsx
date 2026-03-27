import React, { useEffect, useRef, useState, createContext, useContext } from 'react'
import './App.css'
import cathedral3 from './assets/cathedral3.jpeg'
import cathedralBw from './assets/cathedral_bw.jpeg'
import cathedral4 from './assets/cathedral4.jpeg'
import cathedral5 from './assets/cathedral5.jpeg'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

// ── Context API ───────────────────────────────────────────────────
const RSVPContext = createContext(null)

function RSVPProvider({ children }) {
  const [guests, setGuests] = useState([])
  const addGuest = (guest) => setGuests(prev => [...prev, guest])
  return (
    <RSVPContext.Provider value={{ guests, addGuest }}>
      {children}
    </RSVPContext.Provider>
  )
}

// ── useInView ─────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.12, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

// ── AnimatedSection ───────────────────────────────────────────────
function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`animated-section ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ── OrnamentalDivider ─────────────────────────────────────────────
function OrnamentalDivider({ light = false }) {
  return (
    <div className={`ornament-divider ${light ? 'light' : ''}`}>
      <span className="ornament-line" />
      <span className="ornament-diamond">◆</span>
      <span className="ornament-line" />
      <span className="ornament-diamond small">◆</span>
      <span className="ornament-line short" />
    </div>
  )
}

// ── useCounter ────────────────────────────────────────────────────
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = () => setCount(c => c + 1)
  const reset = () => setCount(0)
  return { count, increment, reset }
}

// ── useFetch ──────────────────────────────────────────────────────
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!url) return
    setLoading(true)
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(e => { setError(e); setLoading(false) })
  }, [url])
  return { data, loading, error }
}

// ── Wedding Party Data ────────────────────────────────────────────
const WEDDING_PARTY = {
  brideFamily: [
    { name: 'James & Elena Reyes', role: 'Parents of the Bride' },
    { name: 'Carlos Reyes', role: 'Brother of the Bride' },
  ],
  groomFamily: [
    { name: 'Antonio & Maria Santos', role: 'Parents of the Groom' },
    { name: 'Isabella Santos', role: 'Sister of the Groom' },
  ],
  principalSponsors: [
    { name: 'Robert & Clara Mendez', role: 'Ninong & Ninang' },
    { name: 'Eduardo & Patricia Lim', role: 'Ninong & Ninang' },
    { name: 'Miguel & Teresa Cruz', role: 'Ninong & Ninang' },
    { name: 'Fernando & Ana Dela Cruz', role: 'Ninong & Ninang' },
  ],
  secondary: [
    { name: 'Lucas Reyes', role: 'Best Man' },
    { name: 'Camille Santos', role: 'Maid of Honor' },
    { name: 'Marco Jr. Santos', role: 'Ring Bearer' },
    { name: 'Lily Reyes', role: 'Flower Girl' },
    { name: 'Nina Cruz', role: 'Bridesmaid' },
    { name: 'Diego Mendez', role: 'Groomsman' },
    { name: 'Sofia Lim', role: 'Bridesmaid' },
    { name: 'Rafael Torres', role: 'Groomsman' },
  ]
}

// ── Theme Music (auto-play on load) ──────────────────────────────
function ThemeMusic() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [visible, setVisible] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // "Close To You" — royalty-free cover via SoundHelix
    // Replace src with your own audio file path in /public for the real song
    const audio = new Audio('/close-to-you.mp3')
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    // Try autoplay — browsers require user interaction first, so we catch silently
    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Autoplay blocked — show the play button
      }
      setVisible(true)
    }
    // Small delay so the page loads first
    const timer = setTimeout(tryPlay, 800)
    return () => {
      clearTimeout(timer)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted
    setMuted(m => !m)
  }

  if (!visible) return null

  return (
    <div className={`music-player ${playing ? 'playing' : ''}`}>
      <div className="music-vinyl">
        <div className={`vinyl-disc ${playing ? 'spinning' : ''}`}>
          <div className="vinyl-center" />
        </div>
      </div>
      <div className="music-info">
        <p className="music-title">CLOSE TO YOU</p>
        <p className="music-label">{playing ? 'Now Playing' : 'Paused'}</p>
      </div>
      <div className="music-controls">
        {playing && (
          <button className="music-btn" onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'}>
            {muted ? '🔇' : '🔊'}
          </button>
        )}
        <button className="music-btn primary" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  )
}

// ── RSVP Guest Card (expandable) ─────────────────────────────────
function GuestChip({ guest, type = 'rsvpd' }) {
  const [expanded, setExpanded] = useState(false)
  const hasExtras = guest.guestCount && guest.guestCount !== '0' && guest.guests

  return (
    <div
      className={`guest-chip ${type} ${hasExtras ? 'expandable' : ''} ${expanded ? 'expanded' : ''}`}
      onClick={() => hasExtras && setExpanded(e => !e)}
    >
      <div className="guest-chip-main">
        <span className="guest-chip-name">{guest.fullName || guest.name}</span>
        {guest.role && <span className="guest-chip-role">{guest.role}</span>}
        {guest.guestCount && guest.guestCount !== '0' && (
          <span className="guest-chip-count">
            +{guest.guestCount} {hasExtras ? (expanded ? '▲' : '▼') : ''}
          </span>
        )}
      </div>
      {expanded && guest.guests && (
        <div className="guest-chip-extras">
          <p className="guest-chip-extras-label">Accompanying guests:</p>
          {guest.guests.split(',').map((g, i) => (
            <p key={i} className="guest-chip-extra-name">◆ {g.trim()}</p>
          ))}
          {guest.notes && <p className="guest-chip-note">"{guest.notes}"</p>}
        </div>
      )}
      {!hasExtras && guest.notes && (
        <p className="guest-chip-note">"{guest.notes}"</p>
      )}
    </div>
  )
}

// ── RSVP Section ─────────────────────────────────────────────────
function RSVPSection({ cathedralBw }) {
  const { guests, addGuest } = useContext(RSVPContext)
  const { count: rsvpCount, increment: incrementRSVP } = useCounter(0)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [attending, setAttending] = useState(null)
  const [notification, setNotification] = useState(false)
  const [guestInputs, setGuestInputs] = useState([''])
  const [form, setForm] = useState({
    firstName: '', lastName: '',
    notes: ''
  })

  const attendingGuests = guests.filter(g => g.attending === 'yes')

  // Count ONLY important people to include in the attendance total
  // EXCLUDED: parents, brother, sister
  const importantPeopleCount =
    WEDDING_PARTY.principalSponsors.length +
    WEDDING_PARTY.secondary.length

  // RSVP guests who said YES
  const rsvpAttendingCount = attendingGuests.reduce((total, guest) => {
    return total + 1 + Number(guest.guestCount || 0)
  }, 0)

  // Final total shown in counter
  const totalAttendingCount = importantPeopleCount + rsvpAttendingCount

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Dynamic guest name inputs
  const addGuestInput = () => setGuestInputs(prev => [...prev, ''])
  const removeGuestInput = (i) => setGuestInputs(prev => prev.filter((_, idx) => idx !== i))
  const updateGuestInput = (i, val) => setGuestInputs(prev => prev.map((g, idx) => idx === i ? val : g))

  const handleRsvp = (e) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || attending === null) return
    const filledGuests = guestInputs.filter(g => g.trim())
    const newGuest = {
      ...form,
      attending,
      fullName: `${form.firstName} ${form.lastName}`,
      guestCount: String(filledGuests.length),
      guests: filledGuests.join(', '),
      id: Date.now(),
    }
    addGuest(newGuest)
    incrementRSVP()
    setRsvpDone(true)
    setNotification(true)
    setTimeout(() => setNotification(false), 4000)
  }

  // All groups to show in the confirmed section
  const allPartyMembers = [
    ...WEDDING_PARTY.brideFamily,
    ...WEDDING_PARTY.groomFamily,
    ...WEDDING_PARTY.principalSponsors,
    ...WEDDING_PARTY.secondary,
  ]

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-bg">
        <img src={cathedralBw} alt="" className="rsvp-bg-img" />
        <div className="rsvp-overlay" />
      </div>

      {notification && (
        <div className="rsvp-notification">
          ✦ Your RSVP has been received — thank you!
        </div>
      )}

      <div className="rsvp-inner">
        <AnimatedSection>
          <p className="section-eyebrow light">Your Response</p>
          <h2 className="section-title light">RSVP</h2>
          <OrnamentalDivider light />
          <p className="rsvp-deadline">Kindly respond by the 1st of August, 2026</p>
        </AnimatedSection>

        {rsvpDone ? (
          <AnimatedSection>
            <div className="rsvp-thankyou">
              <span className="rsvp-thankyou-icon">✦</span>
              <p className="rsvp-thankyou-title">
                Thank You, {form.firstName} {form.lastName}
              </p>
              <p className="rsvp-thankyou-msg">
                {attending === 'yes'
                  ? 'We look forward to celebrating with you in Cologne.'
                  : 'We are sorry you cannot join us. You will be in our hearts on the day.'}
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={200}>
            <form className="rsvp-form" onSubmit={handleRsvp}>
              <div className="rsvp-row">
                <div className="rsvp-field">
                  <label className="rsvp-label">First Name</label>
                  <input className="rsvp-input" type="text" name="firstName"
                    placeholder="First name" value={form.firstName}
                    onChange={handleChange} required />
                </div>
                <div className="rsvp-field">
                  <label className="rsvp-label">Last Name</label>
                  <input className="rsvp-input" type="text" name="lastName"
                    placeholder="Last name" value={form.lastName}
                    onChange={handleChange} required />
                </div>
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label">Will you attend?</label>
                <div className="rsvp-choices">
                  <button type="button"
                    className={`rsvp-choice ${attending === 'yes' ? 'active' : ''}`}
                    onClick={() => setAttending('yes')}>
                    Joyfully Accepts
                  </button>
                  <button type="button"
                    className={`rsvp-choice ${attending === 'no' ? 'active' : ''}`}
                    onClick={() => setAttending('no')}>
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {/* Dynamic guest name inputs — no dropdown */}
              <div className="rsvp-field">
                <label className="rsvp-label">
                  Additional Guests
                  <span className="rsvp-optional"> (type names, add more with +)</span>
                </label>
                {guestInputs.map((val, i) => (
                  <div key={i} className="guest-input-row">
                    <input
                      className="rsvp-input"
                      type="text"
                      placeholder={`Guest ${i + 1} full name`}
                      value={val}
                      onChange={e => updateGuestInput(i, e.target.value)}
                    />
                    {guestInputs.length > 1 && (
                      <button type="button" className="guest-remove-btn"
                        onClick={() => removeGuestInput(i)}>✕</button>
                    )}
                  </div>
                ))}
                <button type="button" className="guest-add-btn" onClick={addGuestInput}>
                  + Add Another Guest
                </button>
              </div>

              <div className="rsvp-field">
                <label className="rsvp-label">
                  Notes <span className="rsvp-optional">(optional)</span>
                </label>
                <textarea className="rsvp-input rsvp-textarea" name="notes"
                  placeholder="Dietary requirements, special requests..."
                  value={form.notes} onChange={handleChange} rows={3} />
              </div>

              <button type="submit" className="rsvp-submit">Send Response</button>
            </form>
          </AnimatedSection>
        )}

        {/* Counter */}
        {(guests.length > 0 || importantPeopleCount > 0) && (
          <AnimatedSection delay={100}>
            <div className="rsvp-counter-wrap">
              <OrnamentalDivider light />
              <p className="rsvp-counter-label">
                <span className="rsvp-counter-num">{totalAttendingCount}</span>{' '}
                attending guests
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Guest Gallery */}
        {guests.length > 0 && (
          <AnimatedSection delay={200}>
            <div className="guest-gallery">
              <p className="guest-gallery-title">Our Confirmed Guests</p>

              <div className="guest-group">
                <p className="guest-group-label">Family of the Bride</p>
                {WEDDING_PARTY.brideFamily.map((m, i) => (
                  <GuestChip key={i} guest={m} type="preset" />
                ))}
              </div>

              <div className="guest-group">
                <p className="guest-group-label">Family of the Groom</p>
                {WEDDING_PARTY.groomFamily.map((m, i) => (
                  <GuestChip key={i} guest={m} type="preset" />
                ))}
              </div>

              <div className="guest-group">
                <p className="guest-group-label">Principal Sponsors</p>
                {WEDDING_PARTY.principalSponsors.map((m, i) => (
                  <GuestChip key={i} guest={m} type="preset" />
                ))}
              </div>

              <div className="guest-group">
                <p className="guest-group-label">Wedding Party</p>
                {WEDDING_PARTY.secondary.map((m, i) => (
                  <GuestChip key={i} guest={m} type="preset" />
                ))}
              </div>

              {guests.filter(g => g.attending === 'yes').length > 0 && (
                <div className="guest-group">
                  <p className="guest-group-label">Attending Guests</p>
                  {guests.filter(g => g.attending === 'yes').map(g => (
                    <GuestChip key={g.id} guest={g} type="rsvpd" />
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

// ── Venue Map (pinpointed Cologne Cathedral) ──────────────────────
function VenueMap() {
  const cathedralPosition = [50.9413, 6.9583]
  const hotelPosition = [50.9426, 6.957]

  const cathedralIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div class="pin-wrap">
        <div class="pin-pulse"></div>
        <div class="pin-core">📍</div>
      </div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 54],
    popupAnchor: [0, -48],
  })

  const hotelIcon = L.divIcon({
    className: 'custom-map-pin hotel-pin',
    html: `
      <div class="pin-wrap small">
        <div class="pin-core hotel">🏨</div>
      </div>
    `,
    iconSize: [46, 46],
    iconAnchor: [23, 40],
    popupAnchor: [0, -34],
  })

  return (
    <div className="map-section">
      <div className="map-embed-wrap leaflet-map-wrap">
        <MapContainer
          center={cathedralPosition}
          zoom={17}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Ceremony Marker */}
          <Marker position={cathedralPosition} icon={cathedralIcon}>
            <Popup>
              <div className="popup-content">
                <strong>Cologne Cathedral</strong><br />
                Kölner Dom<br />
                Domkloster 4, 50667 Köln, Germany
              </div>
            </Popup>
          </Marker>

          <CircleMarker
            center={cathedralPosition}
            radius={18}
            pathOptions={{
              color: '#b8975a',
              fillColor: '#b8975a',
              fillOpacity: 0.18,
              weight: 2,
            }}
          />

          {/* Reception Marker */}
          <Marker position={hotelPosition} icon={hotelIcon}>
            <Popup>
              <div className="popup-content">
                <strong>Excelsior Hotel Ernst</strong><br />
                Reception Venue<br />
                Trankgasse 1–5, Cologne
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        <div className="map-location-card">
          <p className="map-location-label">Ceremony Venue</p>
          <h3 className="map-location-title">Cologne Cathedral</h3>
          <p className="map-location-sub">Kölner Dom</p>
          <p className="map-location-address">Domkloster 4, 50667 Köln, Germany</p>

          <div className="map-location-actions">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Cologne+Cathedral+Domkloster+4+50667+K%C3%B6ln+Germany"
              target="_blank"
              rel="noreferrer"
              className="map-action-btn primary"
            >
              Open in Google Maps
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Cologne+Cathedral+Domkloster+4+50667+K%C3%B6ln+Germany"
              target="_blank"
              rel="noreferrer"
              className="map-action-btn"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="map-legend">
          <div className="map-legend-item">
            <span className="map-legend-dot" style={{ background: '#b8975a' }} />
            <span className="map-legend-name">Cologne Cathedral — Ceremony</span>
          </div>
          <div className="map-legend-item">
            <span className="map-legend-dot" style={{ background: '#c0c0c0' }} />
            <span className="map-legend-name">Excelsior Hotel Ernst — Reception</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Wedding Party Section ─────────────────────────────────────────
function WeddingParty() {
  const groups = [
    { label: 'Family of the Bride', members: WEDDING_PARTY.brideFamily },
    { label: 'Family of the Groom', members: WEDDING_PARTY.groomFamily },
    { label: 'Principal Sponsors', members: WEDDING_PARTY.principalSponsors },
    { label: 'Wedding Party', members: WEDDING_PARTY.secondary },
  ]

  return (
    <section className="party-section">
      <AnimatedSection>
        <p className="section-eyebrow">Our Beloved</p>
        <h2 className="section-title">Wedding Party</h2>
        <OrnamentalDivider />
      </AnimatedSection>
      {groups.map((group, gi) => (
        <AnimatedSection key={gi} delay={gi * 100}>
          <div className="party-group">
            <p className="party-group-label">{group.label}</p>
            <div className="party-grid">
              {group.members.map((m, mi) => (
                <div key={mi} className="party-card">
                  <div className="party-initials">
                    {m.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                  <p className="party-name">{m.name}</p>
                  <p className="party-role">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </section>
  )
}

// ── Dress Code ────────────────────────────────────────────────────
function DressCodeSection() {
  const menItems = [
    { icon: '🤵', label: 'Black Tuxedo', desc: 'Classic black or midnight blue tuxedo with bow tie' },
    { icon: '👔', label: 'Formal Dark Suit', desc: 'Charcoal or navy suit with white dress shirt' },
    { icon: '🎩', label: 'Morning Dress', desc: 'For the most formal option — top hat welcome' },
  ]
  const womenItems = [
    { icon: '👗', label: 'Floor-Length Gown', desc: 'Evening gown in black, charcoal, or champagne' },
    { icon: '💫', label: 'Cocktail Dress', desc: 'Elegant knee-length or midi dress' },
    { icon: '✨', label: 'Formal Separates', desc: 'Dressy blouse with wide-leg trousers or skirt' },
  ]
  const palette = [
    { color: '#0a0a0a', label: 'Onyx' },
    { color: '#2c2c2c', label: 'Charcoal' },
    { color: '#4a4a4a', label: 'Smoke' },
    { color: '#9a9a9a', label: 'Silver' },
    { color: '#f0ede8', label: 'Ivory' },
    { color: '#b8975a', label: 'Champagne' },
  ]

  return (
    <section className="dresscode-section">
      <AnimatedSection>
        <p className="section-eyebrow">Attire</p>
        <h2 className="section-title">Dress Code</h2>
        <OrnamentalDivider />
        <p className="dresscode-main">Black Tie</p>
      </AnimatedSection>
      <div className="dresscode-grid">
        <AnimatedSection delay={100}>
          <div className="dress-column">
            <p className="dress-col-label">✦ For Gentlemen</p>
            {menItems.map((item, i) => (
              <div key={i} className="dress-item">
                <span className="dress-item-icon">{item.icon}</span>
                <div>
                  <p className="dress-item-label">{item.label}</p>
                  <p className="dress-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <div className="dress-column">
            <p className="dress-col-label">✦ For Ladies</p>
            {womenItems.map((item, i) => (
              <div key={i} className="dress-item">
                <span className="dress-item-icon">{item.icon}</span>
                <div>
                  <p className="dress-item-label">{item.label}</p>
                  <p className="dress-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
      <AnimatedSection delay={300}>
        <div className="palette-wrap">
          <p className="palette-title">Suggested Colour Palette</p>
          <div className="palette-swatches">
            {palette.map((p, i) => (
              <div key={i} className="palette-swatch">
                <div className="swatch-circle" style={{
                  background: p.color,
                  border: p.color === '#f0ede8' ? '1px solid #4a4a4a' : 'none'
                }} />
                <span className="swatch-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection delay={400}>
        <div className="dos-donts">
          <div className="dos-col">
            <p className="dos-title">✓ Please Do</p>
            <ul className="dos-list">
              <li>Wear formal, elegant attire</li>
              <li>Choose dark or neutral tones</li>
              <li>Accessorise tastefully</li>
              <li>Wear comfortable formal shoes — it's a long day</li>
            </ul>
          </div>
          <div className="donts-col">
            <p className="donts-title">✗ Please Avoid</p>
            <ul className="donts-list">
              <li>White, cream, or ivory (reserved for the bride)</li>
              <li>Casual wear, jeans, or sportswear</li>
              <li>Overly bright or neon colours</li>
              <li>Loud patterns or graphics</li>
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}

// ── Main App ──────────────────────────────────────────────────────
export default function App() {
  return (
    <RSVPProvider>
      <AppContent />
    </RSVPProvider>
  )
}

function AppContent() {
  return (
    <div className="app">
      <ThemeMusic />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img src={cathedral4} alt="Cologne Cathedral" className="hero-img" />
          <div className="hero-overlay" />
          <div className="hero-vignette" />
        </div>
        <div className="hero-content">
          <AnimatedSection delay={0}>
            <p className="hero-eyebrow">Together With Their Families</p>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <h1 className="hero-names">
              <span className="name-first">Sofia</span>
              <span className="ampersand">&amp;</span>
              <span className="name-second">Marco</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <OrnamentalDivider light />
          </AnimatedSection>
          <AnimatedSection delay={600}>
            <p className="hero-invite-line">Request the honour of your presence</p>
            <p className="hero-invite-line italic">at the celebration of their marriage</p>
          </AnimatedSection>
          <AnimatedSection delay={800}>
            <div className="hero-date-block">
              <span className="hero-date-label">The</span>
              <span className="hero-date-day">Fifteenth</span>
              <span className="hero-date-label">of</span>
              <span className="hero-date-month">September</span>
              <span className="hero-date-year">2026</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={1000}>
            <a href="#details" className="hero-scroll-cta">
              <span>Scroll to Discover</span>
              <span className="scroll-arrow">↓</span>
            </a>
          </AnimatedSection>
        </div>
        <div className="hero-corner top-left" />
        <div className="hero-corner top-right" />
        <div className="hero-corner bottom-left" />
        <div className="hero-corner bottom-right" />
      </section>

      {/* ── SAVE THE DATE BANNER ── */}
      <section className="save-date-band">
        <span className="band-text">
          ✦ Save the Date ✦ September 15, 2026 ✦ Cologne Cathedral, Germany ✦ Black Tie ✦ Save the Date ✦ September 15, 2026 ✦ Cologne Cathedral, Germany ✦ Black Tie ✦&nbsp;
          ✦ Save the Date ✦ September 15, 2026 ✦ Cologne Cathedral, Germany ✦ Black Tie ✦ Save the Date ✦ September 15, 2026 ✦ Cologne Cathedral, Germany ✦ Black Tie ✦
        </span>
      </section>

      {/* ── DETAILS ── */}
      <section className="details-section" id="details">
        <div className="details-inner">
          <AnimatedSection>
            <p className="section-eyebrow">The Ceremony</p>
            <h2 className="section-title">Where &amp; When</h2>
            <OrnamentalDivider />
          </AnimatedSection>
          <div className="details-grid">
            <AnimatedSection delay={100} className="detail-card">
              <div className="detail-icon">💍</div>
              <h3 className="detail-card-title">Ceremony</h3>
              <p className="detail-card-time">Four O'Clock in the Afternoon</p>
              <p className="detail-card-date">15 September 2026</p>
            </AnimatedSection>
            <AnimatedSection delay={200} className="detail-card featured">
              <div className="detail-card-venue-img-wrap">
                <img src={cathedralBw} alt="Cologne Cathedral" className="detail-venue-img" />
                <div className="detail-venue-img-overlay" />
              </div>
              <h3 className="detail-card-title venue-title">Cologne Cathedral</h3>
              <p className="detail-card-subtitle">Kölner Dom</p>
              <p className="detail-card-address">Domkloster 4, 50667 Köln</p>
              <p className="detail-card-address">Germany</p>
            </AnimatedSection>
            <AnimatedSection delay={300} className="detail-card">
              <div className="detail-icon">🥂</div>
              <h3 className="detail-card-title">Reception</h3>
              <p className="detail-card-time">Seven O'Clock in the Evening</p>
              <p className="detail-card-address">Excelsior Hotel Ernst</p>
              <p className="detail-card-address">Trankgasse 1–5, Cologne</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── GETTING THERE ── */}
      <section className="getting-there-section">
        <div className="getting-there-inner">
          <AnimatedSection>
            <p className="section-eyebrow">Directions</p>
            <h2 className="section-title">Getting There</h2>
            <OrnamentalDivider />
            <p className="getting-there-intro">
              Cologne Cathedral is in the heart of Cologne, directly beside the central train station.
            </p>
          </AnimatedSection>
          <div className="transport-grid">
            {[
              {
                title: 'From Cologne Bonn Airport', sub: 'CGN · 18 km away',
                steps: [
                  { mode: 'Train', detail: 'S19 to Köln Hauptbahnhof — 15 mins' },
                  { mode: 'Taxi', detail: 'Direct to Cathedral — approx. 25 mins, €30–40' },
                ]
              },
              {
                title: 'From Cologne Central Station', sub: 'Köln Hauptbahnhof · 2 min walk',
                steps: [
                  { mode: 'Walk', detail: 'Exit the main station — Cathedral is immediately in front of you' },
                ]
              },
              {
                title: 'From Düsseldorf Airport', sub: 'DUS · 50 km away',
                steps: [
                  { mode: 'Train', detail: 'RE or IC to Köln Hauptbahnhof — 30 mins' },
                  { mode: 'Taxi', detail: 'Direct to Cathedral — approx. 45 mins, €80–100' },
                ]
              },
              {
                title: 'By Car', sub: 'Parking nearby',
                steps: [
                  { mode: 'Parking', detail: 'Parkhaus Dom/Altstadt — Kardinal-Höffner-Platz 1, 50667 Köln' },
                  { mode: 'Walk', detail: '5 min walk to the Cathedral entrance' },
                ]
              }
            ].map((card, i) => (
              <AnimatedSection key={i} delay={i * 100} className="transport-card">
                <h3 className="transport-title">{card.title}</h3>
                <p className="transport-sub">{card.sub}</p>
                <div className="transport-steps">
                  {card.steps.map((s, j) => (
                    <div key={j} className="transport-step">
                      <span className="step-mode">{s.mode}</span>
                      <span className="step-detail">{s.detail}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={300}>
            <VenueMap />
          </AnimatedSection>
        </div>
      </section>

      {/* ── ATMOSPHERE ── */}
      <section className="atmosphere-section">
        <div className="atm-image-wrap">
          <img src={cathedral5} alt="Cathedral at dusk" />
          <div className="atm-overlay" />
          <div className="atm-label"><span>Gothic Architecture</span></div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="venue-section">
        <div className="venue-inner">
          <AnimatedSection>
            <p className="section-eyebrow">The Setting</p>
            <h2 className="section-title">Cologne Cathedral</h2>
            <OrnamentalDivider />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="venue-body">
              Standing as one of the greatest Gothic cathedrals in the world, the Kölner Dom
              has graced the skyline of Cologne since 1248. A UNESCO World Heritage Site,
              its soaring twin spires rise 157 metres into the German sky — an enduring monument
              to devotion, artistry, and the timeless pursuit of beauty.
            </p>
            <p className="venue-body">
              It is here, beneath centuries of stained light and stone, that Sofia and Marco
              will begin their eternal journey together.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <div className="venue-facts">
              <div className="venue-fact">
                <span className="fact-number">1248</span>
                <span className="fact-label">Construction Began</span>
              </div>
              <div className="venue-fact-divider" />
              <div className="venue-fact">
                <span className="fact-number">157m</span>
                <span className="fact-label">Tower Height</span>
              </div>
              <div className="venue-fact-divider" />
              <div className="venue-fact">
                <span className="fact-number">UNESCO</span>
                <span className="fact-label">World Heritage</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROGRAMME ── */}
      <section className="programme-section">
        <div className="programme-bg">
          <img src={cathedral3} alt="Cathedral night" className="programme-bg-img" />
          <div className="programme-bg-overlay" />
        </div>
        <div className="programme-inner">
          <AnimatedSection>
            <p className="section-eyebrow light">The Day</p>
            <h2 className="section-title light">Programme</h2>
            <OrnamentalDivider light />
          </AnimatedSection>
          <div className="programme-timeline">
            {[
              { time: '15:30', label: 'Guests Arrive', desc: 'Cologne Cathedral' },
              { time: '16:00', label: 'Wedding Ceremony', desc: 'Kölner Dom' },
              { time: '17:00', label: 'Ring Exchange & Blessing', desc: 'Kölner Dom' },
              { time: '17:30', label: 'Cocktail Hour', desc: 'Cathedral Square' },
              { time: '19:00', label: 'Reception Dinner', desc: 'Excelsior Hotel Ernst' },
              { time: '20:30', label: 'First Dance & Toasts', desc: 'Grand Ballroom' },
              { time: '21:00', label: 'Celebration & Dancing', desc: 'Grand Ballroom' },
              { time: '00:00', label: 'Farewell & Send-Off', desc: 'Excelsior Hotel Ernst' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 80} className="timeline-item">
                <span className="tl-time">{item.time}</span>
                <span className="tl-dot" />
                <div className="tl-content">
                  <span className="tl-label">{item.label}</span>
                  <span className="tl-desc">{item.desc}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEDDING PARTY ── */}
      <WeddingParty />

      {/* ── DRESS CODE ── */}
      <DressCodeSection />

      {/* ── RSVP ── */}
      <RSVPSection cathedralBw={cathedralBw} />

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-ornament">✦ ◆ ✦</div>
        <h3 className="footer-names">Sofia &amp; Marco</h3>
        <p className="footer-date">15 · 09 · 2026</p>
        <p className="footer-location">Cologne Cathedral · Germany</p>
        <div className="footer-ornament small">◆</div>
        <p className="footer-note">
          For enquiries:{' '}
          <a href="mailto:wedding@sofiamarco.com" className="footer-link">
            wedding@sofiamarco.com
          </a>
        </p>
      </footer>
    </div>
  )
}