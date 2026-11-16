export default function Footer({ onNavigate, onOpenUpload }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand">
              <img src="./images/logo.jpg" alt="Campus Connect" />
              <span>Campus Connect</span>
            </div>
            <p className="footer-text">
              A student-made photo album website for IIIT Lucknow. Relive every cultural, tech, and sports event in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Pages</h6>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('home')}>Home</button></li>
              <li><button onClick={() => onNavigate('events')}>Events</button></li>
              <li><button onClick={() => onNavigate('gallery')}>Gallery</button></li>
              <li><button onClick={() => onNavigate('about')}>About Us</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading">Categories</h6>
            <ul className="footer-links">
              <li><button onClick={() => onNavigate('events')}>Cultural</button></li>
              <li><button onClick={() => onNavigate('events')}>Tech</button></li>
              <li><button onClick={() => onNavigate('events')}>Sports</button></li>
            </ul>
          </div>

          {/* Contribute */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading">Share Your Photos</h6>
            <p className="footer-text" style={{ maxWidth: '100%' }}>
              Got photos from a campus event? Submit them to be featured in the official college gallery!
            </p>
            <button
              type="button"
              onClick={onOpenUpload}
              className="btn-outline-custom"
              style={{ marginTop: '0.5rem', display: 'inline-flex' }}
            >
              📸 Upload Your Memory
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © 2025 Campus Connect · IIIT Lucknow · Built with ❤️ by students
          </p>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
              ⌨️
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
              📷
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              💼
            </a>
            <a href="mailto:campus.connect@iiitl.ac.in" title="Email">
              ✉️
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
