import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import CommentBox from '../components/CommentBox'

export default function EventDetail({ event, onBack, isFavorite, onToggleFavorite }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prevPhoto = () => {
    setLightboxIndex((prev) => (prev === 0 ? event.photos.length - 1 : prev - 1))
  }

  const nextPhoto = () => {
    setLightboxIndex((prev) => (prev === event.photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="event-detail">
      <div className="container">
        {/* Navigation and Favorite actions */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="back-btn mb-0" onClick={onBack}>
            ← Back to Events
          </button>
          <button 
            className={`btn-outline-custom ${isFavorite ? 'favorited-active' : ''}`}
            onClick={() => onToggleFavorite && onToggleFavorite(event.id)}
            style={{ fontSize: '0.85rem', padding: '6px 16px' }}
          >
            {isFavorite ? '❤️ Saved in Favorites' : '🤍 Save to Favorites'}
          </button>
        </div>

        {/* Header */}
        <div className="event-detail-header">
          <span className={`category-pill ${event.category.toLowerCase()}`} style={{ position: 'static', marginBottom: '1rem', display: 'inline-block' }}>
            {event.category}
          </span>
          <h1 className="event-detail-title">{event.title}</h1>

          <div className="event-detail-meta">
            <span className="meta-item">📅 {formatDate(event.date)}</span>
            <span className="meta-item">🖼️ {event.photos.length} photos</span>
            {event.videoUrl && <span className="meta-item">🎥 Video available</span>}
          </div>

          <p className="event-detail-description">{event.description}</p>
        </div>

        {/* Photo Grid */}
        <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
          <h4 style={{ margin: 0 }}>📸 Event Photos</h4>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Click any photo to enlarge
          </span>
        </div>
        <div className="photo-grid">
          {event.photos.map((photo, i) => (
            <div
              key={i}
              className="photo-grid-item"
              onClick={() => openLightbox(i)}
            >
              <img src={photo} alt={`${event.title} - Photo ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* YouTube Embed */}
        {event.videoUrl && (
          <>
            <h4 style={{ marginTop: '3rem', marginBottom: '1rem' }}>🎥 Event Video</h4>
            <div className="video-embed">
              <iframe
                src={event.videoUrl}
                title={`${event.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        )}

        {/* Comments */}
        <CommentBox eventId={event.id} />

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            photos={event.photos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </div>
    </section>
  )
}
