
import React, { useState } from 'react';
import { CalendarEventProps } from './CalendarEvent';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DayView from './DayView';

interface SelectableCalendarViewProps {
  date: Date;
  events: CalendarEventProps[];
  onDateChange: (date: Date) => void;
}

const SelectableCalendarView = ({ date, events, onDateChange }: SelectableCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDate(newDate);
      onDateChange(newDate);
    }
  };

  // Calculate which days have events
  const eventDates = events.map(event => {
    const eventDate = new Date(event.startDate);
    return format(eventDate, 'yyyy-MM-dd');
  });

  // Sort events by type: tasks first, then events, then news
  const sortedEvents = [...events].sort((a, b) => {
    const typeOrder = { task: 0, event: 1, news: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  // Custom day rendering to show dots for days with events
  const renderDay = (day: Date, cellId: string): React.ReactNode => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const hasEvents = eventDates.includes(formattedDay);
    
    return (
      <div className="relative flex h-9 w-9 items-center justify-center">
        {day.getDate()}
        {hasEvents && (
          <div className="absolute bottom-1 h-1 w-1 rounded-full bg-purple-600"></div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            locale={ptBR}
            className="rounded-md border"
            modifiers={{
              hasEvent: (date) => eventDates.includes(format(date, 'yyyy-MM-dd')),
            }}
            modifiersClassNames={{
              hasEvent: "font-bold text-purple-800",
            }}
          />
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardContent className="p-0">
          {selectedDate && (
            <DayView date={selectedDate} events={sortedEvents} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectableCalendarView;
