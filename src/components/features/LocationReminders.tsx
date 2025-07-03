'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'

interface Friend {
  id: string
  name: string
  avatar?: string
  status: 'free' | 'busy' | 'maybe'
  location: {
    latitude: number
    longitude: number
    address: string
  }
  distance?: number
  lastSeen: string
}

interface Reminder {
  id: string
  title: string
  description: string
  location: {
    latitude: number
    longitude: number
    address: string
  }
  radius: number
  friends: string[]
  isActive: boolean
  createdAt: string
}

export default function LocationReminders() {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Sarah',
      status: 'free',
      location: { latitude: 37.7749, longitude: -122.4194, address: 'San Francisco, CA' },
      distance: 0.5,
      lastSeen: '2 minutes ago'
    },
    {
      id: '2',
      name: 'Mike',
      status: 'busy',
      location: { latitude: 37.7849, longitude: -122.4094, address: 'San Francisco, CA' },
      distance: 1.2,
      lastSeen: '5 minutes ago'
    },
    {
      id: '3',
      name: 'Emma',
      status: 'free',
      location: { latitude: 37.7649, longitude: -122.4294, address: 'San Francisco, CA' },
      distance: 0.8,
      lastSeen: '1 minute ago'
    }
  ])

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Coffee Meetup',
      description: 'Ping when friends are near the coffee shop',
      location: { latitude: 37.7749, longitude: -122.4194, address: 'Starbucks, Market St' },
      radius: 0.5,
      friends: ['Sarah', 'Mike', 'Emma'],
      isActive: true,
      createdAt: '2024-02-15T10:00:00Z'
    }
  ])

  const [isCreateReminderModalOpen, setIsCreateReminderModalOpen] = useState(false)
  const [isPingModalOpen, setIsPingModalOpen] = useState(false)
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    address: '',
    radius: 0.5,
    friends: [] as string[]
  })

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.log('Error getting location:', error)
        }
      )
    }
  }, [])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959 // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const pingFriendsNearby = () => {
    if (!userLocation) return

    const nearbyFriends = friends.filter(friend => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        friend.location.latitude,
        friend.location.longitude
      )
      return distance <= 2 // Within 2 miles
    })

    // Simulate ping notification
    alert(`Pinged ${nearbyFriends.length} friends nearby!`)
    setIsPingModalOpen(false)
  }

  const createReminder = () => {
    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title,
      description: newReminder.description,
      location: {
        latitude: 37.7749, // Mock coordinates
        longitude: -122.4194,
        address: newReminder.address
      },
      radius: newReminder.radius,
      friends: newReminder.friends,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setReminders(prev => [reminder, ...prev])
    setNewReminder({
      title: '',
      description: '',
      address: '',
      radius: 0.5,
      friends: []
    })
    setIsCreateReminderModalOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-red-100 text-red-800'
      case 'maybe': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'free': return '🟢'
      case 'busy': return '🔴'
      case 'maybe': return '🟡'
      default: return '⚪'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Location Reminders</h2>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setIsPingModalOpen(true)}>
            Ping Friends Nearby
          </Button>
          <Button onClick={() => setIsCreateReminderModalOpen(true)}>
            Create Reminder
          </Button>
        </div>
      </div>

      {/* Location Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📍</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Location</h3>
              <p className="text-sm text-gray-500">
                {userLocation ? 'Location enabled' : 'Location not available'}
              </p>
            </div>
          </div>
          <Badge variant={userLocation ? 'success' : 'default'}>
            {userLocation ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </Card>

      {/* Friends Nearby */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Friends Nearby</h3>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Avatar name={friend.name} size="md" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{friend.name}</span>
                    <span>{getStatusIcon(friend.status)}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {friend.location.address} • {friend.distance} miles away
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className={getStatusColor(friend.status)}>
                  {friend.status}
                </Badge>
                <Button size="sm" variant="outline">
                  Ping
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Reminders */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Reminders</h3>
        <div className="space-y-4">
          {reminders.filter(reminder => reminder.isActive).map((reminder) => (
            <div key={reminder.id} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🔔</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{reminder.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                    <p className="text-sm text-gray-500">
                      📍 {reminder.location.address} • {reminder.radius} mile radius
                    </p>
                    <p className="text-sm text-gray-500">
                      👥 {reminder.friends.length} friends • Created {new Date(reminder.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="success">Active</Badge>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Coffee Meetup',
              description: 'Ping when friends are near coffee shops',
              icon: '☕',
              action: () => {
                setNewReminder({
                  title: 'Coffee Meetup',
                  description: 'Ping when friends are near coffee shops',
                  address: 'Starbucks, Market St',
                  radius: 0.5,
                  friends: ['Sarah', 'Mike', 'Emma']
                })
                setIsCreateReminderModalOpen(true)
              }
            },
            {
              title: 'Lunch Alert',
              description: 'Notify when friends are available for lunch',
              icon: '🍽️',
              action: () => {
                setNewReminder({
                  title: 'Lunch Alert',
                  description: 'Notify when friends are available for lunch',
                  address: 'Downtown Area',
                  radius: 1.0,
                  friends: ['Sarah', 'Mike', 'Emma']
                })
                setIsCreateReminderModalOpen(true)
              }
            },
            {
              title: 'Weekend Plans',
              description: 'Coordinate weekend activities',
              icon: '🎉',
              action: () => {
                setNewReminder({
                  title: 'Weekend Plans',
                  description: 'Coordinate weekend activities',
                  address: 'City Center',
                  radius: 2.0,
                  friends: ['Sarah', 'Mike', 'Emma']
                })
                setIsCreateReminderModalOpen(true)
              }
            }
          ].map((action, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors cursor-pointer"
                 onClick={action.action}>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{action.icon}</span>
                <div>
                  <h4 className="font-semibold text-gray-900">{action.title}</h4>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Create Reminder
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Create Reminder Modal */}
      <Modal
        isOpen={isCreateReminderModalOpen}
        onClose={() => setIsCreateReminderModalOpen(false)}
        title="Create Location Reminder"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reminder Title
            </label>
            <Input
              value={newReminder.title}
              onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Coffee Meetup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Input
              value={newReminder.description}
              onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What should happen when friends are nearby?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Address
            </label>
            <Input
              value={newReminder.address}
              onChange={(e) => setNewReminder(prev => ({ ...prev, address: e.target.value }))}
              placeholder="e.g., Starbucks, Market St, San Francisco"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Radius (miles)
            </label>
            <Input
              type="number"
              step="0.1"
              value={newReminder.radius}
              onChange={(e) => setNewReminder(prev => ({ ...prev, radius: parseFloat(e.target.value) }))}
              placeholder="0.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Friends to Notify
            </label>
            <div className="space-y-2">
              {friends.map((friend) => (
                <label key={friend.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReminder.friends.includes(friend.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setNewReminder(prev => ({
                          ...prev,
                          friends: [...prev.friends, friend.name]
                        }))
                      } else {
                        setNewReminder(prev => ({
                          ...prev,
                          friends: prev.friends.filter(f => f !== friend.name)
                        }))
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{friend.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button onClick={createReminder} disabled={!newReminder.title.trim() || !newReminder.address.trim()}>
              Create Reminder
            </Button>
            <Button variant="outline" onClick={() => setIsCreateReminderModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Ping Friends Modal */}
      <Modal
        isOpen={isPingModalOpen}
        onClose={() => setIsPingModalOpen(false)}
        title="Ping Friends Nearby"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Send a quick ping to friends who are nearby to see if they're available to hang out.
          </p>
          
          <div className="space-y-3">
            {friends.filter(friend => friend.distance && friend.distance <= 2).map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar name={friend.name} size="sm" />
                  <div>
                    <p className="font-medium text-gray-900">{friend.name}</p>
                    <p className="text-sm text-gray-500">
                      {friend.distance} miles away • {friend.status}
                    </p>
                  </div>
                </div>
                <Button size="sm">
                  Ping
                </Button>
              </div>
            ))}
          </div>

          {friends.filter(friend => friend.distance && friend.distance <= 2).length === 0 && (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">😔</span>
              <p className="text-gray-600">No friends are currently nearby</p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button onClick={pingFriendsNearby} disabled={friends.filter(friend => friend.distance && friend.distance <= 2).length === 0}>
              Ping All Nearby
            </Button>
            <Button variant="outline" onClick={() => setIsPingModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
} 