import { useState } from 'react'

export default function CommentBox({ eventId }) {
  const storageKey = `comments-${eventId}`

  const loadComments = () => {
    try {
      const stored = localStorage.getItem(storageKey)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  const [comments, setComments] = useState(loadComments)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Please enter your name'
    if (!text.trim()) newErrors.text = 'Please enter a comment'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const newComment = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      time: new Date().toLocaleString('en-IN'),
    }

    const updated = [newComment, ...comments]
    setComments(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    setName('')
    setText('')
    setErrors({})
  }

  return (
    <div className="comment-section">
      <h4 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
        💬 Comments
      </h4>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="comment-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="comment-error">{errors.name}</p>}

        <textarea
          className="comment-input"
          placeholder="Share your thoughts about this event..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {errors.text && <p className="comment-error">{errors.text}</p>}

        <button type="submit" className="btn-primary-custom">
          Post Comment
        </button>
      </form>

      {comments.length > 0 && (
        <div>
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <p className="comment-author">{c.name}</p>
              <p className="comment-text">{c.text}</p>
              <p className="comment-time">{c.time}</p>
            </div>
          ))}
        </div>
      )}

      <p className="comment-note">
        💡 Comments are saved in your browser using LocalStorage. They won't appear on other devices.
      </p>
    </div>
  )
}

