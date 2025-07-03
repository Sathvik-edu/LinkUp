'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

interface Poll {
  id: string
  question: string
  type: 'movie' | 'restaurant' | 'activity' | 'custom'
  options: Array<{
    id: string
    text: string
    votes: number
    voters: string[]
  }>
  createdBy: string
  isActive: boolean
  createdAt: string
  totalVotes: number
}

export default function Polls() {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'What movie should we watch tonight?',
      type: 'movie',
      options: [
        { id: '1', text: 'Inception', votes: 5, voters: ['Sarah', 'Mike', 'Emma', 'John', 'Lisa'] },
        { id: '2', text: 'The Matrix', votes: 3, voters: ['Mike', 'Emma', 'John'] },
        { id: '3', text: 'Interstellar', votes: 2, voters: ['Sarah', 'Lisa'] }
      ],
      createdBy: 'Sarah',
      isActive: true,
      createdAt: '2024-02-15T10:00:00Z',
      totalVotes: 10
    },
    {
      id: '2',
      question: 'Where should we have dinner?',
      type: 'restaurant',
      options: [
        { id: '1', text: 'Italian Restaurant', votes: 4, voters: ['Sarah', 'Mike', 'Emma', 'John'] },
        { id: '2', text: 'Sushi Bar', votes: 3, voters: ['Emma', 'John', 'Lisa'] },
        { id: '3', text: 'Pizza Place', votes: 2, voters: ['Sarah', 'Mike'] }
      ],
      createdBy: 'Mike',
      isActive: true,
      createdAt: '2024-02-15T09:00:00Z',
      totalVotes: 9
    }
  ])
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newPoll, setNewPoll] = useState({
    question: '',
    type: 'custom' as 'movie' | 'restaurant' | 'activity' | 'custom',
    options: ['', '']
  })
  const [errors, setErrors] = useState<{
    question?: string
    options?: string
  }>({})

  const validatePoll = () => {
    const newErrors: { question?: string; options?: string } = {}
    
    if (!newPoll.question.trim()) {
      newErrors.question = 'Poll question is required'
    }
    
    const validOptions = newPoll.options.filter(opt => opt.trim())
    if (validOptions.length < 2) {
      newErrors.options = 'At least 2 options are required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const voteOnPoll = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map(option => {
            if (option.id === optionId) {
              return {
                ...option,
                votes: option.votes + 1,
                voters: [...option.voters, 'You']
              }
            }
            return option
          }),
          totalVotes: poll.totalVotes + 1
        }
      }
      return poll
    }))
  }

  const createPoll = () => {
    if (!validatePoll()) {
      return
    }

    const poll: Poll = {
      id: Date.now().toString(),
      question: newPoll.question.trim(),
      type: newPoll.type,
      options: newPoll.options.filter(opt => opt.trim()).map((opt, index) => ({
        id: index.toString(),
        text: opt.trim(),
        votes: 0,
        voters: []
      })),
      createdBy: 'You',
      isActive: true,
      createdAt: new Date().toISOString(),
      totalVotes: 0
    }
    
    setPolls(prev => [poll, ...prev])
    setNewPoll({ question: '', type: 'custom', options: ['', ''] })
    setErrors({})
    setIsCreateModalOpen(false)
  }

  const resetForm = () => {
    setNewPoll({ question: '', type: 'custom', options: ['', ''] })
    setErrors({})
    setIsCreateModalOpen(false)
  }

  const getPollIcon = (type: string) => {
    switch (type) {
      case 'movie': return '🎬'
      case 'restaurant': return '🍽️'
      case 'activity': return '🎯'
      default: return '📊'
    }
  }

  const getPollColor = (type: string) => {
    switch (type) {
      case 'movie': return 'bg-purple-100 text-purple-800'
      case 'restaurant': return 'bg-orange-100 text-orange-800'
      case 'activity': return 'bg-green-100 text-green-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getWinningOption = (poll: Poll) => {
    return poll.options.reduce((max, option) => 
      option.votes > max.votes ? option : max
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Group Polls</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Poll
        </Button>
      </div>

      {/* Active Polls */}
      <div className="space-y-4">
        {polls.filter(poll => poll.isActive).map((poll) => {
          const winningOption = getWinningOption(poll)
          const maxVotes = Math.max(...poll.options.map(opt => opt.votes))
          
          return (
            <Card key={poll.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getPollIcon(poll.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{poll.question}</h3>
                    <p className="text-sm text-gray-500">
                      Created by {poll.createdBy} • {poll.totalVotes} votes
                    </p>
                  </div>
                </div>
                <Badge className={getPollColor(poll.type)}>
                  {poll.type}
                </Badge>
              </div>

              <div className="space-y-3">
                {poll.options.map((option) => {
                  const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0
                  const isWinning = option.votes === maxVotes && option.votes > 0
                  
                  return (
                    <div key={option.id} className="relative">
                      <button
                        onClick={() => voteOnPoll(poll.id, option.id)}
                        className="w-full p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900">
                              {option.text}
                            </span>
                            {isWinning && (
                              <span className="text-yellow-500">👑</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {option.votes} votes ({percentage.toFixed(0)}%)
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-200 rounded-b-lg transition-all duration-300"
                             style={{ width: `${percentage}%` }}>
                        </div>
                      </button>
                      
                      {/* Voters list */}
                      {option.voters.length > 0 && (
                        <div className="mt-2 ml-4">
                          <p className="text-xs text-gray-500">
                            Voted by: {option.voters.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {winningOption.votes > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    🎉 <strong>{winningOption.text}</strong> is winning with {winningOption.votes} votes!
                  </p>
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Quick Poll Templates */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Poll Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              type: 'movie' as const,
              title: 'Movie Night',
              description: 'Choose what to watch',
              icon: '🎬',
              template: {
                question: 'What movie should we watch?',
                options: ['Action Movie', 'Comedy', 'Drama', 'Horror', 'Romance']
              }
            },
            {
              type: 'restaurant' as const,
              title: 'Dinner Plans',
              description: 'Pick a restaurant',
              icon: '🍽️',
              template: {
                question: 'Where should we eat?',
                options: ['Italian', 'Chinese', 'Mexican', 'Indian', 'American']
              }
            },
            {
              type: 'activity' as const,
              title: 'Weekend Activity',
              description: 'Choose an activity',
              icon: '🎯',
              template: {
                question: 'What should we do this weekend?',
                options: ['Hiking', 'Bowling', 'Escape Room', 'Movie', 'Dinner']
              }
            }
          ].map((template) => (
            <div key={template.type} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors cursor-pointer"
                 onClick={() => {
                   setNewPoll({
                     question: template.template.question,
                     type: template.type,
                     options: template.template.options
                   })
                   setErrors({})
                   setIsCreateModalOpen(true)
                 }}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{template.title}</h4>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Create Poll Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={resetForm}
        title="Create New Poll"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poll Question
            </label>
            <Input
              value={newPoll.question}
              onChange={(e) => {
                setNewPoll(prev => ({ ...prev, question: e.target.value }))
                if (errors.question) {
                  setErrors(prev => ({ ...prev, question: undefined }))
                }
              }}
              placeholder="What should we do tonight?"
              error={errors.question}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poll Type
            </label>
            <select
              value={newPoll.type}
              onChange={(e) => setNewPoll(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="custom">Custom</option>
              <option value="movie">Movie</option>
              <option value="restaurant">Restaurant</option>
              <option value="activity">Activity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {newPoll.options.map((option, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newPoll.options]
                      newOptions[index] = e.target.value
                      setNewPoll(prev => ({ ...prev, options: newOptions }))
                      if (errors.options) {
                        setErrors(prev => ({ ...prev, options: undefined }))
                      }
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                  {newPoll.options.length > 2 && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newOptions = newPoll.options.filter((_, i) => i !== index)
                        setNewPoll(prev => ({ ...prev, options: newOptions }))
                      }}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setNewPoll(prev => ({ ...prev, options: [...prev.options, ''] }))}
              >
                Add Option
              </Button>
              {errors.options && (
                <p className="text-sm text-red-600">{errors.options}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={createPoll} 
              disabled={!newPoll.question.trim() || newPoll.options.filter(opt => opt.trim()).length < 2}
            >
              Create Poll
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 