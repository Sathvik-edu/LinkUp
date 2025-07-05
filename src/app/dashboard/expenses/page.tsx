'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import ExpenseSplit from '@/components/features/ExpenseSplit'

export default function ExpensesDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen gradient-bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
                <Link href="/dashboard/expenses" className="text-green-600 font-medium transition-colors relative group">
                  Expenses
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 transition-all duration-300"></span>
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
              <Avatar name="John Doe" size="md" />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-green-600 font-medium">Expense Split</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium mb-8 animate-pulse">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-ping"></span>
              Expense Split Dashboard
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Expense
              <span className="block gradient-text animate-pulse">
                Split Center
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Track, split, and manage expenses with automatic calculations. Keep everyone accountable and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">

        {/* Expense Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-3xl font-black text-gray-900">$1,247</p>
              </div>
            </div>
          </div>

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Groups</p>
                <p className="text-3xl font-black text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Settled</p>
                <p className="text-3xl font-black text-gray-900">$892</p>
              </div>
            </div>
          </div>

          <div className="nike-card group hover:scale-105 transition-all duration-500">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-black text-gray-900">$355</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Expense
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Add expenses, split bills, and track payments with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="nike-card group hover:scale-105 transition-all duration-500 text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">➕</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Add Expense</p>
              <p className="text-sm text-gray-600">Record new expense</p>
            </button>
            <div className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📊</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Reports</p>
              <p className="text-sm text-gray-600">View expense reports</p>
            </div>
            <div className="nike-card group hover:scale-105 transition-all duration-500 text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💳</div>
              <p className="text-lg font-bold text-gray-900 mb-2">Payments</p>
              <p className="text-sm text-gray-600">Track payments</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Input
              placeholder="Search expenses, groups, or amounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expense Split Component */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Expense
              <span className="block gradient-text">Split</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Split expenses automatically and keep track of who owes what with detailed breakdowns.
            </p>
          </div>
          <div className="nike-card">
            <ExpenseSplit />
          </div>
        </div>
      </main>

      {/* Add Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Expense"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Expense Title"
            placeholder="What was this expense for?"
          />
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            step="0.01"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option>Food & Dining</option>
              <option>Transportation</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Utilities</option>
              <option>Other</option>
            </select>
          </div>
          <Input
            label="Paid By"
            placeholder="Who paid for this?"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Split Between</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                John Doe
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                Jane Smith
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Mike Johnson
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Sarah Wilson
              </label>
            </div>
          </div>
          <Input
            label="Date"
            type="date"
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button>
              Add Expense
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 