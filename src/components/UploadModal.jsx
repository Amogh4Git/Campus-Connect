import { useState } from 'react'

export default function UploadModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('preview')
  const [eventName, setEventName] = useState('')
  const [category, setCategory] = useState('Cultural')
  const [eventDate, setEventDate] = useState('')
  const [studentName, setStudentName] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!eventName || !studentName) return

    // Save submission locally for demonstration
    const submissions = JSON.parse(localStorage.getItem('campus_connect_submissions') || '[]')
    submissions.push({
      id: Date.now(),
      eventName,
      category,
      eventDate,
      studentName,
      submittedAt: new Date().toISOString()
    })
    localStorage.setItem('campus_connect_submissions', JSON.stringify(submissions))

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
      setEventName('')
      setStudentName('')
      setPhotoPreview(null)
    }, 2500)
  }

  return (
    <div className="lightbox-overlay" onClick={onClose} style={{ zIndex: 10000, padding: '20px' }}>
      <div 
        className="lightbox-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid rgba(66, 165, 245, 0.3)', 
          borderRadius: '16px', 
          maxWidth: '560px', 
          width: '100%', 
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        <button className="lightbox-close" onClick={onClose} style={{ top: '15px', right: '15px', fontSize: '1.5rem' }}>✕</button>

        <div className="text-center mb-4">
          <span style={{ fontSize: '2.5rem' }}>📸</span>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--text-primary)' }}>
            Upload Your Memory
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Contribute your photos to the IIIT Lucknow campus album
          </p>
        </div>

        <div className="d-flex gap-2 mb-4 justify-content-center">
          <button 
            className={`filter-pill ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
            type="button"
          >
            Direct Submission
          </button>
          <button 
            className={`filter-pill ${activeTab === 'google' ? 'active' : ''}`}
            onClick={() => setActiveTab('google')}
            type="button"
          >
            Google Form Link
          </button>
        </div>

        {activeTab === 'google' ? (
          <div className="text-center py-3">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              We use a Google Form so anyone can upload high-resolution photos securely.
              Admin reviews every submission before it is approved and pushed live!
            </p>
            <a 
              href="https://forms.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary-custom w-100 justify-content-center"
            >
              Open Google Form in New Tab ↗
            </a>
          </div>
        ) : submitted ? (
          <div className="text-center py-4">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h4 style={{ color: 'var(--accent-light)', marginBottom: '0.5rem' }}>Submission Received!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your memory has been queued for Admin Review (Role 9 & 10). Once approved, it will go live in the gallery.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                Your Name & Roll No. *
              </label>
              <input 
                type="text" 
                required 
                className="comment-input mb-0" 
                placeholder="e.g. Rahul Sharma (LCS2023001)"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="row g-2 mb-3">
              <div className="col-md-7">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                  Event Name *
                </label>
                <input 
                  type="text" 
                  required 
                  className="comment-input mb-0" 
                  placeholder="e.g. Tarang 2025"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                  Category
                </label>
                <select 
                  className="comment-input mb-0"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Cultural">Cultural</option>
                  <option value="Tech">Tech</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
                Select Photo
              </label>
              <input 
                type="file" 
                accept="image/*"
                className="comment-input mb-0" 
                onChange={handleImageChange}
              />
              {photoPreview && (
                <div className="mt-2 text-center">
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    style={{ maxHeight: '120px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} 
                  />
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary-custom w-100 justify-content-center mt-2">
              Submit for Admin Review 🚀
            </button>
            <p className="comment-note mb-0 mt-3">
              🔒 In accordance with the 5-step workflow: Nothing goes live without an admin saying yes.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

