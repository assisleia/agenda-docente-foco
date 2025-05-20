
import React from 'react';
import { CalendarEventProps } from './CalendarEvent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addMonths, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MonthView from './MonthView';

interface SemesterViewProps {
  date: Date;
  events: CalendarEventProps[];
}

const SemesterView = ({ date, events }: SemesterViewProps) => {
  // Generate 6 months starting from the current month
  const months = Array.from({ length: 6 }, (_, i) => {
    const monthDate = addMonths(startOfMonth(date), i);
    return {
      date: monthDate,
      label: format(monthDate, 'MMM', { locale: ptBR }),
      value: format(monthDate, 'yyyy-MM')
    };
  });
  
  // Sort events by type: tasks first, then events, then news
  const sortedEvents = [...events].sort((a, b) => {
    const typeOrder = { task: 0, event: 1, news: 2 };
    return typeOrder[a.type] - typeOrder[b.type];
  });

  return (
    <Card>
      <CardHeader className="bg-purple-50 border-b py-3">
        <CardTitle className="text-lg text-purple-800 text-center">
          Visão Semestral
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue={months[0].value} className="w-full">
          <TabsList className="mb-4 w-full flex justify-center">
            {months.map((month) => (
              <TabsTrigger key={month.value} value={month.value} className="text-sm">
                {month.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {months.map((month) => (
            <TabsContent key={month.value} value={month.value} className="mt-0">
              <MonthView date={month.date} events={sortedEvents} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SemesterView;
