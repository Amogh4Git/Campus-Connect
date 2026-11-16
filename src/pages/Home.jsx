import eventsData from '../data/events.json'
import EventCard from '../components/EventCard'
import { getAssetUrl } from '../utils/imageHelper'

export default function Home({ onNavigate, onEventClick, onOpenUpload, favorites = [], onToggleFavorite }) {
  // Get 3 most recent events
  const latestEvents = [...eventsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  // Sample images for hero grid
  const heroImages = eventsData.slice(0, 3).map(e => e.thumbnail)

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-bg-pattern"></div>

        {/* Floating particles */}
        <div className="hero-particles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${(i * 13 + 7) % 100}%`,
                top: `${(i * 19 + 5) % 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${12 + i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container position-relative">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge">
                🎓 IIIT Lucknow · Student Project
              </div>

              <h1 className="hero-title">
                Every Campus Memory,{' '}
                <span className="gradient-text">One Place</span>
              </h1>

              <p className="hero-description">
                A photo album website for every cultural, tech, and sports event on campus. Browse, 
                relive, and share your favourite college moments.
              </p>

              <div className="d-flex gap-3 flex-wrap" style={{ animation: 'fadeInUp 0.6s ease 0.3s both' }}>
                <button className="btn-primary-custom" onClick={() => onNavigate('events')}>
                  📸 Browse Events
                </button>
                <button
                  type="button"
                  className="btn-outline-custom"
                  onClick={onOpenUpload}
                >
                  ⬆️ Upload Your Memory
                </button>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <h3>4</h3>
                  <p>Pages</p>
                </div>
                <div className="hero-stat">
                  <h3>{eventsData.length}</h3>
                  <p>Events</p>
                </div>
                <div className="hero-stat">
                  <h3>{eventsData.reduce((sum, e) => sum + e.photos.length, 0)}</h3>
                  <p>Photos</p>
                </div>
                <div className="hero-stat">
                  <h3>10</h3>
                  <p>Team Members</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-image-grid">
                {heroImages.map((img, i) => (
                  <img key={i} src={getAssetUrl(img)} alt={`Campus event ${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST EVENTS ===== */}
      <section className="section-wrapper" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">What's New</p>
            <h2 className="section-title">Latest Events</h2>
            <p className="section-subtitle">
              Check out the most recent events from our campus
            </p>
          </div>

          <div className="row g-4">
            {latestEvents.map((event) => (
              <div className="col-lg-4 col-md-6" key={event.id}>
                <EventCard 
                  event={event} 
                  onClick={onEventClick}
                  isFavorite={favorites.includes(event.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button className="btn-outline-custom" onClick={() => onNavigate('events')}>
              View All Events →
            </button>
          </div>
        </div>
      </section>

      {/* ===== UPLOAD CTA ===== */}
      <section className="section-wrapper">
        <div className="container">
          <div className="upload-section">
            <h3>📸 Upload Your Memory</h3>
            <p>
              Got photos from a campus event? Share them with the community!
              Admins will review and add approved photos to the gallery.
            </p>
            <button
              type="button"
              className="upload-btn"
              onClick={onOpenUpload}
            >
              ⬆️ Upload Your Photo
            </button>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (mini) ===== */}
      <section className="section-wrapper" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              From student camera to live gallery in 5 safe steps
            </p>
          </div>
          <div className="row g-4">
            {[
              { num: '1', title: 'Share', desc: 'Fill in the Upload Your Memory Form with your event photos.' },
              { num: '2', title: 'Review', desc: 'Admins check every submitted photo for quality and relevance.' },
              { num: '3', title: 'Add', desc: 'Approved photos go into the images folder and events.json.' },
              { num: '4', title: 'Push', desc: 'The code update is reviewed and pushed to GitHub.' },
              { num: '5', title: 'Live', desc: 'Hosting automatically deploys the updated gallery.' },
            ].map((step) => (
              <div className="col-md" key={step.num}>
                <div className="step-card">
                  <div className="step-number">{step.num}</div>
                  <h5>{step.title}</h5>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
