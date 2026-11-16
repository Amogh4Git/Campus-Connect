import { useState, useEffect } from 'react'

export default function Navbar({ currentPage, onNavigate, onOpenUpload, favoritesCount = 0 }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
  ]

  const handleNav = (page) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <button
          className="navbar-brand-custom"
          onClick={() => handleNav('home')}
          style={{ border: 'none', background: 'none' }}
        >
          <img src="/images/logo.jpg" alt="Campus Connect" className="navbar-logo" />
          <span className="navbar-title">Campus Connect</span>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                <button
                  className={`nav-link nav-link-custom ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  {item.label}
                  {item.id === 'events' && favoritesCount > 0 && (
                    <span 
                      style={{ 
                        marginLeft: '6px', 
                        fontSize: '0.75rem', 
                        background: 'rgba(239, 68, 68, 0.25)', 
                        color: '#f87171', 
                        padding: '1px 6px', 
                        borderRadius: '10px' 
                      }}
                      title={`${favoritesCount} bookmarked events`}
                    >
                      ♥ {favoritesCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <button
                type="button"
                className="btn-outline-custom"
                style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                onClick={() => {
                  if (onOpenUpload) onOpenUpload()
                  setMenuOpen(false)
                }}
              >
                📸 Upload
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
