'use client'

export default function Background() {
  return (
    <>
      {/* Black base background */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-2]"
        style={{
          backgroundColor: '#000000 !important',
        }}
      />
      
      {/* SVG overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          backgroundImage: 'url(/artworks/325.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.07
        }}
      />
    </>
  )
} 