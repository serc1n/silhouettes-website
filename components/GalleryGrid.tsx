'use client'

import React, { useState, useEffect } from 'react'
import { Download, Eye } from 'lucide-react'

interface Artwork {
  id: string
  title: string
  filename: string
  description?: string
}

const GalleryGrid = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [magnifierActive, setMagnifierActive] = useState(false)
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 })
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = useState(1000) // Default 10x zoom
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>([])
  const itemsPerPage = 24

  // Load SVG files from public/artworks directory
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        // Generate artwork list based on your 999 files
        // Assuming your files are named in a pattern like 1.svg, 2.svg, etc.
        const artworkList: Artwork[] = []
        
                 for (let i = 0; i <= 998; i++) {
           artworkList.push({
             id: i.toString(),
             title: `Silhouette ${i.toString().padStart(3, '0')}`,
             filename: `${i}.svg`,
             description: ``
           })
         }
        
        setArtworks(artworkList)
        setFilteredArtworks(artworkList)
        setLoading(false)
      } catch (error) {
        console.error('Error loading artworks:', error)
        setLoading(false)
      }
    }
    
    loadArtworks()
  }, [])

  // Filter artworks based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredArtworks(artworks)
      setCurrentPage(1)
    } else {
      const filtered = artworks.filter(artwork => {
        const id = artwork.id
        const title = artwork.title.toLowerCase()
        const query = searchQuery.toLowerCase()
        
        // Search by ID (exact match or partial match)
        if (id.includes(query)) return true
        
        // Search by title
        if (title.includes(query)) return true
        
        return false
      })
      setFilteredArtworks(filtered)
      setCurrentPage(1)
    }
  }, [searchQuery, artworks])

  const openModal = (artwork: Artwork) => {
    setSelectedArtwork(artwork)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedArtwork(null)
    setMagnifierActive(false)
    setZoomLevel(1000) // Reset zoom level
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMagnifierPosition({ x: e.clientX, y: e.clientY })
    setImagePosition({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    })
  }

  const handleMouseEnter = () => {
    setMagnifierActive(true)
  }

  const handleMouseLeave = () => {
    setMagnifierActive(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -100 : 100 // Zoom out or zoom in
    setZoomLevel(prev => {
      const newZoom = prev + delta
      // Limit zoom between 200% (2x) and 5000% (50x)
      return Math.max(200, Math.min(5000, newZoom))
    })
  }

  const downloadSVG = (filename: string, title: string) => {
    // Create download link for SVG
    const link = document.createElement('a')
    link.href = `/artworks/${filename}`
    link.download = `${title}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const downloadPNG = async (filename: string, title: string) => {
    try {
      // Convert SVG to PNG for download
      const response = await fetch(`/artworks/${filename}`)
      const svgText = await response.text()
      
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      img.onload = () => {
        canvas.width = img.width || 1000
        canvas.height = img.height || 1000
        
        // Fill with black background
        ctx!.fillStyle = '#000000'
        ctx!.fillRect(0, 0, canvas.width, canvas.height)
        
        ctx!.drawImage(img, 0, 0)
        
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `${title}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        }, 'image/png')
        
        URL.revokeObjectURL(url)
      }
      
      img.src = url
    } catch (error) {
      console.error('Error converting SVG to PNG:', error)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentArtworks = filteredArtworks.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-white/50">Loading artworks...</div>
      </div>
    )
  }

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search by ID (e.g., 995) or title..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:border-white focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="mb-8 text-center">
        <p className="text-white/60 text-sm">
          {searchQuery ? (
            <>
              Found {filteredArtworks.length} result{filteredArtworks.length !== 1 ? 's' : ''} for "{searchQuery}"
              {filteredArtworks.length > 0 && (
                <> • Showing {startIndex + 1}-{Math.min(endIndex, filteredArtworks.length)} of {filteredArtworks.length}</>
              )}
            </>
          ) : (
            <>Showing {startIndex + 1}-{Math.min(endIndex, filteredArtworks.length)} of {filteredArtworks.length} artworks</>
          )}
        </p>
      </div>

      {filteredArtworks.length === 0 && searchQuery ? (
        <div className="text-center py-20">
          <p className="text-white/50 text-lg mb-4">No artworks found for "{searchQuery}"</p>
          <p className="text-white/30 text-sm mb-6">
            Try searching by ID number (0-998) or part of the title
          </p>
          <button
            onClick={clearSearch}
            className="border border-white/30 px-6 py-2 hover:border-white transition-colors"
          >
            CLEAR SEARCH
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {currentArtworks.map((artwork) => (
          <div key={artwork.id} className="gallery-item group">
            <div className="aspect-square border border-white/20 relative overflow-hidden">
                             {/* SVG artwork */}
               <div className="w-full h-full bg-black flex items-center justify-center p-4">
                 <img 
                   src={`/artworks/${artwork.filename}`}
                   alt={artwork.title}
                   className="w-full h-full object-contain"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement
                     target.style.display = 'none'
                     const parent = target.parentElement
                     if (parent) {
                       parent.innerHTML = `<div class="text-white/30 text-xs text-center">Image not found<br/>${artwork.filename}</div>`
                     }
                   }}
                   onLoad={(e) => {
                     const target = e.target as HTMLImageElement
                     target.style.opacity = '1'
                   }}
                   style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                 />
               </div>
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-4">
                  <button
                    onClick={() => openModal(artwork)}
                    className="p-2 border border-white/50 hover:border-white transition-colors"
                    title="View full size"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => downloadSVG(artwork.filename, artwork.title)}
                    className="p-2 border border-white/50 hover:border-white transition-colors"
                    title="Download SVG"
                  >
                    <Download size={20} />
                  </button>
                  <button
                    onClick={() => downloadPNG(artwork.filename, artwork.title)}
                    className="p-2 border border-white/50 hover:border-white transition-colors"
                    title="Download PNG"
                  >
                    PNG
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="font-bebas text-lg tracking-wider mb-1">
                {artwork.title}
              </h3>
              {artwork.description && (
                <p className="text-sm text-white/60">
                  {artwork.description}
                </p>
              )}
            </div>
          </div>
                  ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-12 gap-4 sm:gap-0 sm:space-x-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-full sm:w-auto px-4 py-2 border border-white/30 hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            PREVIOUS
          </button>
          
          <div className="flex space-x-1 sm:space-x-2">
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
              const pageNum = currentPage <= 2 ? i + 1 : currentPage - 1 + i
              if (pageNum > totalPages) return null
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 sm:px-3 py-2 border text-sm ${
                    currentPage === pageNum 
                      ? 'border-white bg-white text-black' 
                      : 'border-white/30 hover:border-white'
                  } transition-colors`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-full sm:w-auto px-4 py-2 border border-white/30 hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            NEXT
          </button>
        </div>
      )}

      {/* Modal for full-size viewing */}
      {isModalOpen && selectedArtwork && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4">
          <div className="max-w-4xl max-h-full relative w-full">
            <button
              onClick={closeModal}
              className="absolute -top-8 sm:-top-12 right-0 text-white/70 hover:text-white text-xl sm:text-2xl bg-black/50 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded"
            >
              ×
            </button>
            
            <div className="bg-black border border-white/20 p-4 sm:p-6 lg:p-8">
              <div className="aspect-square max-w-2xl mx-auto flex items-center justify-center relative">
                {/* Full-size SVG display with magnifier */}
                <div 
                  className="relative w-full h-full cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onWheel={handleWheel}
                >
                  <img 
                    src={`/artworks/${selectedArtwork.filename}`}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-contain"
                    style={{ userSelect: 'none' }}
                  />
                  
                                                        {/* Magnifier */}
                   {magnifierActive && (
                     <div
                       className="magnifier fixed pointer-events-none border-2 border-white/50 overflow-hidden z-50"
                       style={{
                         left: magnifierPosition.x - 100,
                         top: magnifierPosition.y - 100,
                         width: '200px',
                         height: '200px',
                         background: `url(/artworks/${selectedArtwork.filename}) no-repeat`,
                         backgroundPosition: `${imagePosition.x}% ${imagePosition.y}%`,
                         backgroundSize: `${zoomLevel}% ${zoomLevel}%`,
                         border: '2px solid rgba(255, 255, 255, 0.8)',
                         boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
                       }}
                     >
                                             {/* Crosshair in magnifier */}
                       <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-full h-px bg-white/30 absolute"></div>
                         <div className="h-full w-px bg-white/30 absolute"></div>
                       </div>
                       
                       {/* Zoom level indicator */}
                       <div className="absolute bottom-1 right-1 bg-black/70 text-white/80 text-xs px-1 py-0.5 rounded">
                         {(zoomLevel / 100).toFixed(1)}x
                       </div>
                     </div>
                   )}
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <h3 className="font-bebas text-xl sm:text-2xl tracking-wider mb-2">
                  {selectedArtwork.title}
                </h3>
                {selectedArtwork.description && (
                  <p className="text-white/70 mb-4 text-sm sm:text-base">
                    {selectedArtwork.description}
                  </p>
                )}
                
                <p className="text-white/50 text-xs sm:text-sm mb-4 px-2">
                  <span className="hidden sm:inline">Hover over image to magnify • Scroll to zoom in/out • </span>
                  <span className="sm:hidden">Tap and hold to magnify • Pinch to zoom • </span>
                  Current zoom: {(zoomLevel / 100).toFixed(1)}x
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 sm:space-x-4">
                  <button
                    onClick={() => downloadSVG(selectedArtwork.filename, selectedArtwork.title)}
                    className="border border-white/50 px-4 py-2 hover:border-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download size={16} />
                    <span>SVG</span>
                  </button>
                  <button
                    onClick={() => downloadPNG(selectedArtwork.filename, selectedArtwork.title)}
                    className="border border-white/50 px-4 py-2 hover:border-white transition-colors"
                  >
                    PNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GalleryGrid 