export default function EventCard({ event, onClick, isFavorite, onToggleFavorite }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (onToggleFavorite) {
      onToggleFavorite(event.id)
    }
  }

  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <div className="event-card-image">
        <img src={event.thumbnail} alt={event.title} />
        <div className="event-card-overlay"></div>
        <span className={`category-pill ${event.category.toLowerCase()}`}>
          {event.category}
        </span>
        <button
          className={`favorite-badge-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Remove from Saved' : 'Save to Favorites'}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="event-card-body">
        <div className="event-card-date">
          📅 {formatDate(event.date)}
        </div>
        <h5 className="event-card-title">{event.title}</h5>
        <p className="event-card-desc">{event.description}</p>
        <div className="event-card-footer">
          <span className="photo-count">
            🖼️ {event.photos.length} photos
          </span>
          <span className="view-btn">
            View Details →
          </span>
        </div>
      </div>
    </div>
  )
}
