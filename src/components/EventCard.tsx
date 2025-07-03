import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organizer: {
      name: string;
      avatar?: string;
    };
    attendees: number;
    maxAttendees?: number;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    category: string;
    image?: string;
  };
  onJoin?: (eventId: string) => void;
  onView?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onJoin, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'info';
      case 'ongoing': return 'success';
      case 'completed': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      {/* Event Image */}
      {event.image && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={getStatusColor(event.status) as any}>
              {event.status}
            </Badge>
          </div>
        </div>
      )}

      {/* Event Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        {/* Date and Time */}
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(event.date)} at {event.time}
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </div>

        {/* Organizer */}
        <div className="flex items-center">
          <Avatar
            src={event.organizer.avatar}
            name={event.organizer.name}
            size="sm"
            className="mr-2"
          />
          <span className="text-sm text-gray-600">
            Organized by {event.organizer.name}
          </span>
        </div>

        {/* Attendees */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {event.attendees}
            {event.maxAttendees && ` / ${event.maxAttendees}`} attending
          </div>
          <Badge variant="default" size="sm">
            {event.category}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(event.id)}
              className="flex-1"
            >
              View Details
            </Button>
          )}
          {onJoin && event.status === 'upcoming' && (
            <Button
              size="sm"
              onClick={() => onJoin(event.id)}
              className="flex-1"
            >
              Join Event
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export { EventCard }; 