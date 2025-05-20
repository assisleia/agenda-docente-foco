
import React, { useState } from 'react';
import { CalendarEventProps } from './CalendarEvent';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

  return (
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
        hasEvent: "font-bold text-blue-800 border-blue-500",
      }}
    />
  );
};

export default SelectableCalendarView;
