'use client'

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { AnimatedSection, AnimatedText, FloatingElement } from '@/components/ui/AnimatedSection'

export default function SignUpPage() {
  return (
    <div className="overflow-hidden relative min-h-screen gradient-bg-secondary">
      {/* Background Elements */}
      <div className="overflow-hidden absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
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
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatedSection className="relative py-20 lg:py-32" direction="up" delay={0.2}>
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <FloatingElement className="inline-flex items-center px-6 py-3 mb-8 text-sm font-medium text-purple-700 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full animate-pulse">
              <span className="mr-3 w-3 h-3 bg-purple-500 rounded-full animate-ping"></span>  
              Join LinkUp
            </FloatingElement>
            
            <AnimatedText 
              className="text-5xl font-black leading-tight text-gray-900 md:text-7xl"
              delay={0.4}
              stagger={0.1}
            >
              {`Create Your Social Command Center`}
            </AnimatedText>
            
            <AnimatedSection className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl" direction="up" delay={0.8}>
              Start coordinating with friends and never miss a social opportunity again.
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      {/* Sign Up Form */}
      <AnimatedSection className="relative z-10 px-4 pb-20 mx-auto max-w-md sm:px-6 lg:px-8" direction="up" delay={0.6}>
        <div className="w-full">
          <SignUp 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-2xl border-0 bg-white/80 backdrop-blur-md",
                headerTitle: "text-2xl font-bold text-gray-900",
                headerSubtitle: "text-gray-600",
                formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105",
                formFieldInput: "border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                formFieldLabel: "text-gray-700 font-medium",
                footerActionLink: "text-purple-600 hover:text-purple-700 font-medium",
                dividerLine: "bg-gray-300",
                dividerText: "text-gray-500",
                socialButtonsBlockButton: "border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors",
                socialButtonsBlockButtonText: "text-gray-700 font-medium"
              }
            }}
            redirectUrl="/dashboard"
          />
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center text-gray-500">
          <p>Join thousands of users who are already coordinating better with LinkUp.</p>
        </div>
      </footer>
    </div>
  )
} 