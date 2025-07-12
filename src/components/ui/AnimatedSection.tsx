'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useScrollAnimation, useParallaxScroll } from '@/lib/useScrollAnimation'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  distance?: number
  triggerOnce?: boolean
  threshold?: number
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
}

export const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 50,
  triggerOnce = true,
  threshold = 0.1
}: AnimatedSectionProps) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce
  })

  const customVariants = {
    ...variants[direction],
    hidden: {
      ...variants[direction].hidden,
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: distance }),
      ...(direction === 'right' && { x: -distance })
    }
  }

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={customVariants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  hover = true
}: {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}) => {
  const { elementRef, isVisible } = useScrollAnimation()

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

export const AnimatedText = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.1
}: {
  children: string
  className?: string
  delay?: number
  stagger?: number
}) => {
  const { elementRef, isVisible } = useScrollAnimation()

  const words = children.split(' ')

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{
            duration: 0.5,
            delay: delay + index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export const ParallaxSection = ({
  children,
  className = '',
  speed = 0.5
}: {
  children: ReactNode
  className?: string
  speed?: number
}) => {
  const { elementRef, offset } = useParallaxScroll(speed)

  return (
    <motion.div
      ref={elementRef}
      className={className}
      style={{ y: offset }}
    >
      {children}
    </motion.div>
  )
}

export const FloatingElement = ({
  children,
  className = '',
  duration = 3,
  delay = 0
}: {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
} 