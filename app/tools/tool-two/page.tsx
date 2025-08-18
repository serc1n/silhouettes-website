'use client'

import React from 'react'
import Header from '../../../components/Header'
import Link from 'next/link'

export default function ToolTwo() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-bebas text-4xl md:text-5xl mb-2 tracking-wider">
                TOOL TWO
              </h1>
              <p className="text-white/80">
                Advanced silhouette generation and editing interface
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
              src="/tools/tool-two/index.html"
              className="w-full h-[80vh] bg-black"
              title="Tool Two"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>
          
          <div className="mt-8 p-6 border border-white/20 rounded">
            <h2 className="font-bebas text-xl mb-4 tracking-wider">
              ABOUT THIS TOOL
            </h2>
            <p className="text-white/80 leading-relaxed">
              This advanced tool provides sophisticated controls for silhouette generation and editing. 
              Perfect for creating complex compositions and fine-tuning artistic details with precision.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 