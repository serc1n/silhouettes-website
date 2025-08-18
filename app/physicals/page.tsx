import React from 'react'
import Header from '../../components/Header'

interface ImageGalleryProps {
  images: string[]
}

function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="w-full space-y-4">
      {images.map((image, index) => (
        <div key={index} className="w-full h-96 bg-black border border-white/20 overflow-hidden">
          <img
            src={image}
            alt={`Physical print ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default function Physicals() {
  const physicalOptions = [
    {
      id: 1,
      title: "Fine Art Prints",
      description: "Museum-quality prints on archival paper",
      material: "Archival matte paper with white ink on black substrate",
      images: ["/images/7.JPG", "/images/8.JPG" , "/images/9.JPEG"]
    },
    /* {
      id: 2,
      title: "Canvas Prints", 
      description: "Gallery-wrapped canvas with black background",
      material: "Premium canvas with fade-resistant white ink",
      images: ["/images/3.JPG", "/images/4.JPG"]
    },
    {
      id: 3,
      title: "Metal Prints",
      description: "Aluminum prints with matte black finish", 
      material: "Brushed aluminum with white sublimation ink",
      images: ["/images/5.JPG", "/images/6.JPG"]
    } */
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h1 className="font-bebas text-5xl md:text-7xl mb-6 tracking-wider">
              PHYSICALS
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-white/80">
              Transform digital silhouettes into tangible art pieces. 
              Each physical work maintains the collection's minimalist aesthetic.
            </p>
          </div>
          
          <div className="space-y-12">
            {physicalOptions.map((option) => (
              <div key={option.id} className="border border-white/20 p-8">
                <h2 className="font-bebas text-2xl mb-4 tracking-wider">
                  {option.title}
                </h2>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {option.description}
                </p>
                
                {/* Image Gallery */}
                <div className="mb-6">
                  <ImageGallery 
                    images={option.images}
                  />
                </div>
                
                {/* Materials */}
                <div>
                  <h3 className="font-bebas text-lg mb-3 tracking-wider">
                    MATERIALS
                  </h3>
                  <p className="text-white/70">
                    {option.material}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
      </main>
    </div>
  )
} 