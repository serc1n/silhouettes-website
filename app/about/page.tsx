import React from 'react'
import Header from '../../components/Header'

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20">
            <h1 className="font-bebas text-5xl md:text-7xl mb-6 tracking-wider">
              ABOUT
            </h1>
          </div>
          
          <div className="space-y-16">
            {/* Collection Info */}
            <section>
              <h2 className="font-bebas text-3xl mb-8 tracking-wider">
                THE COLLECTION
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                Silhouettes is a generative art collection launched in February 2024 on the Solana blockchain. Since its debut, the project has surpassed $1M in trading volume and continues to resonate across the digital art space.                </p>
                <p>
                Created entirely in Cinema 4D, the collection posed a unique challenge: producing 999 distinct artworks using nothing but black and white lines. The result is a body of work that transforms simplicity into depth, with each piece carrying its own identity while remaining true to the collection’s minimal language.                </p>
                <p>
                Silhouettes has reached audiences worldwide, being exhibited at NFT Paris, NFT NYC, Rome, and Bali, and serving as a sponsor for NFC Lisbon.                </p>
                <p>
                Beyond its artistic impact, the project has used royalties to support other artists by collecting their work, as well as to reinvest in art supplies, devices, and creative tools, ensuring the cycle of creation continues to expand.                </p>
              </div>
            </section>

            {/* Artist Info */}
            <section className="border-t border-white/10 pt-16">
              <h2 className="font-bebas text-3xl mb-8 tracking-wider">
                THE ARTIST
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                Serc is a street artist who first encountered web3 while working as a CTO. In April 2021, he made the decision to leave that role and fully dedicate himself to the web3 space.
                </p>
                <p>
                Since then, he has launched collections across Ethereum, Solana, and Bitcoin, building a diverse presence across major blockchains. Based in Germany, Serc continues to expand his artistic and technical skill set—exploring 3D software, neuroscience, and other emerging tools to push the boundaries of his creative practice.
                </p>
              
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
} 