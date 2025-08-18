'use client'

import React, { useState } from 'react'
import Header from '../components/Header'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  // Featured artwork IDs - you can change these to any artwork numbers you want to feature
  const featuredArtworks = [
    { id: 0, title: "Cursed" },
    { id: 765, title: "Dawn" },
    { id: 625, title: "Normal" }
  ]

  const [selectedArtwork, setSelectedArtwork] = useState<number | null>(null)

  const handleArtworkClick = (id: number) => {
    setSelectedArtwork(id)
  }

  const closeModal = () => {
    setSelectedArtwork(null)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-32 sm:pt-40">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-bebas text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 tracking-wider">
              SILHOUETTES
            </h1>
            <div className="mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-2">
                a generative art collection by Serc,
              </p>
              <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                born with the idea of "Less is more."
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link 
                href="/gallery" 
                className="border border-white px-6 sm:px-8 py-3 hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base"
              >
                VIEW GALLERY
              </Link>
              <Link 
                href="/about" 
                className="border border-white/50 px-6 sm:px-8 py-3 hover:border-white transition-all duration-300 text-sm sm:text-base"
              >
                ABOUT THE COLLECTION
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-16 text-center tracking-wider">
              FEATURED WORKS
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredArtworks.map((artwork) => (
                <div 
                  key={artwork.id} 
                  className="group cursor-pointer"
                  onClick={() => handleArtworkClick(artwork.id)}
                >
                  <div className="aspect-square border border-white/20 overflow-hidden bg-black hover:border-white/40 transition-all duration-300">
                    <div className="w-full h-full p-4">
                      <Image
                        src={`/artworks/${artwork.id}.svg`}
                        alt={`Silhouette #${artwork.id} - ${artwork.title}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        priority
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-bebas text-xl tracking-wider">#{artwork.id}</h3>
                    <p className="text-white/70 text-sm">{artwork.title}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/gallery" 
                className="inline-block border border-white/50 px-6 py-2 hover:border-white transition-all duration-300"
              >
                VIEW ALL WORKS
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-20 px-6 border-t border-white/10">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Link href="/exhibitions" className="text-center group">
                <h3 className="font-bebas text-2xl mb-4 tracking-wider group-hover:opacity-70 transition-opacity">
                  EXHIBITIONS
                </h3>
                <p className="text-sm text-white/70">
                  Past and upcoming exhibitions
                </p>
              </Link>
              
              <Link href="/physicals" className="text-center group">
                <h3 className="font-bebas text-2xl mb-4 tracking-wider group-hover:opacity-70 transition-opacity">
                  PHYSICALS
                </h3>
                <p className="text-sm text-white/70">
                  Physical artwork collection
                </p>
              </Link>
              
              <Link href="/about" className="text-center group">
                <h3 className="font-bebas text-2xl mb-4 tracking-wider group-hover:opacity-70 transition-opacity">
                  ABOUT
                </h3>
                <p className="text-sm text-white/70">
                  Artist and collection info
                </p>
              </Link>
              
              <Link href="/tools" className="text-center group">
                <h3 className="font-bebas text-2xl mb-4 tracking-wider group-hover:opacity-70 transition-opacity">
                  TOOLS
                </h3>
                <p className="text-sm text-white/70">
                  Interactive art tools
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for artwork viewing */}
      {selectedArtwork !== null && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            >
              ×
            </button>
            <div className="w-full h-full max-w-2xl max-h-2xl">
              <Image
                src={`/artworks/${selectedArtwork}.svg`}
                alt={`Silhouette #${selectedArtwork}`}
                width={800}
                height={800}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="font-bebas text-2xl tracking-wider">#{selectedArtwork}</h3>
              <p className="text-white/70">
                {featuredArtworks.find(art => art.id === selectedArtwork)?.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 