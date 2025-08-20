'use client'

import React, { useState } from 'react'
import Header from '../../components/Header'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Tools() {
  const [expandedTool, setExpandedTool] = useState<number | null>(null)

  const tools = [
    {
      id: 1,
      title: "Silhouettes Editor",
      description: "",
      url: "/tools/editor/silhouettes_editor.html",
      status: "live",
      features: []
    },
    {
      id: 2,
      title: "Silhouettes x Punk Generator",
      description: "",
      url: "/tools/punk/silhouettes_punk.html",
      status: "live",
      features: []
    },
    {
      id: 3,
      title: "Silhouettes x Opepen Generator",
      description: "",
      url: "/tools/opepen/opepen.html",
      status: "live",
      features: []
    },
    {
      id: 4,
      title: "Silhouetify Your Photos", 
      description: "",
      url: "/tools/tool-three/index.html",
      status: "coming soon",
      features: []
    }
  ]

  const toggleTool = (toolId: number) => {
    setExpandedTool(expandedTool === toolId ? null : toolId)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-44 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h1 className="font-bebas text-5xl md:text-7xl mb-6 tracking-wider">
              TOOLS
            </h1>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-white/80">
              Interactive tools for creating and exploring silhouette art. 
              Click on any tool below to expand and use it directly on this page.
            </p>
          </div>
          
          <div className="space-y-6">
            {tools.map((tool) => (
              <div key={tool.id} className="border border-white/20 overflow-hidden transition-all duration-300">
                {/* Tool Header - Always Visible */}
                <div 
                  className="p-8 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => toggleTool(tool.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <h2 className="font-bebas text-3xl tracking-wider">
                          {tool.title}
                        </h2>
                        <span className={`text-xs px-3 py-1 border ${
                          tool.status === 'live' 
                            ? 'border-green-500/50 text-green-400' 
                            : 'border-yellow-500/50 text-yellow-400'
                        }`}>
                          {tool.status.toUpperCase()}
                        </span>
                      </div>
                      {tool.description && (
                        <p className="text-white/80 leading-relaxed mb-4">
                          {tool.description}
                        </p>
                      )}
                      {tool.features && tool.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tool.features.map((feature, index) => (
                            <span 
                              key={index}
                              className="text-xs px-2 py-1 bg-white/10 text-white/70"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 ml-8">
                      <div className="flex items-center">
                        {expandedTool === tool.id ? (
                          <ChevronUp className="w-6 h-6 text-white/70" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-white/70" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tool Content - Expandable */}
                {expandedTool === tool.id && (
                  <div className="border-t border-white/20 bg-black/50">
                    {tool.status === 'live' ? (
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-bebas text-xl tracking-wider text-white/90">
                            USE {tool.title.toUpperCase()}
                          </h3>
                          <button
                            onClick={() => setExpandedTool(null)}
                            className="text-white/50 hover:text-white text-sm"
                          >
                            CLOSE ×
                          </button>
                        </div>
                        <div className="border border-white/20 rounded overflow-hidden">
                          <iframe
                            src={tool.url}
                            className="w-full h-[85vh] bg-black"
                            title={tool.title}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-popups-to-escape-sandbox"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <p className="text-white/60 text-sm">
                            Tool running in embedded mode. For full-screen experience, use "Open in New Tab" above.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <h3 className="font-bebas text-2xl mb-4 tracking-wider text-white/70">
                          COMING SOON
                        </h3>
                        <p className="text-white/60 mb-6">
                          This tool is currently in development. Check back soon for updates!
                        </p>
                        <div className="inline-block border border-white/30 px-6 py-2 text-white/50">
                          NOTIFY ME WHEN READY
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center p-8 border border-white/20">
            <h2 className="font-bebas text-2xl mb-4 tracking-wider">
              TOOL DEVELOPMENT
            </h2>
            <p className="text-white/80 mb-4">
              These tools are continuously evolving. Share your feedback and suggestions 
              to help improve the creative experience.
            </p>
            <p className="text-white/60 text-sm">
              For tool support or feature requests: tools@silhouettes.io
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 