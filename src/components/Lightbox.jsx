export default function Lightbox({ photos, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      ref={(el) => el && el.focus()}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>✕</button>

        {photos.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={onPrev}>‹</button>
            <button className="lightbox-nav lightbox-next" onClick={onNext}>›</button>
          </>
        )}

        <img src={photos[currentIndex]} alt={`Photo ${currentIndex + 1}`} />

        <div style={{ textAlign: 'center', marginTop: '12px', color: '#94a3b8', fontSize: '0.9rem' }}>
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  )
}

