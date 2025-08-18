import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <nav className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center space-y-6">
          <Link href="/" className="flex items-center space-x-4">
            {/* Logo */}
            <div className="w-12 h-12 lg:w-12 lg:h-12 relative">
              <Image
                src="/images/logo.svg"
                alt="Silhouettes Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Site Title */}
            <span className="font-bebas text-4xl lg:text-5xl tracking-wider">
              SILHOUETTES
            </span>
          </Link>
          
          <div className="flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="nav-link text-lg font-bebas tracking-wider">
              HOME
            </Link>
            <Link href="/gallery" className="nav-link text-lg font-bebas tracking-wider">
              GALLERY
            </Link>
            <Link href="/exhibitions" className="nav-link text-lg font-bebas tracking-wider">
              EXHIBITIONS
            </Link>
            <Link href="/physicals" className="nav-link text-lg font-bebas tracking-wider">
              PHYSICALS
            </Link>
            <Link href="/about" className="nav-link text-lg font-bebas tracking-wider">
              ABOUT
            </Link>
            <Link href="/tools" className="nav-link text-lg font-bebas tracking-wider">
              TOOLS
            </Link>
            <a 
              href="https://migrate.silhouettes.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link text-lg font-bebas tracking-wider"
            >
              MIGRATE
            </a>
            <a 
              href="https://stake.silhouettes.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link text-lg font-bebas tracking-wider"
            >
              STAKE
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header 