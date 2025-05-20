
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TaskUrgency, EventCategory } from '@/utils/dateUtils';
import { EventType } from './CalendarEvent';

interface UrgencyBadgeProps {
  type: EventType;
  level: TaskUrgency;
  category?: EventCategory;
}

const UrgencyBadge = ({ type, level, category }: UrgencyBadgeProps) => {
  // For tasks, we show the urgency level
  if (type === 'task') {
    switch (level) {
      case 'onTime':
        return (
          <Badge variant="outline" className="border-green-500 bg-green-50 text-green-700 text-xs">
            Em tempo
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="outline" className="border-yellow-500 bg-yellow-50 text-yellow-700 text-xs">
            Atenção
          </Badge>
        );
      case 'urgent':
        return (
          <Badge variant="outline" className="border-orange-500 bg-orange-50 text-orange-700 text-xs">
            Urgente
          </Badge>
        );
      default:
        return null;
    }
  }
  
  // For events and news, we only show the status color without text
  if (type === 'event' || type === 'news') {
    let colorClasses = '';
    
    // Color based on the level (timing/validity)
    switch (level) {
      case 'onTime':
        colorClasses = "border-green-500 bg-green-50 text-green-50";
        break;
      case 'medium':
        colorClasses = "border-yellow-500 bg-yellow-50 text-yellow-50";
        break;
      case 'urgent':
        colorClasses = "border-orange-500 bg-orange-50 text-orange-50";
        break;
    }
    
    return (
      <Badge variant="outline" className={`${colorClasses} text-xs w-3 h-3 rounded-full p-0`} />
    );
  }
  
  return null;
};

export default UrgencyBadge;
