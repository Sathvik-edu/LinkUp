'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const features = [
  {
    id: 'calendar',
    title: 'Live Calendar Sync',
    description: 'Real-time calendar synchronization across all group members. Never miss an event with automatic updates and conflict resolution.',
    icon: '📅',
    color: 'from-blue-500 to-cyan-500',
    benefits: ['Real-time updates', 'Conflict resolution', 'Cross-platform sync']
  },
  {
    id: 'polls',
    title: 'Smart Polls',
    description: 'Create polls for group decisions with instant results and analytics. Make democratic decisions quickly and efficiently.',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
    benefits: ['Instant results', 'Analytics dashboard', 'Multiple question types']
  },
  {
    id: 'expenses',
    title: 'Expense Split',
    description: 'Track and split expenses with automatic calculations. Keep everyone accountable and transparent with detailed expense reports.',
    icon: '💰',
    color: 'from-green-500 to-emerald-500',
    benefits: ['Auto calculations', 'Expense tracking', 'Payment reminders']
  },
  {
    id: 'location',
    title: 'Location Reminders',
    description: 'Get notified when near event locations. Never be late again with smart location-based notifications.',
    icon: '📍',
    color: 'from-orange-500 to-red-500',
    benefits: ['GPS tracking', 'Smart notifications', 'Route optimization']
  },
  {
    id: 'availability',
    title: 'Who\'s In?',
    description: 'Quick availability status for group members. See who\'s available at a glance and coordinate better.',
    icon: '👥',
    color: 'from-indigo-500 to-purple-500',
    benefits: ['Real-time status', 'Quick responses', 'Group coordination']
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen gradient-bg-secondary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-20 animate-float animation-delay-4000"></div>
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
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors relative group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
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

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-8 animate-pulse">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-ping"></span>
            Explore all LinkUp features
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Powerful Features,
            <span className="block gradient-text animate-pulse">
              Seamless Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make LinkUp the ultimate social planning platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature) => (
            <div key={feature.id} className="nike-card group hover:scale-105 transition-all duration-500">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              
              <div className="space-y-2 mb-6">
                {feature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {benefit}
                  </div>
                ))}
              </div>
              
              <Badge className={`bg-gradient-to-r ${feature.color} text-white`}>
                Available
              </Badge>
            </div>
          ))}
        </div>

        {/* Interactive Demo Preview */}
        <div className="mb-20">
          <div className="nike-card p-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-6">🔒</div>
              <h2 className="text-4xl font-bold gradient-text mb-6">
                Try Interactive Features
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Sign in to access live demos and interactive features. Experience how LinkUp transforms your social planning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/login" className="nike-button">
                  <span>Sign In to Continue</span>
                </Link>
                <Link href="/dashboard" className="group flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105">
                  <span>View Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="nike-card p-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already planning better together with LinkUp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="nike-button">
                <span>Sign Up Now</span>
              </Link>
              <Link href="/" className="group flex items-center justify-center space-x-3 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105">
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 