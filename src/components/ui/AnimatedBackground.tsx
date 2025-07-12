'use client'

import { motion } from 'framer-motion'
import { useMouseParallax } from '@/lib/useScrollAnimation'

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedBackground = ({ children, className = '' }: AnimatedBackgroundProps) => {
  const mousePosition = useMouseParallax(0.1)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          x: mousePosition.x * -0.1,
          y: mousePosition.y * -0.1
        }}
      />
      
      <motion.div
        className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full opacity-20 mix-blend-multiply filter blur-xl"
        animate={{
          x: [0, 15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        style={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export const GradientOrb = ({ 
  className = '', 
  color = 'blue',
  size = 'w-80 h-80',
  delay = 0 
}: {
  className?: string
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'orange'
  size?: string
  delay?: number
}) => {
  const colorClasses = {
    blue: 'bg-blue-400',
    purple: 'bg-purple-400',
    pink: 'bg-pink-400',
    green: 'bg-green-400',
    orange: 'bg-orange-400'
  }

  return (
    <motion.div
      className={`absolute ${size} ${colorClasses[color]} rounded-full opacity-20 mix-blend-multiply filter blur-xl ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  )
}

export const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </>
  )
} 