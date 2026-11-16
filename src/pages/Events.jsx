import { useState } from 'react'
import eventsData from '../data/events.json'
import EventCard from '../components/EventCard'

export default function Events({ onEventClick, favorites = [], onToggleFavorite }) {
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'Cultural', 'Tech', 'Sports', 'Favorites']

  const filteredEvents = eventsData.filter((e) => {
    // Category or Favorites filter
    if (filter === 'Favorites') {
      if (!favorites.includes(e.id)) return false
    } else if (filter !== 'All' && e.category !== filter) {
      return false
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      const matchTitle = e.title.toLowerCase().includes(q)
      const matchDesc = e.description.toLowerCase().includes(q)
      const matchCat = e.category.toLowerCase().includes(q)
      if (!matchTitle && !matchDesc && !matchCat) return false
    }

    return true
  })

  // Sort by date descending
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <section className="section-wrapper" style={{ paddingTop: '120px', minHeight: '100vh' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-label">Explore</p>
          <h2 className="section-title">Campus Events</h2>
          <p className="section-subtitle">
            Browse through all the cultural, tech, and sports events captured at IIIT Lucknow
          </p>
        </div>

        {/* Search Bar */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-6 col-md-8">
            <div className="position-relative">
              <input
                type="text"
                className="comment-input mb-0"
                style={{ paddingLeft: '45px', borderRadius: '50px', background: 'rgba(255,255,255,0.06)' }}
                placeholder="Search events by name, keyword or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span style={{ position: 'absolute', left: '16px', top: '12px', fontSize: '1.1rem' }}>
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills">
          {categories.map((cat) => {
            const count = cat === 'Favorites' ? favorites.length : null
            return (
              <button
                key={cat}
                className={`filter-pill ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'Cultural' && '🎭 '}
                {cat === 'Tech' && '💻 '}
                {cat === 'Sports' && '⚽ '}
                {cat === 'All' && '✨ '}
                {cat === 'Favorites' && '❤️ '}
                {cat} {count !== null && `(${count})`}
              </button>
            )
          })}
        </div>

        {/* Events Grid */}
        <div className="row g-4">
          {sortedEvents.map((event) => (
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

        {sortedEvents.length === 0 && (
          <div className="no-results">
            <h4>No events found</h4>
            <p>
              {filter === 'Favorites'
                ? "You haven't added any events to your favorites yet. Click the heart icon on any event to bookmark it!"
                : 'Try adjusting your search or category filter.'}
            </p>
            {(searchQuery || filter !== 'All') && (
              <button 
                className="btn-outline-custom mt-2" 
                onClick={() => { setFilter('All'); setSearchQuery(''); }}
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
