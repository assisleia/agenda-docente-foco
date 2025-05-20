
import React from 'react';
import { CalendarEventProps } from './CalendarEvent';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CalendarEvent from './CalendarEvent';

interface MonthViewProps {
  date: Date;
  events: CalendarEventProps[];
}

const MonthView = ({ date, events }: MonthViewProps) => {
  // Get all days in the month
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  // Get all days to display
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Group days into weeks
  const weeks = [];
  let week = [];
  
  days.forEach((day, i) => {
    week.push(day);
    
    if ((i + 1) % 7 === 0 || i === days.length - 1) {
      weeks.push(week);
      week = [];
    }
  });
  
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = event.endDate ? new Date(event.endDate) : eventStartDate;
      
      // Check if the day falls within the event date range
      return (
        (eventStartDate <= day && eventEndDate >= day) ||
        isSameDay(eventStartDate, day)
      );
    })
    // Sort by type: tasks first, then events, then news
    .sort((a, b) => {
      const typeOrder = { task: 0, event: 1, news: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    })
    .slice(0, 3); // Limit to 3 events per day
  };
  
  return (
    <Card className="border rounded-md shadow-sm">
      <CardHeader className="bg-purple-50 border-b py-3">
        <CardTitle className="text-lg text-purple-800 text-center">
          {format(date, "MMMM 'de' yyyy", { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b bg-purple-50">
          {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((dayName, i) => (
            <div key={i} className="p-2 text-center text-sm font-medium text-purple-700">
              {dayName}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b last:border-0">
              {week.map((day, dayIndex) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentMonth = isSameMonth(day, date);
                const hasMoreEvents = dayEvents.length > 3;
                
                return (
                  <div 
                    key={dayIndex} 
                    className={`min-h-[110px] p-1 border-r last:border-0 ${
                      isCurrentMonth ? 'bg-white' : 'bg-purple-50/30'
                    }`}
                  >
                    <div className={`text-right p-1 text-sm ${
                      isCurrentMonth ? 'text-purple-900' : 'text-purple-400'
                    }`}>
                      {format(day, 'd')}
                    </div>
                    
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.map((event, i) => (
                        <div key={i} className="text-xs">
                          <CalendarEvent {...event} />
                        </div>
                      ))}
                      
                      {hasMoreEvents && (
                        <div className="text-xs text-purple-500 px-2">
                          + {dayEvents.length - 3} mais
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthView;
