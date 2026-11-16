import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import UploadModal from './components/UploadModal'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Gallery from './pages/Gallery'
import About from './pages/About'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  // LocalStorage for saved/favorite events (as recommended in course guidelines)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('campus_connect_favorites')
      return stored ? JSON.parse(stored) : [1] // default favorite: Tarang 2025
    } catch {
      return [1]
    }
  })

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage, selectedEvent])

  const toggleFavorite = (eventId) => {
    setFavorites((prev) => {
      const exists = prev.includes(eventId)
      const updated = exists ? prev.filter((id) => id !== eventId) : [...prev, eventId]
      try {
        localStorage.setItem('campus_connect_favorites', JSON.stringify(updated))
      } catch (err) {
        console.error('Failed to save favorites to localStorage', err)
      }
      return updated
    })
  }

  const navigateTo = (page) => {
    setSelectedEvent(null)
    setCurrentPage(page)
  }

  const openEvent = (event) => {
    setSelectedEvent(event)
    setCurrentPage('event-detail')
  }

  const goBackToEvents = () => {
    setSelectedEvent(null)
    setCurrentPage('events')
  }

  const renderPage = () => {
    if (currentPage === 'event-detail' && selectedEvent) {
      return (
        <EventDetail
          event={selectedEvent}
          onBack={goBackToEvents}
          isFavorite={favorites.includes(selectedEvent.id)}
          onToggleFavorite={toggleFavorite}
        />
      )
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home
            onNavigate={navigateTo}
            onEventClick={openEvent}
            onOpenUpload={() => setIsUploadOpen(true)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )
      case 'events':
        return (
          <Events
            onEventClick={openEvent}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )
      case 'gallery':
        return <Gallery />
      case 'about':
        return (
          <About
            onNavigate={navigateTo}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )
      default:
        return (
          <Home
            onNavigate={navigateTo}
            onEventClick={openEvent}
            onOpenUpload={() => setIsUploadOpen(true)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )
    }
  }

  return (
    <>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenUpload={() => setIsUploadOpen(true)}
        favoritesCount={favorites.length}
      />
      <main>{renderPage()}</main>
      <Footer
        onNavigate={navigateTo}
        onOpenUpload={() => setIsUploadOpen(true)}
      />
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </>
  )
}

export default App
