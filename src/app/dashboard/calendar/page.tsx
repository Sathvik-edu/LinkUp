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

export default function CalendarDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="overflow-hidden relative min-h-screen gradient-bg-secondary">
      {/* Background Elements */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
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
                <Link href="/dashboard/calendar" className="relative text-blue-600 font-medium transition-colors group">
                  Calendar
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300"></span>
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
              <Avatar name="John Doe" size="md" />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">Calendar Sync</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <div className="inline-flex items-center px-6 py-3 mb-8 text-sm font-medium text-blue-700 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full animate-pulse">
              <span className="mr-3 w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
              Calendar Sync Dashboard
            </div>
            
            <h1 className="text-5xl font-black leading-tight text-gray-900 md:text-7xl">
              Calendar
              <span className="block animate-pulse gradient-text">
                Command Center
              </span>
            </h1>
            
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl">
              Sync, manage, and coordinate all your events across platforms. Never miss a beat with real-time calendar synchronization.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Calendar Stats */}
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
                <p className="text-3xl font-black text-gray-900">24</p>
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
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-black text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="transition-all duration-500 nike-card group hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Synced Calendars</p>
                <p className="text-3xl font-black text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="transition-all duration-500 nike-card group hover:scale-105">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conflicts</p>
                <p className="text-3xl font-black text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Calendar
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Manage your calendar sync and create new events with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-center transition-all duration-500 nike-card group hover:scale-105"
            >
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">➕</div>
              <p className="mb-2 text-lg font-bold text-gray-900">Create Event</p>
              <p className="text-sm text-gray-600">Add new event to calendar</p>
            </button>
            <div className="text-center transition-all duration-500 nike-card group hover:scale-105">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">🔄</div>
              <p className="mb-2 text-lg font-bold text-gray-900">Sync Now</p>
              <p className="text-sm text-gray-600">Force calendar sync</p>
            </div>
            <div className="text-center transition-all duration-500 nike-card group hover:scale-105">
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">⚙️</div>
              <p className="mb-2 text-lg font-bold text-gray-900">Settings</p>
              <p className="text-sm text-gray-600">Configure sync options</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative mx-auto max-w-2xl">
            <Input
              placeholder="Search events, dates, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-4 pr-4 pl-12 w-full text-lg rounded-2xl border-2 border-gray-200 transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Calendar Sync Component */}
        <div>
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Calendar
              <span className="block gradient-text">Sync</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Connect your calendars and manage events across all platforms seamlessly.
            </p>
          </div>
          <div className="nike-card">
            <CalendarSync />
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
          <div className="flex gap-3 justify-end pt-4">
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