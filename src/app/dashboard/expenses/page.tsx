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

// Lazy load the heavy ExpenseSplit component
const ExpenseSplit = lazy(() => import('@/components/features/ExpenseSplit'))

export default function ExpensesDashboardPage() {
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

  // Sample recent transactions data for immediate loading
  const recentTransactions = [
    {
      id: '1',
      title: 'Dinner at Italian Restaurant',
      amount: 120.00,
      paidBy: 'Sarah',
      participants: 6,
      category: 'Food & Dining',
      isSettled: false,
      date: '2024-02-15'
    },
    {
      id: '2',
      title: 'Movie Tickets',
      amount: 45.00,
      paidBy: 'Mike',
      participants: 6,
      category: 'Entertainment',
      isSettled: false,
      date: '2024-02-15'
    },
    {
      id: '3',
      title: 'Uber Ride',
      amount: 25.00,
      paidBy: 'Emma',
      participants: 3,
      category: 'Transportation',
      isSettled: true,
      date: '2024-02-14'
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Food & Dining': return '🍽️'
      case 'Entertainment': return '🎬'
      case 'Transportation': return '🚗'
      case 'Shopping': return '🛍️'
      case 'Travel': return '✈️'
      default: return '💰'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Food & Dining': return 'bg-orange-100 text-orange-800'
      case 'Entertainment': return 'bg-purple-100 text-purple-800'
      case 'Transportation': return 'bg-blue-100 text-blue-800'
      case 'Shopping': return 'bg-pink-100 text-pink-800'
      case 'Travel': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-hidden relative min-h-screen gradient-bg-secondary">
      {/* Background Elements */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-green-300 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
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
                <Link href="/dashboard/expenses" className="relative text-green-600 font-medium transition-colors group">
                  Expenses
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 transition-all duration-300"></span>
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
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-green-600 font-medium">Expense Split</span>
        </nav>
      </div>

      {/* Hero Section */}
      <AnimatedSection className="relative py-20 lg:py-32" direction="up" delay={0.2}>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <FloatingElement className="inline-flex items-center px-6 py-3 mb-8 text-sm font-medium text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full animate-pulse">
              <span className="mr-3 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
              Expense Split Dashboard
            </FloatingElement>
            
            <AnimatedText 
              className="text-5xl font-black leading-tight text-gray-900 md:text-7xl"
              delay={0.4}
              stagger={0.1}
            >
              {`${firstName}'s Expense Command Center`}
            </AnimatedText>
            
            <AnimatedSection className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl" direction="up" delay={0.8}>
              Track, split, and manage expenses with automatic calculations. Keep everyone accountable and transparent.
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-20 mx-auto max-w-7xl sm:px-6 lg:px-8">

        {/* Expense Stats */}
        <AnimatedSection className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-4" direction="up" delay={0.2}>
          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.1}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-3xl font-black text-gray-900">$1,247</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.2}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Groups</p>
                <p className="text-3xl font-black text-gray-900">5</p>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="transition-all duration-500 nike-card group hover:scale-105" delay={0.3}>
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Settled</p>
                <p className="text-3xl font-black text-gray-900">$892</p>
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
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-black text-gray-900">$355</p>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedSection>

        {/* Quick Actions */}
        <AnimatedSection className="mb-12" direction="up" delay={0.3}>
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Expense
              <span className="block gradient-text">Actions</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Add expenses, split bills, and track payments with ease.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <AnimatedCard className="text-center transition-all duration-500 nike-card group hover:scale-105" delay={0.1}>
              <button onClick={() => setIsModalOpen(true)} className="w-full">
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">➕</div>
                <p className="mb-2 text-lg font-bold text-gray-900">Add Expense</p>
                <p className="text-sm text-gray-600">Record new expense</p>
              </button>
            </AnimatedCard>
            <AnimatedCard className="text-center transition-all duration-500 nike-card group hover:scale-105" delay={0.2}>
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">📊</div>
              <p className="mb-2 text-lg font-bold text-gray-900">Reports</p>
              <p className="text-sm text-gray-600">View expense reports</p>
            </AnimatedCard>
            <AnimatedCard className="text-center transition-all duration-500 nike-card group hover:scale-105" delay={0.3}>
              <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">💳</div>
              <p className="mb-2 text-lg font-bold text-gray-900">Settle Up</p>
              <p className="text-sm text-gray-600">Process payments</p>
            </AnimatedCard>
          </div>
        </AnimatedSection>

        {/* Expense Split Component - Lazy Loaded */}
        <Suspense fallback={
          <AnimatedSection className="text-center py-12" direction="up" delay={0.8}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading expense management...</p>
          </AnimatedSection>
        }>
          <ExpenseSplit />
        </Suspense>

        {/* Recent Transactions - Loads Immediately After Expense Split */}
        <AnimatedSection className="mt-12" direction="up" delay={1.0}>
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-3xl font-black text-gray-900">
              Recent
              <span className="block gradient-text">Transactions</span>
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Your latest expense activities and payment status.
            </p>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <AnimatedCard key={transaction.id} className="transition-all duration-500 nike-card group hover:scale-105" delay={0.1 * index}>
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <span className="text-xl">{getCategoryIcon(transaction.category)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{transaction.title}</h4>
                      <p className="text-sm text-gray-500">
                        Paid by {transaction.paidBy} • {transaction.participants} people • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${transaction.amount.toFixed(2)}</p>
                      <Badge className={getCategoryColor(transaction.category)}>
                        {transaction.category}
                      </Badge>
                    </div>
                    {!transaction.isSettled ? (
                      <Badge variant="warning">Pending</Badge>
                    ) : (
                      <Badge variant="success">Settled</Badge>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedSection>
      </main>

      {/* Add Expense Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New Expense</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expense Title</label>
              <Input 
                type="text" 
                placeholder="e.g., Dinner at Italian Restaurant"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <Input 
                type="number" 
                placeholder="0.00"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Food & Dining</option>
                <option>Entertainment</option>
                <option>Transportation</option>
                <option>Shopping</option>
                <option>Travel</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Add Expense
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 