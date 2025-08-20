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
      const response = await fetch('/api/collab', {
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
              COLLABORATION
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed text-white/80">
              Interested in collaborating with Silhouettes? Fill out this form and we'll get back to you.
            </p>
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
                  EXPECTATION FROM THE COLLAB *
                </label>
                <textarea
                  id="expectation"
                  name="expectation"
                  value={formData.expectation}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 focus:border-white/60 outline-none transition-colors text-white placeholder-white/50 resize-vertical rounded"
                  placeholder="Tell us about your collaboration ideas, what you'd like to create together, and what you hope to achieve..."
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
            <p className="text-white/60 text-sm sm:text-base">
              We review all collaboration requests and will get back to you within 48 hours.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 