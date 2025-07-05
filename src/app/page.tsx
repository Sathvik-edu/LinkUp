'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'

export default function HomePage() {
  const { user, loading } = useAuth()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [demoMode, setDemoMode] = useState(false)

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
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If user is logged in or demo mode is enabled, show dashboard
  if (user || demoMode) {
    return (
      <div className="overflow-hidden relative min-h-screen gradient-bg-secondary">
        {/* Background Elements */}
        <div className="overflow-hidden absolute inset-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

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
              <div className="hidden items-center md:flex">
                <div className="flex items-center space-x-8">
                  <a href="/" className="relative text-gray-600 transition-colors hover:text-gray-900 group">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
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
              <div className="flex items-center space-x-4">
                <Avatar name={user?.email || "Demo User"} size="md" />
                <span className="text-sm font-medium text-gray-700">{user?.email || "Demo User"}</span>
                {demoMode && (
                  <button 
                    onClick={() => setDemoMode(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Exit Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="space-y-8 text-center">
              <div className="inline-flex items-center px-6 py-3 mb-8 text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-pulse">
                <span className="mr-3 w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                Welcome back to LinkUp
              </div>
              
              <h1 className="text-5xl font-black leading-tight text-gray-900 md:text-7xl">
                Your Social
                <span className="block animate-pulse gradient-text">
                  Command Center
                </span>
              </h1>
              
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
                Welcome back! Here's what's happening with your events and friends.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="relative z-10 px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-4">
            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-black text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-3xl font-black text-gray-900">5</p>
                </div>
              </div>
            </div>

            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Groups</p>
                  <p className="text-3xl font-black text-gray-900">8</p>
                </div>
              </div>
            </div>

            <div className="transition-all duration-500 nike-card group hover:scale-105">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Polls</p>
                  <p className="text-3xl font-black text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-3xl font-black text-gray-900">
                Quick
                <span className="block gradient-text">Actions</span>
              </h3>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Jump straight into your favorite features and start planning together.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              <Link href="/dashboard/calendar" className="text-center transition-all duration-500 nike-card group hover:scale-105">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">📅</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Calendar Sync</p>
                <p className="text-sm text-gray-600">Sync with Google & Apple</p>
              </Link>
              <Link href="/dashboard/polls" className="text-center transition-all duration-500 nike-card group hover:scale-105">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">📊</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Group Polls</p>
                <p className="text-sm text-gray-600">Vote on activities</p>
              </Link>
              <Link href="/dashboard/expenses" className="text-center transition-all duration-500 nike-card group hover:scale-105">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">💸</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Split Bills</p>
                <p className="text-sm text-gray-600">Track expenses</p>
              </Link>
              <Link href="/dashboard/location" className="text-center transition-all duration-500 nike-card group hover:scale-105">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">📍</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Location Alerts</p>
                <p className="text-sm text-gray-600">Ping friends nearby</p>
              </Link>
              <Link href="/dashboard/availability" className="text-center transition-all duration-500 nike-card group hover:scale-105">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">👥</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Who's In?</p>
                <p className="text-sm text-gray-600">Check availability</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-12">
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
      </div>
    )
  }

  // If user is not logged in, show landing page
  const features = [
    {
      icon: "🎯",
      title: "Smart Planning",
      description: "AI-powered suggestions for the perfect time and place",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "🤝",
      title: "Group Sync",
      description: "Seamlessly coordinate with friends and family",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "💰",
      title: "Expense Split",
      description: "Automatically split bills and track shared expenses",
      color: "from-green-500 to-green-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20"
          style={{
            left: `${mousePosition.x * 0.1}px`,
            top: `${mousePosition.y * 0.1}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-20"
          style={{
            right: `${mousePosition.x * 0.05}px`,
            bottom: `${mousePosition.y * 0.05}px`,
            transform: 'translate(50%, 50%)'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="w-8 h-8 gradient-bg-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">LinkUp</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a href="#community" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-primary transform hover:scale-105">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-pulse">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-ping"></span>
                Join 10,000+ users planning together
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
                Plan Together,
                <span className="block gradient-text animate-pulse">
                  Stay Connected
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The ultimate social planning platform that brings friends, family, and communities together. 
                <span className="font-semibold text-blue-600"> No more endless group chats.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link href="/auth/signup" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <span className="relative z-10">Start Planning Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="group flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <div className="w-0 h-0 border-l-2 border-l-white border-t-1 border-t-transparent border-b-1 border-b-transparent ml-0.5"></div>
                  </div>
                  <span>Watch Demo</span>
                </button>
                <button 
                  onClick={() => setDemoMode(true)}
                  className="group flex items-center justify-center space-x-3 border-2 border-green-300 text-green-700 hover:border-green-500 hover:text-green-600 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span>🚀 Try Dashboard Demo</span>
                </button>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar 
                      key={i} 
                      name={`User ${i}`} 
                      size="md" 
                      className="border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300" 
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-gray-900 text-lg">500+</span>
                  <br />
                  events planned this week
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Main Interactive Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-all duration-500 hover:shadow-3xl">
                <div className="gradient-bg-primary rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Weekend Adventure</h3>
                      <div className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">12 people</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Sarah joined the trip</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Mike voted for hiking</span>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-white/10 rounded-lg">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">Emma added expense</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                    <span className="text-sm font-semibold text-gray-700">Date & Time</span>
                    <span className="text-sm text-gray-600">Feb 15, 9:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                    <span className="text-sm font-semibold text-gray-700">Location</span>
                    <span className="text-sm text-gray-600">Mountain Trail</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                    <span className="text-sm font-semibold text-gray-700">Budget</span>
                    <span className="text-sm text-gray-600">$25/person</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section id="features" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Everything you need to
              <span className="block gradient-text"> plan together</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to make group planning effortless and enjoyable. 
              Built for real people, real connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover-lift p-8 text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Community Section */}
      <section id="community" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Join the
              <span className="block gradient-text"> LinkUp community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with like-minded people and discover amazing events happening around you. 
              Your next adventure is waiting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: "🌍",
                  title: "Discover Local Events",
                  description: "Find exciting events happening in your area and join communities that share your interests.",
                  color: "blue"
                },
                {
                  icon: "💝",
                  title: "Build Meaningful Connections",
                  description: "Create lasting friendships and professional networks through shared experiences and activities.",
                  color: "purple"
                },
                {
                  icon: "⚡",
                  title: "Stay Active & Engaged",
                  description: "Never miss out on opportunities to explore new places, try new activities, and expand your horizons.",
                  color: "green"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-6 group cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-2xl flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <Card className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 gradient-bg-primary rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">L</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">LinkUp Community</div>
                      <div className="text-sm text-gray-500">2,847 members online</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah", action: "Just joined the hiking group!", time: "2m ago", avatar: "Sarah" },
                      { name: "Mike", action: "Created 'Tech Meetup' event", time: "5m ago", avatar: "Mike" },
                      { name: "Emma", action: "Voted for coffee meetup", time: "8m ago", avatar: "Emma" }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105">
                        <Avatar name={user.avatar} size="md" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.action}</div>
                        </div>
                        <div className="text-xs text-gray-400">{user.time}</div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 btn-primary transform hover:scale-105">
                    Join Community
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section id="pricing" className="py-24 gradient-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Ready to transform your
            <span className="block"> social planning?</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who are already planning better together. 
            Start your first event in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/auth/signup" className="group relative overflow-hidden bg-white text-blue-600 hover:text-blue-700 font-black py-5 px-10 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <button 
              onClick={() => setDemoMode(true)}
              className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 font-black py-5 px-10 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105"
            >
              Try Dashboard Demo
            </button>
          </div>
          <p className="text-blue-100 text-lg">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 gradient-bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <h3 className="text-2xl font-black">LinkUp</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The ultimate social planning platform that brings people together.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "API", "Integrations"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Support", links: ["Help Center", "Community", "Status", "Privacy"] }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-lg mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinkUp. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <Modal isOpen={isVideoPlaying} onClose={() => setIsVideoPlaying(false)}>
        <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-xl">Demo video would play here</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
} 