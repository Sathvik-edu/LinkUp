'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  location?: string
  description?: string
  provider: 'google' | 'apple' | 'outlook'
}

export default function CalendarSync() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [connectedCalendars, setConnectedCalendars] = useState<Array<{
    provider: 'google' | 'apple' | 'outlook'
    name: string
    isActive: boolean
  }>>([])
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([])

  const connectCalendar = async (provider: 'google' | 'apple' | 'outlook') => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setConnectedCalendars(prev => [
        ...prev,
        {
          provider,
          name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Calendar`,
          isActive: true
        }
      ])
      setIsConnected(true)
      setIsLoading(false)
      
      // Add sample events
      const sampleEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Team Meeting',
          start: '2024-02-15T10:00:00Z',
          end: '2024-02-15T11:00:00Z',
          location: 'Conference Room A',
          provider: 'google'
        },
        {
          id: '2',
          title: 'Lunch with Sarah',
          start: '2024-02-15T12:00:00Z',
          end: '2024-02-15T13:00:00Z',
          location: 'Downtown Cafe',
          provider: 'apple'
        }
      ]
      setUpcomingEvents(sampleEvents)
    }, 2000)
  }

  const disconnectCalendar = (provider: 'google' | 'apple' | 'outlook') => {
    setConnectedCalendars(prev => prev.filter(cal => cal.provider !== provider))
    if (connectedCalendars.length === 1) {
      setIsConnected(false)
      setUpcomingEvents([])
    }
  }

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google': return '🔵'
      case 'apple': return '🍎'
      case 'outlook': return '📧'
      default: return '📅'
    }
  }

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'google': return 'bg-blue-100 text-blue-800'
      case 'apple': return 'bg-gray-100 text-gray-800'
      case 'outlook': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Calendar Sync</h2>
        <Badge variant={isConnected ? 'success' : 'default'}>
          {isConnected ? 'Connected' : 'Not Connected'}
        </Badge>
      </div>

      {/* Connection Status */}
      {!isConnected ? (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Connect Your Calendars
          </h3>
          <p className="text-gray-600 mb-6">
            Sync your events across Google Calendar, Apple Calendar, and Outlook to see your availability and avoid conflicts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { provider: 'google' as const, name: 'Google Calendar', desc: 'Sync with Gmail and Google Workspace' },
              { provider: 'apple' as const, name: 'Apple Calendar', desc: 'Sync with iPhone and Mac' },
              { provider: 'outlook' as const, name: 'Outlook Calendar', desc: 'Sync with Microsoft 365' }
            ].map(({ provider, name, desc }) => (
              <div key={provider} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{getProviderIcon(provider)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
                <Button
                  onClick={() => connectCalendar(provider)}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Connecting...' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Connected Calendars */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connected Calendars
            </h3>
            <div className="space-y-3">
              {connectedCalendars.map((calendar) => (
                <div key={calendar.provider} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getProviderIcon(calendar.provider)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{calendar.name}</p>
                      <p className="text-sm text-gray-500">Last synced: Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={calendar.isActive ? 'success' : 'default'}>
                      {calendar.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => disconnectCalendar(calendar.provider)}
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor(event.provider).split(' ')[0]}`}></div>
                      <div>
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(event.start).toLocaleDateString()} at {new Date(event.start).toLocaleTimeString()}
                          {event.location && ` • ${event.location}`}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default" className={getProviderColor(event.provider)}>
                      {event.provider}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Sync Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sync Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Auto-sync</p>
                  <p className="text-sm text-gray-500">Automatically sync calendar changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Show busy times</p>
                  <p className="text-sm text-gray-500">Display your busy periods to friends</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Conflict detection</p>
                  <p className="text-sm text-gray-500">Warn about scheduling conflicts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
} 