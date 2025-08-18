import React from 'react'
import Header from '../../components/Header'
import GalleryGrid from '../../components/GalleryGrid'

export default function Gallery() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="font-bebas text-5xl md:text-7xl mb-6 tracking-wider">
              GALLERY
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-white/80">
              Explore the complete collection of minimalist silhouettes. 
              Each artwork is available in high-resolution SVG and PNG formats.
            </p>
          </div>
          
          <GalleryGrid />
        </div>
      </main>
    </div>
  )
} 