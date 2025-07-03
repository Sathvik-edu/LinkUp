'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'

interface User {
  id: string
  name: string
  avatar?: string
  status: 'free' | 'busy' | 'maybe'
  message?: string
  until?: string
  lastUpdated: string
  isOnline: boolean
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  participants: Array<{
    userId: string
    name: string
    status: 'going' | 'maybe' | 'not_going'
  }>
}

export default function AvailabilityStatus() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Sarah',
      status: 'free',
      message: 'Available for coffee or lunch!',
      lastUpdated: '2 minutes ago',
      isOnline: true
    },
    {
      id: '2',
      name: 'Mike',
      status: 'busy',
      message: 'In a meeting until 3 PM',
      until: '3:00 PM',
      lastUpdated: '5 minutes ago',
      isOnline: true
    },
    {
      id: '3',
      name: 'Emma',
      status: 'maybe',
      message: 'Depends on the time',
      lastUpdated: '10 minutes ago',
      isOnline: false
    },
    {
      id: '4',
      name: 'John',
      status: 'free',
      message: 'Free all day',
      lastUpdated: '1 minute ago',
      isOnline: true
    },
    {
      id: '5',
      name: 'Lisa',
      status: 'busy',
      message: 'Working from home',
      lastUpdated: '15 minutes ago',
      isOnline: true
    }
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Weekend Hiking Trip',
      date: '2024-02-17',
      time: '9:00 AM',
      participants: [
        { userId: '1', name: 'Sarah', status: 'going' },
        { userId: '2', name: 'Mike', status: 'maybe' },
        { userId: '3', name: 'Emma', status: 'going' },
        { userId: '4', name: 'John', status: 'not_going' },
        { userId: '5', name: 'Lisa', status: 'maybe' }
      ]
    },
    {
      id: '2',
      title: 'Movie Night',
      date: '2024-02-16',
      time: '7:00 PM',
      participants: [
        { userId: '1', name: 'Sarah', status: 'going' },
        { userId: '2', name: 'Mike', status: 'going' },
        { userId: '3', name: 'Emma', status: 'going' },
        { userId: '4', name: 'John', status: 'going' },
        { userId: '5', name: 'Lisa', status: 'maybe' }
      ]
    }
  ])

  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false)
  const [currentUserStatus, setCurrentUserStatus] = useState({
    status: 'free' as 'free' | 'busy' | 'maybe',
    message: '',
    until: ''
  })

  const updateUserStatus = (userId: string, status: 'free' | 'busy' | 'maybe', message?: string, until?: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status, 
            message, 
            until,
            lastUpdated: 'Just now'
          }
        : user
    ))
  }

  const updateEventStatus = (eventId: string, userId: string, status: 'going' | 'maybe' | 'not_going') => {
    setEvents(prev => prev.map(event => 
      event.id === eventId
        ? {
            ...event,
            participants: event.participants.map(participant =>
              participant.userId === userId
                ? { ...participant, status }
                : participant
            )
          }
        : event
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-red-100 text-red-800'
      case 'maybe': return 'bg-yellow-100 text-yellow-800'
      case 'going': return 'bg-green-100 text-green-800'
      case 'not_going': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'free': return '🟢'
      case 'busy': return '🔴'
      case 'maybe': return '🟡'
      case 'going': return '✅'
      case 'not_going': return '❌'
      default: return '⚪'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'free': return 'Free'
      case 'busy': return 'Busy'
      case 'maybe': return 'Maybe'
      case 'going': return 'Going'
      case 'not_going': return 'Not Going'
      default: return 'Unknown'
    }
  }

  const saveCurrentUserStatus = () => {
    updateUserStatus('current', currentUserStatus.status, currentUserStatus.message, currentUserStatus.until)
    setIsUpdateStatusModalOpen(false)
  }

  const onlineUsers = users.filter(user => user.isOnline)
  const freeUsers = users.filter(user => user.status === 'free')
  const busyUsers = users.filter(user => user.status === 'busy')
  const maybeUsers = users.filter(user => user.status === 'maybe')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Who's In?</h2>
        <Button onClick={() => setIsUpdateStatusModalOpen(true)}>
          Update My Status
        </Button>
      </div>

      {/* Current User Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar name="You" size="lg" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Status</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="default" className={getStatusColor('free')}>
                  {getStatusIcon('free')} Free
                </Badge>
                <span className="text-sm text-gray-500">Available for coffee or lunch!</span>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsUpdateStatusModalOpen(true)}>
            Update
          </Button>
        </div>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🟢</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Available</p>
              <p className="text-2xl font-bold text-gray-900">{freeUsers.length}</p>
            </div>
          </div>
          <div className="space-y-2">
            {freeUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <Avatar name={user.name} size="sm" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            ))}
            {freeUsers.length > 3 && (
              <p className="text-sm text-gray-500">+{freeUsers.length - 3} more</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔴</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Busy</p>
              <p className="text-2xl font-bold text-gray-900">{busyUsers.length}</p>
            </div>
          </div>
          <div className="space-y-2">
            {busyUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <Avatar name={user.name} size="sm" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            ))}
            {busyUsers.length > 3 && (
              <p className="text-sm text-gray-500">+{busyUsers.length - 3} more</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🟡</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Maybe</p>
              <p className="text-2xl font-bold text-gray-900">{maybeUsers.length}</p>
            </div>
          </div>
          <div className="space-y-2">
            {maybeUsers.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <Avatar name={user.name} size="sm" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
            ))}
            {maybeUsers.length > 3 && (
              <p className="text-sm text-gray-500">+{maybeUsers.length - 3} more</p>
            )}
          </div>
        </Card>
      </div>

      {/* Friends Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Friends Status</h3>
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar name={user.name} size="md" />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{user.name}</span>
                    <Badge variant="default" className={getStatusColor(user.status)}>
                      {getStatusIcon(user.status)} {getStatusText(user.status)}
                    </Badge>
                  </div>
                  {user.message && (
                    <p className="text-sm text-gray-600">{user.message}</p>
                  )}
                  {user.until && (
                    <p className="text-sm text-gray-500">Until {user.until}</p>
                  )}
                  <p className="text-xs text-gray-400">Updated {user.lastUpdated}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  Invite
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Event RSVPs */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Going</Button>
                  <Button size="sm" variant="outline">Maybe</Button>
                  <Button size="sm" variant="outline">Not Going</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {event.participants.map((participant) => (
                  <div key={participant.userId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar name={participant.name} size="sm" />
                      <span className="text-sm text-gray-700">{participant.name}</span>
                    </div>
                    <Badge variant="default" className={getStatusColor(participant.status)}>
                      {getStatusIcon(participant.status)} {getStatusText(participant.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Status Updates */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Status Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { status: 'free' as const, icon: '🟢', text: 'Free', desc: 'Available to hang out' },
            { status: 'busy' as const, icon: '🔴', text: 'Busy', desc: 'In a meeting or working' },
            { status: 'maybe' as const, icon: '🟡', text: 'Maybe', desc: 'Depends on the time' }
          ].map(({ status, icon, text, desc }) => (
            <button
              key={status}
              onClick={() => {
                setCurrentUserStatus(prev => ({ ...prev, status }))
                setIsUpdateStatusModalOpen(true)
              }}
              className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{text}</h4>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Update Status Modal */}
      <Modal
        isOpen={isUpdateStatusModalOpen}
        onClose={() => setIsUpdateStatusModalOpen(false)}
        title="Update Your Status"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { status: 'free' as const, icon: '🟢', text: 'Free' },
                { status: 'busy' as const, icon: '🔴', text: 'Busy' },
                { status: 'maybe' as const, icon: '🟡', text: 'Maybe' }
              ].map(({ status, icon, text }) => (
                <button
                  key={status}
                  onClick={() => setCurrentUserStatus(prev => ({ ...prev, status }))}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    currentUserStatus.status === status
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-2xl block mb-1">{icon}</span>
                    <span className="text-sm font-medium text-gray-900">{text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <Input
              value={currentUserStatus.message}
              onChange={(e) => setCurrentUserStatus(prev => ({ ...prev, message: e.target.value }))}
              placeholder="e.g., Available for coffee or lunch!"
            />
          </div>

          {currentUserStatus.status === 'busy' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Until (Optional)
              </label>
              <Input
                value={currentUserStatus.until}
                onChange={(e) => setCurrentUserStatus(prev => ({ ...prev, until: e.target.value }))}
                placeholder="e.g., 3:00 PM"
              />
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button onClick={saveCurrentUserStatus}>
              Update Status
            </Button>
            <Button variant="outline" onClick={() => setIsUpdateStatusModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 