'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import AvailabilityStatus from '@/components/features/AvailabilityStatus'

export default function AvailabilityDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen gradient-bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
                <Link href="/dashboard/polls" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Polls
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/expenses" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Expenses
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/location" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                  Location
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/dashboard/availability" className="text-indigo-600 font-medium transition-colors relative group">
                  Availability
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transition-all duration-300"></span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-indigo-600 font-medium">Who's In?</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium mb-8 animate-pulse">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3 animate-ping"></span>
              Who's In? Dashboard
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Who's
              <span className="block gradient-text animate-pulse">
                In? Center
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Quick availability status for group members. See who's available at a glance and coordinate better.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">

        {/* Availability Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-black text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-black text-gray-900">18</p>
              </div>
            </div>
          </div>

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Busy</p>
                <p className="text-3xl font-black text-gray-900">4</p>
              </div>
            </div>
          </div>

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Maybe</p>
                <p className="text-3xl font-black text-gray-900">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Availability
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Update your status and check group availability quickly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="nike-card group hover:scale-105 transition-all duration-500 text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👤</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Update Status</p>
              <p className="text-sm text-gray-600">Change availability</p>
            </button>
            <div className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">👥</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Group View</p>
              <p className="text-sm text-gray-600">See all members</p>
            </div>
            <div className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Analytics</p>
              <p className="text-sm text-gray-600">View patterns</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Input
              placeholder="Search members, groups, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Availability Status Component */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Who's
              <span className="block gradient-text">In?</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Check real-time availability status of your group members and coordinate activities efficiently.
            </p>
          </div>
          <div className="nike-card">
            <AvailabilityStatus />
          </div>
        </div>
      </main>

      {/* Update Status Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Availability Status"
        size="lg"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Available</option>
              <option>Busy</option>
              <option>Maybe</option>
              <option>Away</option>
              <option>Do Not Disturb</option>
            </select>
          </div>
          <Input
            label="Custom Message"
            placeholder="Add a custom status message (optional)"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Until I change it</option>
              <option>1 hour</option>
              <option>2 hours</option>
              <option>4 hours</option>
              <option>8 hours</option>
              <option>24 hours</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Visibility</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="visibility" className="mr-2" defaultChecked />
                All Groups
              </label>
              <label className="flex items-center">
                <input type="radio" name="visibility" className="mr-2" />
                Specific Groups
              </label>
              <label className="flex items-center">
                <input type="radio" name="visibility" className="mr-2" />
                Private
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              Update Status
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 