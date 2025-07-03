'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import CalendarSync from '@/components/features/CalendarSync'
import Polls from '@/components/features/Polls'
import ExpenseSplit from '@/components/features/ExpenseSplit'
import LocationReminders from '@/components/features/LocationReminders'
import AvailabilityStatus from '@/components/features/AvailabilityStatus'

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFeature, setActiveFeature] = useState('calendar')

  return (
    <div className="min-h-screen gradient-bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
              <a href="/" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/features" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar name="John Doe" size="md" />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-pulse">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-ping"></span>
              Welcome back to LinkUp
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Your Social
              <span className="block gradient-text animate-pulse">
                Command Center
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Welcome back! Here's what's happening with your events and friends.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
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

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
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

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
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

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
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
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Quick
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jump straight into your favorite features and start planning together.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/features?tab=calendar" className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📅</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Calendar Sync</p>
              <p className="text-sm text-gray-600">Sync with Google & Apple</p>
            </Link>
            <Link href="/features?tab=polls" className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Group Polls</p>
              <p className="text-sm text-gray-600">Vote on activities</p>
            </Link>
            <Link href="/features?tab=expenses" className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💸</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Split Bills</p>
              <p className="text-sm text-gray-600">Track expenses</p>
            </Link>
            <Link href="/features?tab=location" className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📍</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Location Alerts</p>
              <p className="text-sm text-gray-600">Ping friends nearby</p>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Input
              placeholder="Search events, polls, or expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Recent
              <span className="block gradient-text">Activity</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest happenings in your social circles.
            </p>
          </div>
          <div className="nike-card">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <p className="text-xl text-gray-600 mb-2">All caught up!</p>
              <p className="text-gray-500">No recent activity to show</p>
            </div>
          </div>
        </div>

        {/* Interactive Features */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Interactive
              <span className="block gradient-text">Features</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Try out the powerful features that make LinkUp special. These are only available to signed-in users.
            </p>
          </div>

          {/* Feature Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { id: 'calendar', name: 'Calendar Sync', icon: '📅' },
                { id: 'polls', name: 'Smart Polls', icon: '📊' },
                { id: 'expenses', name: 'Expense Split', icon: '💰' },
                { id: 'location', name: 'Location Reminders', icon: '📍' },
                { id: 'availability', name: 'Who\'s In?', icon: '👥' }
              ].map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`group relative flex items-center space-x-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    activeFeature === feature.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{feature.icon}</span>
                  <span className="font-semibold text-lg">{feature.name}</span>
                  {activeFeature === feature.id && (
                    <Badge className="ml-2 animate-pulse bg-white/20 text-white">
                      Active
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Demo */}
          <div className="nike-card">
            {activeFeature === 'calendar' && <CalendarSync />}
            {activeFeature === 'polls' && <Polls />}
            {activeFeature === 'expenses' && <ExpenseSplit />}
            {activeFeature === 'location' && <LocationReminders />}
            {activeFeature === 'availability' && <AvailabilityStatus />}
          </div>
        </div>
      </main>

      {/* Create Event Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Event"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Event Title"
            placeholder="Enter event title"
          />
          <Input
            label="Description"
            placeholder="Describe your event"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
            />
            <Input
              label="Time"
              type="time"
            />
          </div>
          <Input
            label="Location"
            placeholder="Event location"
          />
          <Input
            label="Max Attendees"
            type="number"
            placeholder="Maximum number of attendees"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              Create Event
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 