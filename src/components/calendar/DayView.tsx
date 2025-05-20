
import React from 'react';
import CalendarEvent, { CalendarEventProps } from './CalendarEvent';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DayViewProps {
  date: Date;
  events: CalendarEventProps[];
}

const timeSlots = Array.from({ length: 24 }, (_, i) => i);

const DayView = ({ date, events }: DayViewProps) => {
  const formatTimeSlot = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const getEventsForHour = (hour: number) => {
    // Sort events by type: tasks first, then events, then news
    return events
      .filter(event => {
        const eventHour = event.startTime ? parseInt(event.startTime.split(':')[0]) : null;
        return eventHour === hour;
      })
      .sort((a, b) => {
        const typeOrder = { task: 0, event: 1, news: 2 };
        return typeOrder[a.type] - typeOrder[b.type];
      });
  };

  // Get all events without specific time
  const getAllDayEvents = () => {
    return events
      .filter(event => !event.startTime)
      .sort((a, b) => {
        const typeOrder = { task: 0, event: 1, news: 2 };
        return typeOrder[a.type] - typeOrder[b.type];
      });
  };

  const allDayEvents = getAllDayEvents();

  return (
    <Card className="border rounded-md shadow-sm">
      <CardHeader className="bg-purple-50 border-b py-3">
        <CardTitle className="text-lg text-purple-800 flex items-center justify-center">
          {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {allDayEvents.length > 0 && (
          <div className="border-b p-2">
            <h3 className="text-xs font-medium text-purple-700 mb-2">Eventos e Tarefas do Dia</h3>
            <div className="space-y-2">
              {allDayEvents.map((event) => (
                <CalendarEvent key={event.id} {...event} />
              ))}
            </div>
          </div>
        )}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="min-w-full">
            {timeSlots.map(hour => (
              <div key={hour} className="flex min-h-[80px] border-b last:border-0">
                <div className="w-16 p-2 text-xs text-purple-500 border-r flex justify-center pt-2 bg-purple-50">
                  {formatTimeSlot(hour)}
                </div>
                <div className="flex-1 p-2">
                  {getEventsForHour(hour).map(event => (
                    <CalendarEvent 
                      key={event.id}
                      {...event}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DayView;
