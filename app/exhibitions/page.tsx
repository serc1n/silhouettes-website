'use client'

import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  images: string[]
  autoSlide?: boolean
  slideInterval?: number
}

interface CityMapProps {
  city: string
  className?: string
}

function getGoogleMapUrl(city: string) {
  const mapUrls = {
    'Lisbon': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12500!2d-9.1517438!3d38.728949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQzJzQ0LjIiTiA5wrAwOScwNi4zIlc!5e0!3m2!1sen!2s!4v1234567890',
    'Rome': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d12.4700458!3d41.8345039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDUwJzA0LjIiTiAxMsKwMjgnMTIuMiJF!5e0!3m2!1sen!2s!4v1234567890',
    'New York': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-73.9858202!3d40.7585862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ1JzMwLjkiTiA3M8KwNTknMDkuMCJX!5e0!3m2!1sen!2s!4v1234567890'
  }
  
  return mapUrls[city as keyof typeof mapUrls] || mapUrls['New York']
}

function CityMap({ city, className = "" }: CityMapProps) {
  const getCityMap = (cityName: string) => {
    const maps = {
      'Lisbon': (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
          {/* Tagus River */}
          <path d="M20 120 Q60 115 100 120 Q140 125 180 120" stroke="white" strokeWidth="3" fill="none"/>
          {/* Main districts outline */}
          <path d="M40 80 L80 60 L120 70 L160 65 L170 100 L150 140 L100 145 L60 140 L30 120 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          {/* Alfama district */}
          <path d="M120 70 L140 85 L135 110 L115 115 Z" stroke="white" strokeWidth="1" fill="none"/>
          {/* Bairro Alto */}
          <path d="M80 85 L100 80 L105 100 L85 105 Z" stroke="white" strokeWidth="1" fill="none"/>
          {/* Belém area */}
          <path d="M20 130 L45 125 L50 145 L25 150 Z" stroke="white" strokeWidth="1" fill="none"/>
        </svg>
      ),
      'Rome': (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
          {/* Tiber River */}
          <path d="M80 20 Q90 60 85 100 Q80 140 90 180" stroke="white" strokeWidth="3" fill="none"/>
          {/* Historic center outline */}
          <path d="M100 60 L140 70 L150 100 L145 130 L120 140 L90 135 L85 110 L95 80 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          {/* Vatican area */}
          <path d="M60 80 L75 75 L80 90 L65 95 Z" stroke="white" strokeWidth="1" fill="none"/>
          {/* Colosseum area */}
          <path d="M130 110 L145 115 L140 130 L125 125 Z" stroke="white" strokeWidth="1" fill="none"/>
          {/* Trastevere */}
          <path d="M70 120 L85 115 L90 135 L75 140 Z" stroke="white" strokeWidth="1" fill="none"/>
        </svg>
      ),
      'New York': (
        <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
          {/* Manhattan outline */}
          <path d="M90 30 L110 35 L115 180 L85 175 Z" stroke="white" strokeWidth="2" fill="none"/>
          {/* Brooklyn */}
          <path d="M115 120 L160 125 L165 170 L120 165 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          {/* Queens */}
          <path d="M115 80 L170 85 L175 120 L120 115 Z" stroke="white" strokeWidth="1.5" fill="none"/>
          {/* Central Park */}
          <path d="M92 80 L108 82 L106 110 L94 108 Z" stroke="white" strokeWidth="1" fill="none"/>
          {/* Hudson River */}
          <path d="M85 30 L90 180" stroke="white" strokeWidth="2" fill="none"/>
          {/* East River */}
          <path d="M115 35 L120 175" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      )
    }
    
    return maps[cityName as keyof typeof maps] || (
      <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
        <circle cx="100" cy="100" r="3" fill="white"/>
        <text x="100" y="120" textAnchor="middle" fill="white" fontSize="12">{cityName}</text>
      </svg>
    )
  }

  return (
    <div className="w-24 h-24 bg-black border border-white/20 flex items-center justify-center">
      {getCityMap(city)}
    </div>
  )
}

function ImageCarousel({ images, autoSlide = true, slideInterval = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, slideInterval)

    return () => clearInterval(interval)
  }, [autoSlide, images.length, slideInterval])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }

  if (images.length === 0) return null

  return (
    <div className="relative h-64 md:h-auto md:aspect-[3/4] overflow-hidden group">
      {/* Main Image */}
      <div 
        className="absolute inset-0 bg-center bg-contain bg-no-repeat transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url('${images[currentIndex]}')` }}
      />
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Exhibitions() {
  const exhibitions = [
    {
      id: 4,
      title: "NFC Lisbon, 2024",
      venue: "NFT Conference",
      date: "2024",
      location: "Lisbon",
      coordinates: { lat: 38.7223, lng: -9.1393 },
      images: [
        "/images/2.JPG",
        "/images/3.JPG"
      ],
      highlights: [
        "2 days booth in main event",
        "Live pen plotter drawing",
        "Signed prints, live wooden board drawing with visitors."
      ]
    },
    {
      id: 2,
      title: "NFT_cc, 2024",
      venue: "Salone delle Colonne",
      date: "2024",
      location: "Rome",
      coordinates: { lat: 41.9028, lng: 12.4964 },
      images: [
        "/images/1.JPG",
        "/images/4.jpg"
      ],
      highlights: [
        "360° projection mapping in Salone delle Colonne",
        "Exhibited in Gazometro",
        "Signed prints given to visitors"
        
      ]
    },
    {
      id: 3,
      title: "NFT NYC, 2024",
      venue: "Lion's Milk, Holder meetup",
      date: "2024",
      location: "New York",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      images: [
        "/images/5.jpg",
        "/images/6.JPEG"
      ],
      highlights: [
        "Holders meetup in Lion's Milk",
        "Exhibited in Time Square",
        "Various pyhsical merch was given to visitors"
        
      ]
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h1 className="font-bebas text-5xl md:text-7xl mb-6 tracking-wider">
              EXHIBITIONS
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-white/80">
              Past and upcoming exhibitions featuring the Silhouettes collection.
            </p>
          </div>
          
          <div className="space-y-8 sm:space-y-16">
            {exhibitions.map((exhibition) => (
              <div key={exhibition.id} className="border border-white/20 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Left Half - Images */}
                  <div className="lg:w-1/2 p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h2 className="font-bebas text-2xl sm:text-3xl tracking-wider mb-2 sm:mb-0">
                        {exhibition.title}
                      </h2>
                      <span className="text-sm text-white/70 font-medium">
                        {exhibition.location}
                      </span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-white/80 mb-1 font-medium">{exhibition.venue}</p>
                      <p className="text-white/60 text-sm">{exhibition.date}</p>
                    </div>
                    
                    {/* Image Carousel */}
                    <div>
                      <ImageCarousel 
                        images={exhibition.images} 
                        autoSlide={true}
                        slideInterval={4000}
                      />
                    </div>
                  </div>
                  
                  {/* Right Half - Highlights and Map */}
                  <div className="lg:w-1/2 bg-black border-t lg:border-t-0 lg:border-l border-white/20 p-4 sm:p-6 lg:p-8 flex flex-col">
                    {/* Highlights */}
                    <div className="mb-6">
                      <h3 className="font-bebas text-lg tracking-wider mb-3 text-white/90">
                        HIGHLIGHTS
                      </h3>
                      <ul className="space-y-2">
                        {exhibition.highlights.map((highlight, index) => (
                          <li key={index} className="text-white/70 text-sm flex items-center">
                            <span className="w-1 h-1 bg-white/50 rounded-full mr-3"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Google Map - Takes remaining space */}
                    <div className="flex-1 w-full bg-black border border-white/20">
                      <iframe
                        src={getGoogleMapUrl(exhibition.location)}
                        width="100%"
                        height="100%"
                        style={{ border: 0, filter: 'invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${exhibition.location}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20 p-8 border border-white/20">
            <h2 className="font-bebas text-2xl mb-4 tracking-wider">
              EXHIBITION INQUIRIES
            </h2>
            <p className="text-white/80 mb-4">
              Interested in featuring the Silhouettes collection in your venue?
            </p>
            <p className="text-white/60">
              Contact us at info@silhouettes.io
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 