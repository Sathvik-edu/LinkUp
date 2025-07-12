'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { AnimatedSection, AnimatedCard, AnimatedText, ParallaxSection, FloatingElement } from '@/components/ui/AnimatedSection'
import Polls from '@/components/features/Polls'

export default function PollsDashboardPage() {
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
    <div className="min-h-screen gradient-bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
                <div className="w-8 h-8 gradient-bg-primary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <h1 className="text-xl font-bold gradient-text">LinkUp</h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
              
              {/* Separator */}
              <div className="mx-6 h-6 w-px bg-gray-300"></div>
              
              <div className="flex items-center space-x-8">
                <Link href="/dashboard/calendar" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Calendar
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/polls" className="text-purple-600 font-medium transition-colors relative group">
                  Polls
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/expenses" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Expenses
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/location" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Location
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/availability" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-purple-600 font-medium">Smart Polls</span>
        </nav>
      </div>

      {/* Hero Section */}
      <AnimatedSection className="relative py-20 lg:py-32" direction="up" delay={0.2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <FloatingElement className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-8 animate-pulse">
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-ping"></span>
              Smart Polls Dashboard
            </FloatingElement>
            
            <AnimatedText 
              className="text-5xl md:text-7xl font-black text-gray-900 leading-tight"
              delay={0.4}
              stagger={0.1}
            >
              {`${firstName}'s Smart Polls Center`}
            </AnimatedText>
            
            <AnimatedSection className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed" direction="up" delay={0.8}>
              Create polls, gather votes, and make democratic decisions with instant results and analytics.
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">

        {/* Polls Stats */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12" direction="up" delay={0.2}>
          <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500" delay={0.1}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Polls</p>
                <p className="text-3xl font-black text-gray-900">7</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500" delay={0.2}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-black text-gray-900">12</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500" delay={0.3}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Votes</p>
                <p className="text-3xl font-black text-gray-900">156</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500" delay={0.4}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Participation</p>
                <p className="text-3xl font-black text-gray-900">89%</p>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection className="mb-12" direction="up" delay={0.3}>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Poll
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create new polls and manage existing ones with powerful analytics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500 text-center" delay={0.1}>
              <button onClick={() => setIsModalOpen(true)} className="w-full">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">➕</div>
                <p className="text-lg font-bold text-gray-900 mb-2">Create Poll</p>
                <p className="text-sm text-gray-600">Start a new poll</p>
              </button>
            </AnimatedCard>
            <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500 text-center" delay={0.2}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Analytics</p>
              <p className="text-sm text-gray-600">View poll insights</p>
            </AnimatedCard>
            <AnimatedCard className="nike-card group hover:scale-105 transition-all duration-500 text-center" delay={0.3}>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📋</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Templates</p>
              <p className="text-sm text-gray-600">Use poll templates</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Input
              placeholder="Search polls, questions, or results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Polls Component */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Smart
              <span className="block gradient-text">Polls</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create interactive polls with multiple question types and get instant results with detailed analytics.
            </p>
          </div>
          <div className="nike-card">
            <Polls />
          </div>
        </div>
      </main>

      {/* Create Poll Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Poll"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Poll Question"
            placeholder="What would you like to ask?"
          />
          <Input
            label="Description"
            placeholder="Add context to your poll"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Poll Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
              <option>Multiple Choice</option>
              <option>Yes/No</option>
              <option>Rating Scale</option>
              <option>Date/Time</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Options</label>
            <Input placeholder="Option 1" />
            <Input placeholder="Option 2" />
            <Input placeholder="Option 3" />
            <Input placeholder="Option 4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="End Date"
              type="date"
            />
            <Input
              label="End Time"
              type="time"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              Create Poll
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 