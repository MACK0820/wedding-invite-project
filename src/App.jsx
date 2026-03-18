import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import cathedral1 from './assets/cathedral1.jpeg'
import cathedral2 from './assets/cathedral2.jpeg'
import cathedral3 from './assets/cathedral3.jpeg'
import cathedralBw from './assets/cathedral_bw.jpeg'
import Cologne_Cathedral from './assets/Cologne_Cathedral.jpeg'  
import cathedral4 from './assets/cathedral4.jpeg'
import cathedral5 from './assets/cathedral5.jpeg'

function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.15, ...options })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

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

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [rsvpDone, setRsvpDone] = useState(false)
  const [rsvpName, setRsvpName] = useState('')
  const [attending, setAttending] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleRsvp = (e) => {
    e.preventDefault()
    if (rsvpName && attending !== null) setRsvpDone(true)
  }

  return (
    <div className="app">

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
        <span className="band-text">✦ Save the Date ✦ September 15, 2026 ✦ Cologne, Germany ✦ Save the Date ✦ September 15, 2026 ✦ Cologne, Germany ✦ Save the Date ✦</span>
      </section>

      {/* ── DETAILS SECTION ── */}
      <section className="details-section" id="details">
        <div className="details-inner">
          <AnimatedSection>
            <p className="section-eyebrow">The Ceremony</p>
            <h2 className="section-title">Where & When</h2>
            <OrnamentalDivider />
          </AnimatedSection>

          <div className="details-grid">
            <AnimatedSection delay={100} className="detail-card">
              <div className="detail-icon">💍🤍🕊️</div>
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
              Cologne Cathedral is located in the heart of Cologne, directly beside the central train station.
            </p>
          </AnimatedSection>

          <div className="transport-grid">
            <AnimatedSection delay={100} className="transport-card">
              <h3 className="transport-title">From Cologne Bonn Airport</h3>
              <p className="transport-sub">CGN · 18 km away</p>
              <div className="transport-steps">
                <div className="transport-step">
                  <span className="step-mode">Train</span>
                  <span className="step-detail">Take S19 from Airport to Köln Hauptbahnhof — 15 mins</span>
                </div>
                <div className="transport-step">
                  <span className="step-mode">Taxi</span>
                  <span className="step-detail">Direct to Cathedral — approx. 25 mins, €30–40</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} className="transport-card">
              <h3 className="transport-title">From Cologne Central Station</h3>
              <p className="transport-sub">Köln Hauptbahnhof · 2 min walk</p>
              <div className="transport-steps">
                <div className="transport-step">
                  <span className="step-mode">Walk</span>
                  <span className="step-detail">Exit the main station and the Cathedral is immediately in front of you — 2 mins</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300} className="transport-card">
              <h3 className="transport-title">From Düsseldorf Airport</h3>
              <p className="transport-sub">DUS · 50 km away</p>
              <div className="transport-steps">
                <div className="transport-step">
                  <span className="step-mode">Train</span>
                  <span className="step-detail">Take RE or IC to Köln Hauptbahnhof — 30 mins</span>
                </div>
                <div className="transport-step">
                  <span className="step-mode">Taxi</span>
                  <span className="step-detail">Direct to Cathedral — approx. 45 mins, €80–100</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400} className="transport-card">
              <h3 className="transport-title">By Car</h3>
              <p className="transport-sub">Parking nearby</p>
              <div className="transport-steps">
                <div className="transport-step">
                  <span className="step-mode">Parking</span>
                  <span className="step-detail">Parkhaus Dom/Altstadt — Kardinal-Höffner-Platz 1, 50667 Köln</span>
                </div>
                <div className="transport-step">
                  <span className="step-mode">Walk</span>
                  <span className="step-detail">5 min walk to the Cathedral entrance</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={300}>
            <div className="map-embed-wrap">
              <iframe
                title="Cologne Cathedral Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.4956319577!2d6.955693315907!3d50.94128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25a4e4a4e4a4%3A0x2a1f4a4a4a4a4a4a!2sCologne+Cathedral%2C+Domkloster+4%2C+50667+K%C3%B6ln%2C+Germany!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ATMOSPHERE IMAGES ── */}
      <section className="atmosphere-section">
        <div className="atm-image-wrap main-atm">
          <img src={cathedral5} alt="Cathedral at dusk" />
          <div className="atm-overlay" />
          <div className="atm-label">
            <span>A Cathedral of Light</span>
          </div> 
        </div>
      </section>

      {/* ── ABOUT THE VENUE ── */}
      <section className="venue-section">
        <div className="venue-inner">
          <AnimatedSection>
            <p className="section-eyebrow">The Setting</p>
            <h2 className="section-title">Cologne Cathedral</h2>
            <OrnamentalDivider />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="venue-body">
              Standing as one of the greatest Gothic cathedrals in the world, the
              Kölner Dom has graced the skyline of Cologne since 1248. A UNESCO
              World Heritage Site, its soaring twin spires rise 157 metres into
              the German sky — an enduring monument to devotion, artistry, and the
              timeless pursuit of beauty.
            </p>
            <p className="venue-body">
              It is here, beneath centuries of stained light and stone, that
              Sofia and Marco will begin their eternal journey together.
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
              { time: '16:00', label: 'Wedding Ceremony', desc: 'Kölner Dom — Main Nave' },
              { time: '17:30', label: 'Cocktail Hour', desc: 'Cathedral Square' },
              { time: '19:00', label: 'Reception Dinner', desc: 'Excelsior Hotel Ernst' },
              { time: '21:00', label: 'First Dance & Celebration', desc: 'Grand Ballroom' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 120} className="timeline-item">
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

      {/* ── DRESS CODE ── */}
      <section className="dresscode-section">
        <AnimatedSection>
          <p className="section-eyebrow">Attire</p>
          <h2 className="section-title">Dress Code</h2>
          <OrnamentalDivider />
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <p className="dresscode-main">Black Tie</p>
          <p className="dresscode-sub">
            Gentlemen are invited to wear black tie or formal morning dress.
            Ladies are encouraged to wear floor-length evening gowns.
            We welcome all shades of black, charcoal, ivory, and champagne.
          </p>
        </AnimatedSection>
      </section>

      {/* ── RSVP ── */}
      <section className="rsvp-section" id="rsvp">
        <div className="rsvp-bg">
          <img src={cathedralBw} alt="" className="rsvp-bg-img" />
          <div className="rsvp-overlay" />
        </div>
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
                <p className="rsvp-thankyou-title">Thank You, {rsvpName}</p>
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
                <div className="rsvp-field">
                  <label className="rsvp-label">Full Name</label>
                  <input
                    className="rsvp-input"
                    type="text"
                    placeholder="Your name"
                    value={rsvpName}
                    onChange={e => setRsvpName(e.target.value)}
                    required
                  />
                </div>
                <div className="rsvp-field">
                  <label className="rsvp-label">Will you attend?</label>
                  <div className="rsvp-choices">
                    <button
                      type="button"
                      className={`rsvp-choice ${attending === 'yes' ? 'active' : ''}`}
                      onClick={() => setAttending('yes')}
                    >
                      Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      className={`rsvp-choice ${attending === 'no' ? 'active' : ''}`}
                      onClick={() => setAttending('no')}
                    >
                      Regretfully Declines
                    </button>
                  </div>
                </div>
                <button type="submit" className="rsvp-submit">
                  Send Response
                </button>
              </form>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-ornament">✦ ◆ ✦</div>
        <h3 className="footer-names">Sofia & Marco</h3>
        <p className="footer-date">15 · 09 · 2026</p>
        <p className="footer-location">Cologne Cathedral · Germany</p>
        <div className="footer-ornament small">◆</div>
        <p className="footer-note">
          For enquiries, please contact{' '}
          <a href="mailto:wedding@sofiamarco.com" className="footer-link">
            wedding@sofiamarco.com
          </a>
        </p>
      </footer>
    </div>
  )
}
