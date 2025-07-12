import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none touch-manipulation'
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 active:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200',
    destructive: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl active:bg-red-700'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm rounded-md min-h-[32px] sm:min-h-[36px]',
    md: 'px-4 py-2 text-sm sm:text-base rounded-lg min-h-[40px] sm:min-h-[44px]',
    lg: 'px-6 py-3 text-base sm:text-lg rounded-xl min-h-[48px] sm:min-h-[52px]',
    xl: 'px-8 py-4 text-lg sm:text-xl rounded-xl min-h-[56px] sm:min-h-[60px]'
  }
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 