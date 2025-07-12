'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { AnimatedSection, AnimatedCard, AnimatedText, ParallaxSection, FloatingElement } from '@/components/ui/AnimatedSection'
import { AnimatedBackground, GradientOrb, FloatingParticles } from '@/components/ui/AnimatedBackground'
import { extractUserData } from '@/lib/clerk'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Show loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Handle case where user data is not available
  const { name: userName, email: userEmail } = extractUserData(user)
  
  // Extract first name from user name
  const firstName = userName.split(' ')[0] || 'Demo'

  return (
    <AnimatedBackground className="min-h-screen gradient-bg-secondary">
      <FloatingParticles count={30} />
      <GradientOrb color="blue" className="-top-40 -right-40" />
      <GradientOrb color="purple" className="-bottom-40 -left-40" delay={2} />
      <GradientOrb color="pink" className="top-40 left-40" delay={4} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 backdrop-blur-md transition-all duration-300 bg-white/80">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 cursor-pointer group">
                <div className="flex justify-center items-center w-8 h-8 rounded-lg transition-transform duration-300 transform gradient-bg-primary group-hover:scale-110">
                  <span className="text-sm font-bold text-white">L</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">LinkUp</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden items-center md:flex">
              <div className="flex items-center space-x-4 lg:space-x-8">
                <Link href="/" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              {/* Separator */}
              <div className="mx-4 lg:mx-6 w-px h-6 bg-gray-300"></div>
              
              <div className="flex items-center space-x-4 lg:space-x-8">
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
                <Link href="/dashboard/location" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Location
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/availability" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                  Availability
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>
            
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Avatar name={userName} size="md" />
              <span className="text-sm font-medium text-gray-700 hidden lg:block">{userEmail}</span>
              <SignOutButton>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-1 rounded-lg hover:bg-gray-100">
                  Sign Out
                </button>
              </SignOutButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">
                  Home
                </Link>
                <div className="border-t border-gray-200 pt-4">
                  <Link href="/dashboard/calendar" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 block">
                    Calendar
                  </Link>
                  <Link href="/dashboard/polls" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 block">
                    Polls
                  </Link>
                  <Link href="/dashboard/expenses" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 block">
                    Expenses
                  </Link>
                  <Link href="/dashboard/location" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 block">
                    Location
                  </Link>
                  <Link href="/dashboard/availability" className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 block">
                    Availability
                  </Link>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <Avatar name={userName} size="sm" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{userName}</div>
                    <div className="text-xs text-gray-500">{userEmail}</div>
                  </div>
                  <SignOutButton>
                    <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-1 rounded-lg hover:bg-gray-100">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatedSection className="relative py-12 sm:py-16 lg:py-20 xl:py-32" direction="up" delay={0.2}>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-6 sm:space-y-8 text-center">
            <FloatingElement className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse">
              <span className="mr-2 sm:mr-3 w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-ping"></span>
              Welcome back to LinkUp
            </FloatingElement>
            
            <AnimatedText 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900"
              delay={0.4}
              stagger={0.1}
            >
              {`${firstName}'s Social Command Center`}
            </AnimatedText>
            
            <AnimatedSection className="mx-auto max-w-2xl sm:max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-600" direction="up" delay={0.8}>
              Welcome back! Here's what's happening with your events and friends.
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-12 sm:pb-16 lg:pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Stats Cards */}
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12" direction="up" delay={0.2}>
          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.1}>
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">12</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.2}>
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">5</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.3}>
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Groups</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">8</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.4}>
            <div className="flex items-center">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active Polls</p>
                <p className="text-2xl sm:text-3xl font-black text-gray-900">3</p>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedSection>

        {/* Quick Actions */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="mb-3 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              Quick
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl text-gray-600">
              Jump straight into your favorite features and start planning together.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            <Link href="/dashboard/calendar" className="text-center transition-all duration-500 nike-card group hover:scale-105 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">📅</div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-gray-900">Calendar Sync</p>
              <p className="text-xs sm:text-sm text-gray-600">Sync with Google & Apple</p>
            </Link>
            <Link href="/dashboard/polls" className="text-center transition-all duration-500 nike-card group hover:scale-105 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">📊</div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-gray-900">Group Polls</p>
              <p className="text-xs sm:text-sm text-gray-600">Vote on activities</p>
            </Link>
            <Link href="/dashboard/expenses" className="text-center transition-all duration-500 nike-card group hover:scale-105 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">💸</div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-gray-900">Split Bills</p>
              <p className="text-xs sm:text-sm text-gray-600">Track expenses</p>
            </Link>
            <Link href="/dashboard/location" className="text-center transition-all duration-500 nike-card group hover:scale-105 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">📍</div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-gray-900">Location Alerts</p>
              <p className="text-xs sm:text-sm text-gray-600">Ping friends nearby</p>
            </Link>
            <Link href="/dashboard/availability" className="text-center transition-all duration-500 nike-card group hover:scale-105 p-4 sm:p-6">
              <div className="mb-3 sm:mb-4 text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110">👥</div>
              <p className="mb-1 sm:mb-2 text-sm sm:text-lg font-bold text-gray-900">Who's In?</p>
              <p className="text-xs sm:text-sm text-gray-600">Check availability</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Recent
              <span className="block gradient-text">Activity</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Stay updated with what's happening in your groups.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-start space-x-4">
                <Avatar name="Sarah" size="md" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sarah joined Weekend Trip</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-start space-x-4">
                <Avatar name="Mike" size="md" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Mike voted for hiking</p>
                  <p className="text-sm text-gray-600">4 hours ago</p>
                </div>
              </div>
            </div>
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-start space-x-4">
                <Avatar name="Emma" size="md" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Emma added expense</p>
                  <p className="text-sm text-gray-600">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Upcoming
              <span className="block gradient-text">Events</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Your next adventures are just around the corner.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="blue">This Weekend</Badge>
                  <span className="text-sm text-gray-600">12 people</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Weekend Adventure</h4>
                <p className="text-gray-600 mb-4">Hiking trip to the mountains with friends</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Confirmed</span>
                </div>
              </div>
            </div>
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="purple">Next Week</Badge>
                  <span className="text-sm text-gray-600">8 people</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Game Night</h4>
                <p className="text-gray-600 mb-4">Board games and pizza at John's place</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Planning</span>
                </div>
              </div>
            </div>
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="green">In 2 weeks</Badge>
                  <span className="text-sm text-gray-600">15 people</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Birthday Party</h4>
                <p className="text-gray-600 mb-4">Celebrating Emma's birthday at the park</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Voting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AnimatedBackground>
  )
} 