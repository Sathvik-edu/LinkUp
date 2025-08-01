import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-soft border border-neutral-200 hover:shadow-medium transition-all duration-300',
    elevated: 'bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-medium border border-neutral-200 hover:shadow-strong transition-all duration-300',
    outlined: 'bg-white rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-neutral-200 hover:border-neutral-300 transition-all duration-300'
  }
  
  return (
    <div
      className={cn(
        'p-4 sm:p-6 md:p-8',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 pb-3 sm:pb-4 md:pb-6', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3
      className={cn('text-lg sm:text-xl md:text-2xl font-semibold text-neutral-900 leading-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p
      className={cn('text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn('flex flex-col sm:flex-row items-start sm:items-center pt-3 sm:pt-4 md:pt-6 gap-3 sm:gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
} 