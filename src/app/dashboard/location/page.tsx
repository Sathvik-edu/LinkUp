'use client'

import { useState, lazy, Suspense } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { AnimatedSection, AnimatedCard, AnimatedText, ParallaxSection, FloatingElement } from '@/components/ui/AnimatedSection'

// Lazy load the heavy LocationReminders component
const LocationReminders = lazy(() => import('@/components/features/LocationReminders'))

export default function LocationDashboardPage() {
  const { user, isLoaded } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Handle case where user data is not available
  const userName = user?.fullName || user?.emailAddresses?.[0]?.emailAddress || "Demo User"
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "Demo User"
  
  // Extract first name from user name
  const firstName = userName.split(' ')[0] || 'Demo'

  return (
    <div className="overflow-hidden relative min-h-screen gradient-bg-secondary">
      {/* Background Elements */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md transition-all duration-300 bg-white/80">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
                <div className="flex justify-center items-center w-8 h-8 rounded-lg transition-transform duration-300 transform gradient-bg-primary group-hover:scale-110">
                  <span className="text-sm font-bold text-white">L</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">LinkUp</h1>
              </Link>
            </div>
            <div className="hidden items-center md:flex">
              <div className="flex items-center space-x-8">
                <Link href="/" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              {/* Separator */}
              <div className="mx-6 w-px h-6 bg-gray-300"></div>
              
              <div className="flex items-center space-x-8">
                <Link href="/dashboard/calendar" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Calendar
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/polls" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Polls
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/expenses" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Expenses
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/location" className="relative text-purple-600 font-medium transition-colors group">
                  Location
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/availability" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Availability
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar name={userName} size="md" />
              <span className="text-sm font-medium text-gray-700">{userEmail}</span>
              <SignOutButton>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-1 rounded-lg hover:bg-gray-100">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-purple-600 font-medium">Location Reminders</span>
        </nav>
      </div>

      {/* Hero Section */}
      <AnimatedSection className="relative py-20 lg:py-32" direction="up" delay={0.2}>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <FloatingElement className="inline-flex items-center px-6 py-3 mb-8 text-sm font-medium text-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse">
              <span className="mr-3 w-3 h-3 bg-purple-500 rounded-full animate-ping"></span>
              Location Reminders Dashboard
            </FloatingElement>
            
            <AnimatedText 
              className="text-5xl font-black leading-tight text-gray-900 md:text-7xl"
              delay={0.4}
              stagger={0.1}
            >
              {`${firstName}'s Location Command Center`}
            </AnimatedText>
            
            <AnimatedSection className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl" direction="up" delay={0.8}>
              Stay connected with friends nearby. Set location-based reminders and never miss a chance to meet up.
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Location Stats */}
        <AnimatedSection className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-4" direction="up" delay={0.2}>
          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.1}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Reminders</p>
                <p className="text-3xl font-black text-gray-900">8</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.2}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Friends Nearby</p>
                <p className="text-3xl font-black text-gray-900">12</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.3}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Notifications</p>
                <p className="text-3xl font-black text-gray-900">24</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.4}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Ping</p>
                <p className="text-3xl font-black text-gray-900">2m</p>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection className="mb-12" direction="up" delay={0.3}>
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Location
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Create reminders, ping friends, and stay connected with your network.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <AnimatedCard className="text-center transition-all duration-500 nike-card group hover:scale-105" delay={0.1}>
              <button onClick={() => setIsModalOpen(true)} className="w-full">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">📍</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Create Reminder</p>
                <p className="text-sm text-gray-600">Set location-based reminder</p>
              </button>
            </AnimatedCard>
            <AnimatedCard className="text-center transition-all duration-500 nike-card group hover:scale-105" delay={0.2}>
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">📡</div>
              <p className="mb-2 text-lg font-bold text-gray-900">Ping Friends</p>
              <p className="text-sm text-gray-600">Notify nearby friends</p>
            </AnimatedCard>
            <AnimatedCard className="text-center transition-all duration-500 nike-card group hover:scale-105" delay={0.3}>
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">🗺️</div>
              <p className="mb-2 text-lg font-bold text-gray-900">View Map</p>
              <p className="text-sm text-gray-600">See friend locations</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Location Reminders Component - Lazy Loaded */}
        <Suspense fallback={
          <AnimatedSection className="text-center py-12" direction="up" delay={0.8}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading location features...</p>
          </AnimatedSection>
        }>
          <LocationReminders />
        </Suspense>
      </main>

      {/* Create Reminder Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Create Location Reminder</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Title</label>
              <Input 
                type="text" 
                placeholder="e.g., Coffee Meetup"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Input 
                type="text" 
                placeholder="Enter address or location"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Radius (miles)</label>
              <Input 
                type="number" 
                placeholder="0.5"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Create Reminder
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 