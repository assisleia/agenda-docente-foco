
import React from 'react';
import { CalendarEventProps } from './CalendarEvent';
import { format, addDays, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import CalendarEvent from './CalendarEvent';

interface WeekViewProps {
  date: Date;
  events: CalendarEventProps[];
}

const WeekView = ({ date, events }: WeekViewProps) => {
  // Get the start of the week (considering Sunday as the first day)
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  
  // Generate an array of days for the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Time slots for the day (8AM to 8PM)
  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 8);
  
  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      const eventHour = event.startTime ? parseInt(event.startTime.split(':')[0]) : null;
      
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear() &&
        eventHour === hour
      );
    })
    .sort((a, b) => {
      const typeOrder = { task: 0, event: 1, news: 2 };
      return typeOrder[a.type] - typeOrder[b.type];
    });
  };

  return (
    <Card className="border rounded-md shadow-sm">
      <CardContent className="p-0">
        <div className="grid grid-cols-8 border-b">
          {/* Empty cell for the time column */}
          <div className="p-2 border-r bg-purple-50"></div>
          
          {/* Day headers */}
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className="p-2 text-center border-r last:border-0 bg-purple-50"
            >
              <div className="font-medium text-purple-800">
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div className="text-sm text-purple-600">
                {format(day, 'dd/MM')}
              </div>
            </div>
          ))}
        </div>
        
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="min-w-full">
            {timeSlots.map(hour => (
              <div key={hour} className="grid grid-cols-8 min-h-[80px] border-b last:border-0">
                {/* Time slot */}
                <div className="p-2 text-xs text-purple-500 border-r flex justify-center pt-2 bg-purple-50">
                  {`${hour}:00`}
                </div>
                
                {/* Event cells for each day */}
                {weekDays.map((day, index) => (
                  <div key={index} className="p-2 border-r last:border-0">
                    {getEventsForDayAndHour(day, hour).map(event => (
                      <CalendarEvent 
                        key={event.id}
                        {...event}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default WeekView;
