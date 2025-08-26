'use client'

import React, { useState } from 'react'
import Header from '../../components/Header'
import { Send, Check, AlertCircle } from 'lucide-react'

export default function Collab() {
  const [formData, setFormData] = useState({
    artistName: '',
    twitterHandle: '',
    medium: '',
    expectation: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // State for managing expanded Q&A items
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([])

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  // Artist data - add artists here in the backend
  const artists = [
    {
      id: 1,
      name: "Mr. Richi",
      xHandle: "@Richi0118",
      profileImage: "https://pbs.twimg.com/profile_images/1606755316762398730/S_n14fCs_400x400.jpg"
    },
    {
      id: 2,
      name: "RocketGirl",
      xHandle: "@rocketgirlART",
      profileImage: "https://pbs.twimg.com/profile_images/1837124299368402944/EKbtQGGI_400x400.jpg"
    },
    {
      id: 3,
      name: "P1AbyPIA", 
      xHandle: "@P1AbyPIA",
      profileImage: "https://pbs.twimg.com/profile_images/1914152562690813952/IH04TLQ__400x400.jpg"
    },
    {
      id: 4,
      name: "Nuclear Samurai",
      xHandle: "@MutagenSamurai",
      profileImage: "https://pbs.twimg.com/profile_images/1658774960473792512/1LsUAOzX_400x400.jpg"
    },
    {
      id: 5,
      name: "Efdot",
      xHandle: "@EfdotStudio",
      profileImage: "https://pbs.twimg.com/profile_images/1902419687746760707/_8zsquWW_400x400.jpg"
    },
    {
      id: 6,
      name: "BEFE",
      xHandle: "@befethemad",
      profileImage: "https://pbs.twimg.com/profile_images/1957788485303115776/pQORO0JX_400x400.jpg"
    },
    {
      id: 7,
      name: "Lele",
      xHandle: "@LeleGastini",
      profileImage: "https://pbs.twimg.com/profile_images/1875979278614974464/2H7SXGAE_400x400.jpg"
    },
    {
      id: 8,
      name: "Rachel Wood",
      xHandle: "@RachelSTWood",
      profileImage: "https://pbs.twimg.com/profile_images/1949044177423192064/oGCFdBC-_400x400.jpg"
    },
    {
      id: 9,
      name: "Artist 9",
      xHandle: "@artist9",
      profileImage: null
    },
    {
      id: 10,
      name: "Artist 10",
      xHandle: "@artist10",
      profileImage: null
    },
    {
      id: 11,
      name: "Artist 11",
      xHandle: "@artist11",
      profileImage: null
    },
    {
      id: 12,
      name: "Artist 12",
      xHandle: "@artist12",
      profileImage: null
    },
    {
      id: 13,
      name: "Artist 13",
      xHandle: "@artist13",
      profileImage: null
    },
    {
      id: 14,
      name: "Artist 14",
      xHandle: "@artist14",
      profileImage: null
    },
    {
      id: 15,
      name: "Artist 15",
      xHandle: "@artist15",
      profileImage: null
    },
    {
      id: 16,
      name: "Artist 16",
      xHandle: "@artist16",
      profileImage: null
    },
    {
      id: 17,
      name: "Artist 17",
      xHandle: "@artist17",
      profileImage: null
    },
    {
      id: 18,
      name: "Artist 18",
      xHandle: "@artist18",
      profileImage: null
    },
    {
      id: 19,
      name: "Artist 19",
      xHandle: "@artist19",
      profileImage: null
    },
    {
      id: 20,
      name: "Artist 20",
      xHandle: "@artist20",
      profileImage: null
    },
    {
      id: 21,
      name: "Artist 21",
      xHandle: "@artist21",
      profileImage: null
    },
    {
      id: 22,
      name: "Artist 22",
      xHandle: "@artist22",
      profileImage: null
    },
    {
      id: 23,
      name: "Artist 23",
      xHandle: "@artist23",
      profileImage: null
    },
    {
      id: 24,
      name: "Artist 24",
      xHandle: "@artist24",
      profileImage: null
    },
    {
      id: 25,
      name: "Artist 25",
      xHandle: "@artist25",
      profileImage: null
    },
    {
      id: 26,
      name: "Artist 26",
      xHandle: "@artist26",
      profileImage: null
    },
    {
      id: 27,
      name: "Artist 27",
      xHandle: "@artist27",
      profileImage: null
    },
    {
      id: 28,
      name: "Artist 28",
      xHandle: "@artist28",
      profileImage: null
    },
    {
      id: 29,
      name: "Artist 29",
      xHandle: "@artist29",
      profileImage: null
    },
    {
      id: 30,
      name: "Artist 30",
      xHandle: "@artist30",
      profileImage: null
    },
    {
      id: 31,
      name: "Artist 31",
      xHandle: "@artist31",
      profileImage: null
    },
    {
      id: 32,
      name: "Artist 32",
      xHandle: "@artist32",
      profileImage: null
    },
    {
      id: 33,
      name: "Artist 33",
      xHandle: "@artist33",
      profileImage: null
    },
    {
      id: 34,
      name: "Artist 34",
      xHandle: "@artist34",
      profileImage: null
    },
    {
      id: 35,
      name: "Artist 35",
      xHandle: "@artist35",
      profileImage: null
    },
    {
      id: 36,
      name: "Artist 36",
      xHandle: "@artist36",
      profileImage: null
    },
    {
      id: 37,
      name: "Artist 37",
      xHandle: "@artist37",
      profileImage: null
    },
    {
      id: 38,
      name: "Artist 38",
      xHandle: "@artist38",
      profileImage: null
    },
    {
      id: 39,
      name: "Artist 39",
      xHandle: "@artist39",
      profileImage: null
    },
    {
      id: 40,
      name: "Artist 40",
      xHandle: "@artist40",
      profileImage: null
    },
    {
      id: 41,
      name: "Artist 41",
      xHandle: "@artist41",
      profileImage: null
    },
    {
      id: 42,
      name: "Artist 42",
      xHandle: "@artist42",
      profileImage: null
    },
    {
      id: 43,
      name: "Artist 43",
      xHandle: "@artist43",
      profileImage: null
    },
    {
      id: 44,
      name: "Artist 44",
      xHandle: "@artist44",
      profileImage: null
    },
    {
      id: 45,
      name: "Artist 45",
      xHandle: "@artist45",
      profileImage: null
    },
    {
      id: 46,
      name: "Artist 46",
      xHandle: "@artist46",
      profileImage: null
    },
    {
      id: 47,
      name: "Artist 47",
      xHandle: "@artist47",
      profileImage: null
    },
    {
      id: 48,
      name: "Artist 48",
      xHandle: "@artist48",
      profileImage: null
    },
    {
      id: 49,
      name: "Artist 49",
      xHandle: "@artist49",
      profileImage: null
    },
    {
      id: 50,
      name: "Artist 50",
      xHandle: "@artist50",
      profileImage: null
    },
    {
      id: 51,
      name: "Artist 51",
      xHandle: "@artist51",
      profileImage: null
    },
    {
      id: 52,
      name: "Artist 52",
      xHandle: "@artist52",
      profileImage: null
    }
  ]

  // Generate 52 total slots (real artists + placeholders)
  const generateArtistSlots = () => {
    const slots = []
    
    // Add real artists first
    artists.forEach((artist, index) => {
      slots.push({
        ...artist,
        isReal: true
      })
    })
    
    // Fill remaining slots with placeholders
    for (let i = artists.length; i < 52; i++) {
      slots.push({
        id: i + 1,
        name: `Artist ${i + 1}`,
        xHandle: `@artist${i + 1}`,
        profileImage: null,
        isReal: false
      })
    }
    
    return slots
  }

  const artistSlots = generateArtistSlots()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Validate form
    if (!formData.artistName.trim() || !formData.twitterHandle.trim() || !formData.medium.trim() || !formData.expectation.trim()) {
      setSubmitStatus('error')
      setErrorMessage('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    // Clean Twitter handle (add @ if missing)
    const cleanTwitterHandle = formData.twitterHandle.startsWith('@') 
      ? formData.twitterHandle 
      : `@${formData.twitterHandle}`

    try {
      // Submit to our API route
      const response = await fetch('/api/lineup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistName: formData.artistName,
          twitterHandle: cleanTwitterHandle,
          medium: formData.medium,
          expectation: formData.expectation,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          artistName: '',
          twitterHandle: '',
          medium: '',
          expectation: ''
        })
      } else {
        throw new Error('Form submission failed')
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 tracking-wider">
              <img 
                src="/images/lineuplogo.svg" 
                alt="LINE UP!" 
                className="h-20 md:h-28 mx-auto"
              />
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-white/80">
              
            </p>
          </div>

          {/* Q&A Section */}
          <div className="mb-20">
            <h2 className="font-bebas text-3xl md:text-4xl mb-8 tracking-wider text-center">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            
            <div className="space-y-4">
              {/* Question 1 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(1)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    What's is LINE UP!
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(1) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(1) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      LINE UP! is a collaborative collection of artworks created by Silhouettes and a group of artists.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(2)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    What's the reason for the collab?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(2) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(2) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      The reason for the collab is to explore new ways of creating artwork, bringing more eyes on the artists and their work.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 3 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(3)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    I am an artist, how can I join the collab?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(3) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(3) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      Next to the questions, there is a form to submit your collaboration request. Please fill in the form with your artist name, twitter handle, medium, and google drive link to your artwork. We will review your request and get back to you as soon as possible.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 4 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(4)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    What will be the mint price?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(4) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(4) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      There will be 4 different mint phases. For all weeks, the mint prices will be fixed.
                      <br />
                      <br />
                      1. FREE airdrop for 5x Silhouettes NFT holders
                      <br />
                      2. 0.006 ETH for 2-3-4x Silhouettes NFT holders
                      <br />
                      3. 0.0018 ETH for 1x Silhouettes NFT holders
                      <br />
                      4. 0.0024 ETH for Public Sale
                    </p>
                  </div>
                )}
              </div>

              {/* Question 5 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(5)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    Do i have to hold a Silhouettes NFT to submit my artwork?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(5) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(5) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      No. All artists are welcome to submit their artwork.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 6 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(6)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    How will be the mint revenue distributed?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(6) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(6) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      100% mint revenue will be distributed to the artists.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 7 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(7)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    How many artists will be selected for the collection?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(7) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(7) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      There will be 52 artists in the LINE UP! collection. Each week we will reveal 1 artist. (Start date: to be announced)
                    </p>
                  </div>
                )}
              </div>

              {/* Question 8 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(8)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    What is the edition size?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(8) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(8) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      The edition size will be 200.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 9 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(9)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    Will artists get artwork from their collab drop?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(9) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(9) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      Yes. 5 editions to the artists, 5 editions to the Silhouettes vault.
                    </p>
                  </div>
                )}
              </div>

              {/* Question 10 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(10)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    What steps should i follow to submit my artwork?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(10) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(10) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      <b>Step 1:</b> Go to <a href="/gallery" className="text-white hover:text-white/80 underline">Gallery</a> tab.
                      <br />
                      <br />
                      <b>Step 2:</b> Select a Silhouettes NFT from the gallery. You can download .svg or .png file.
                      <br />
                      <br />
                      <b>Step 3:</b> Create an artwork by using, or inspire by that Silhouettes NFT. There is no limitation, be creative, try to represent your style.
                      <br />
                      <br />
                      <b>Step 4:</b> Then go to <a href="/lineup" className="text-white hover:text-white/80 underline">LINE UP!</a> page and fill the form.
                      <br />
                    </p>
                  </div>
                )}
              </div>

              {/* Question 11 */}
              <div className="bg-black border border-white/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQuestion(11)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-bebas text-lg sm:text-xl tracking-wider text-white">
                    What is the deadline to submit my artwork?
                  </h3>
                  <span className="text-white text-2xl transition-transform duration-200">
                    {expandedQuestions.includes(11) ? '−' : '+'}
                  </span>
                </button>
                {expandedQuestions.includes(11) && (
                  <div className="bg-white/5 p-6 border-t border-white/20">
                    <p className="text-white/90 leading-relaxed">
                      There is no deadline to submit your artwork. Artworks will be reviewed during 52 weeks, and will be selected for the drop.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Form Section Title */}
          <div className="text-center mb-8">
            <h2 className="font-bebas text-3xl md:text-4xl tracking-wider text-white">
              LINE UP!
            </h2>
          </div>
          
          <div className="bg-black border border-white/20 p-6 sm:p-8 lg:p-12 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Artist Name */}
              <div className="space-y-2">
                <label htmlFor="artistName" className="block font-bebas text-lg tracking-wider">
                  ARTIST NAME *
                </label>
                <input
                  type="text"
                  id="artistName"
                  name="artistName"
                  value={formData.artistName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 focus:border-white/60 outline-none transition-colors text-white placeholder-white/50 rounded"
                  placeholder="Enter your artist name"
                  required
                />
              </div>

              {/* Twitter Handle */}
              <div className="space-y-2">
                <label htmlFor="twitterHandle" className="block font-bebas text-lg tracking-wider">
                  TWITTER HANDLE *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">
                    @
                  </span>
                  <input
                    type="text"
                    id="twitterHandle"
                    name="twitterHandle"
                    value={formData.twitterHandle}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 bg-transparent border border-white/30 focus:border-white/60 outline-none transition-colors text-white placeholder-white/50 rounded"
                    placeholder="username"
                    required
                  />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-2">
                <label htmlFor="medium" className="block font-bebas text-lg tracking-wider">
                  MEDIUM *
                </label>
                <input
                  type="text"
                  id="medium"
                  name="medium"
                  value={formData.medium}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 focus:border-white/60 outline-none transition-colors text-white placeholder-white/50 rounded"
                  placeholder="e.g., Digital Art, Photography, 3D, Music, etc."
                  required
                />
              </div>

              {/* Expectation */}
              <div className="space-y-2">
                <label htmlFor="expectation" className="block font-bebas text-lg tracking-wider">
                  GOOGLE DRIVE LINK TO ARTWORK *
                </label>
                <textarea
                  id="expectation"
                  name="expectation"
                  value={formData.expectation}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 focus:border-white/60 outline-none transition-colors text-white placeholder-white/50 resize-vertical rounded"
                  placeholder="Google Drive link to artwork you created for LINE UP! collab. Make sure link setting is 'general access > anyone with the link is viewer'"
                  required
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-3 text-green-400 bg-green-400/10 border border-green-400/20 p-4 rounded">
                  <Check size={20} />
                  <span>Thank you! Your collaboration request has been submitted successfully.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-3 text-red-400 bg-red-400/10 border border-red-400/20 p-4 rounded">
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-4 font-bebas text-lg tracking-wider hover:bg-white/90 disabled:bg-white/50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-3 rounded"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>SUBMITTING...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>SUBMIT COLLABORATION REQUEST</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 sm:mt-12 text-center">
            
          </div>
        </div>

        {/* Line up Section - Hidden */}
        <div 
          className="hidden" 
          style={{ display: 'none !important' }}
          id="lineup-section"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl mt-20">
            <div className="text-center mb-16">
              <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl mb-6 tracking-wider">
                LINE UP
              </h2>
              <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-white/80">
                Meet the artists collaborating with Silhouettes
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {artistSlots.map((artist, index) => (
                <div key={artist.id} className="group border-2 border-white p-2 rounded">
                  {/* Profile Photo - Square box */}
                  <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 border border-white/20 overflow-hidden hover:border-white/40 hover:from-white/10 hover:to-white/15 transition-all duration-300">
                    {artist.profileImage ? (
                      <img 
                        src={artist.profileImage} 
                        alt={artist.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center">
                        {/* No X logo for unrevealed artists - just clean background */}
                      </div>
                    )}
                  </div>
                  
                  {/* Black Bar Below the Square - Always Visible */}
                  <div className="mt-2 bg-black py-2 px-3 flex items-center justify-center space-x-3 rounded">
                    {/* Artist Name - Only show if profile image exists */}
                    {artist.profileImage && (
                      <span className="text-white font-bebas text-base tracking-wider">
                        {artist.name}
                      </span>
                    )}
                    
                    {/* X Logo Link - Only show if profile image exists */}
                    {artist.profileImage && (
                      <a 
                        href={`https://x.com/${artist.xHandle.replace('@', '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center text-white hover:text-white/80 transition-colors"
                      >
                        <svg 
                          className="w-4 h-4" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden Script to Prevent Console Access */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Hide lineup section completely
              document.addEventListener('DOMContentLoaded', function() {
                const lineupSection = document.getElementById('lineup-section');
                if (lineupSection) {
                  lineupSection.style.display = 'none';
                  lineupSection.style.visibility = 'hidden';
                  lineupSection.style.opacity = '0';
                  lineupSection.style.position = 'absolute';
                  lineupSection.style.left = '-9999px';
                  lineupSection.style.pointerEvents = 'none';
                }
              });
              
              // Override console methods to hide any lineup-related logs
              const originalLog = console.log;
              const originalInfo = console.info;
              const originalWarn = console.warn;
              const originalError = console.error;
              
              console.log = function(...args) {
                if (!args.some(arg => String(arg).toLowerCase().includes('lineup'))) {
                  originalLog.apply(console, args);
                }
              };
              
              console.info = function(...args) {
                if (!args.some(arg => String(arg).toLowerCase().includes('lineup'))) {
                  originalInfo.apply(console, args);
                }
              };
              
              console.warn = function(...args) {
                if (!args.some(arg => String(arg).toLowerCase().includes('lineup'))) {
                  originalWarn.apply(console, args);
                }
              };
              
              console.error = function(...args) {
                if (!args.some(arg => String(arg).toLowerCase().includes('lineup'))) {
                  originalError.apply(console, args);
                }
              };
            `
          }}
        />
      </main>
    </div>
  )
} 