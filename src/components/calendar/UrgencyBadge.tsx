
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TaskUrgency, EventCategory } from '@/utils/dateUtils';
import { EventType } from './CalendarEvent';
import { CircleDot } from 'lucide-react';

interface UrgencyBadgeProps {
  type: EventType;
  level: TaskUrgency;
  category?: EventCategory;
}

const UrgencyBadge = ({ type, level }: UrgencyBadgeProps) => {
  // Map urgency levels to colors
  const levelColors = {
    onTime: "text-green-500",
    medium: "text-yellow-500",
    urgent: "text-orange-500"
  };
  
  // For all types, we now use a simple colored dot
  return <CircleDot className={`h-3 w-3 ${levelColors[level]} mr-1`} />;
};

export default UrgencyBadge;
