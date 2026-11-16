import { useState, useMemo } from 'react'
import eventsData from '../data/events.json'
import Lightbox from '../components/Lightbox'
import { getAssetUrl } from '../utils/imageHelper'

export default function Gallery() {
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Build gallery items from all events
  const allPhotos = useMemo(() => {
    return eventsData.flatMap((event) =>
      event.photos.map((photo, pIdx) => ({
        src: photo,
        eventTitle: event.title,
        category: event.category,
        date: event.date,
        year: new Date(event.date).getFullYear().toString(),
        photoIndex: pIdx + 1
      }))
    )
  }, [])

  // Get unique years
  const years = useMemo(() => {
    const uniqueYears = [...new Set(allPhotos.map((p) => p.year))]
    return uniqueYears.sort((a, b) => b - a)
  }, [allPhotos])

  // Filter and sort
  const filteredPhotos = useMemo(() => {
    let result = [...allPhotos]

    if (category !== 'All') {
      result = result.filter((p) => p.category === category)
    }

    if (year !== 'All') {
      result = result.filter((p) => p.year === year)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) => 
        p.eventTitle.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      )
    }

    if (sortOrder === 'newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else {
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    return result
  }, [allPhotos, category, year, searchQuery, sortOrder])

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prevPhoto = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1))
  }

  const nextPhoto = () => {
    setLightboxIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="section-wrapper" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">All Photos</p>
          <h2 className="section-title">Photo Gallery</h2>
          <p className="section-subtitle">
            Browse all {allPhotos.length} photos from every event, with filters to find exactly what you're looking for
          </p>
        </div>

        {/* Filters */}
        <div className="gallery-filters">
          <input
            type="text"
            className="gallery-filter-select"
            placeholder="🔎 Search event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ minWidth: '180px' }}
          />

          <select
            className="gallery-filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Cultural">🎭 Cultural</option>
            <option value="Tech">💻 Tech</option>
            <option value="Sports">⚽ Sports</option>
          </select>

          <select
            className="gallery-filter-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="All">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            className="gallery-filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {filteredPhotos.length} of {allPhotos.length} photo{allPhotos.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="gallery-grid">
            {filteredPhotos.map((photo, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => openLightbox(i)}
              >
                <img src={getAssetUrl(photo.src)} alt={photo.eventTitle} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>{photo.eventTitle}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h4>📷 No photos found</h4>
            <p>Try adjusting your search query or filters.</p>
            <button
              className="btn-outline-custom mt-2"
              onClick={() => {
                setCategory('All')
                setYear('All')
                setSearchQuery('')
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && filteredPhotos.length > 0 && (
          <Lightbox
            photos={filteredPhotos.map((p) => getAssetUrl(p.src))}
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
