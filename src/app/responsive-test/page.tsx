'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'

export default function ResponsiveTestPage() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('')

  // Detect current breakpoint
  if (typeof window !== 'undefined') {
    const width = window.innerWidth
    if (width >= 1536) setCurrentBreakpoint('2xl (1536px+)')
    else if (width >= 1280) setCurrentBreakpoint('xl (1280px+)')
    else if (width >= 1024) setCurrentBreakpoint('lg (1024px+)')
    else if (width >= 768) setCurrentBreakpoint('md (768px+)')
    else if (width >= 640) setCurrentBreakpoint('sm (640px+)')
    else setCurrentBreakpoint('xs (320px+)')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Responsive Design Test
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6">
            Testing responsive design across all screen sizes
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Current Breakpoint: {currentBreakpoint}
          </div>
        </div>

        {/* Breakpoint Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-red-100 text-red-800 p-3 rounded-lg text-center text-sm">
            <div className="font-bold">XS</div>
            <div className="text-xs">320px+</div>
          </div>
          <div className="bg-orange-100 text-orange-800 p-3 rounded-lg text-center text-sm">
            <div className="font-bold">SM</div>
            <div className="text-xs">640px+</div>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center text-sm">
            <div className="font-bold">MD</div>
            <div className="text-xs">768px+</div>
          </div>
          <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center text-sm">
            <div className="font-bold">LG</div>
            <div className="text-xs">1024px+</div>
          </div>
          <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center text-sm">
            <div className="font-bold">XL</div>
            <div className="text-xs">1280px+</div>
          </div>
          <div className="bg-purple-100 text-purple-800 p-3 rounded-lg text-center text-sm">
            <div className="font-bold">2XL</div>
            <div className="text-xs">1536px+</div>
          </div>
        </div>

        {/* Typography Test */}
        <Card className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Typography Scaling</h2>
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
              Heading 1 - Responsive Text
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              Heading 2 - Scales with screen size
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700">
              Heading 3 - Adaptive typography
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
              This paragraph demonstrates responsive text sizing. The font size and line height adjust automatically 
              based on the screen size to ensure optimal readability across all devices.
            </p>
          </div>
        </Card>

        {/* Button Test */}
        <Card className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Button Responsiveness</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button size="sm" variant="primary">Small Button</Button>
            <Button size="md" variant="secondary">Medium Button</Button>
            <Button size="lg" variant="outline">Large Button</Button>
            <Button size="xl" variant="ghost">Extra Large</Button>
          </div>
        </Card>

        {/* Grid Layout Test */}
        <Card className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Responsive Grid Layouts</h2>
          
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Grid Responsive (1 → 2 → 3 → 4 → 5 columns)</h3>
            <div className="grid-responsive gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{i}</div>
                  <div className="text-sm text-blue-800">Grid Item</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Grid Responsive 2 (1 → 2 → 3 → 4 columns)</h3>
            <div className="grid-responsive-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{i}</div>
                  <div className="text-sm text-green-800">Grid Item</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Grid Responsive 3 (1 → 2 → 3 columns)</h3>
            <div className="grid-responsive-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-purple-100 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{i}</div>
                  <div className="text-sm text-purple-800">Grid Item</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Component Test */}
        <Card className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Component Responsiveness</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <Avatar name="John Doe" size="lg" className="mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Avatar Component</h3>
              <p className="text-sm text-gray-600">Scales appropriately on all devices</p>
            </div>
            <div className="text-center">
              <Badge variant="default" className="mb-4">Status Badge</Badge>
              <h3 className="text-lg font-semibold mb-2">Badge Component</h3>
              <p className="text-sm text-gray-600">Responsive padding and text sizing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Touch Targets</h3>
              <p className="text-sm text-gray-600">Minimum 44px on mobile devices</p>
            </div>
          </div>
        </Card>

        {/* Spacing Test */}
        <Card className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Responsive Spacing</h2>
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4">Container Padding</h3>
              <p className="text-sm sm:text-base text-gray-600">
                This container demonstrates responsive padding that increases with screen size.
              </p>
            </div>
            <div className="bg-gray-100 p-4 sm:p-6 lg:p-8 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4">Margin & Gap</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Margins and gaps scale appropriately for different screen sizes.
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation Test */}
        <Card className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Navigation Responsiveness</h2>
          <nav className="bg-white rounded-lg shadow-sm border">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">LinkUp</span>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-sm sm:text-base text-gray-600">
            Resize your browser window to see the responsive design in action!
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-gray-500">
            <span>Mobile: 320px - 639px</span>
            <span>Tablet: 640px - 1023px</span>
            <span>Desktop: 1024px+</span>
          </div>
        </div>
      </div>
    </div>
  )
} 