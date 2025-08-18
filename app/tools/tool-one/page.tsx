'use client'

import React from 'react'
import Header from '../../../components/Header'
import Link from 'next/link'

export default function ToolOne() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bebas text-4xl md:text-5xl mb-2 tracking-wider">
                SILHOUETTES EDITOR
              </h1>
              <p className="text-white/80">
                Advanced editor for customizing silhouettes with color and line width controls
              </p>
            </div>
            <Link 
              href="/tools"
              className="border border-white/50 px-6 py-2 hover:border-white transition-all duration-300"
            >
              ← BACK TO TOOLS
            </Link>
          </div>
          
          <div className="border border-white/20 rounded-lg overflow-hidden">
            <iframe
              src="/tools/tool-one/index.html"
              className="w-full h-[80vh] bg-black"
              title="Silhouettes Editor"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
          
          <div className="mt-8 p-6 border border-white/20 rounded">
            <h2 className="font-bebas text-xl mb-4 tracking-wider">
              ABOUT THIS TOOL
            </h2>
            <p className="text-white/80 leading-relaxed">
              The Silhouettes Editor allows you to customize any artwork from the collection with advanced controls. 
              Change line colors, background colors, adjust stroke width, and download high-resolution versions of 
              your customized silhouettes. Perfect for creating personalized versions or exploring different aesthetic variations.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 