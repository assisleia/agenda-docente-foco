import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const sampleEvents = [
  { id: '1', title: 'Reunião de Coordenação', type: 'reuniao', date: new Date(), time: '14:00' },
  { id: '2', title: 'Formação Docente - Metodologias Ativas', type: 'formacao', date: addDays(new Date(), 1), time: '09:00' },
  { id: '3', title: 'Entrega de Notas', type: 'tarefa', date: addDays(new Date(), 2) },
  { id: '4', title: 'Semana Acadêmica', type: 'academico', date: addDays(new Date(), 5), time: '08:00' },
];

const AgendaPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month' | 'semester'>('day');

  const handlePrevious = () => {
    switch (view) {
      case 'day': setCurrentDate(subDays(currentDate, 1)); break;
      case 'week': setCurrentDate(subWeeks(currentDate, 1)); break;
      case 'month': setCurrentDate(subMonths(currentDate, 1)); break;
      case 'semester': setCurrentDate(subMonths(currentDate, 6)); break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'day': setCurrentDate(addDays(currentDate, 1)); break;
      case 'week': setCurrentDate(addWeeks(currentDate, 1)); break;
      case 'month': setCurrentDate(addMonths(currentDate, 1)); break;
      case 'semester': setCurrentDate(addMonths(currentDate, 6)); break;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'formacao': return 'bg-secondary text-secondary-foreground';
      case 'reuniao': return 'bg-info text-info-foreground';
      case 'academico': return 'bg-success text-success-foreground';
      case 'tarefa': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <HubLayout userName="LEIA FERNANDES DE ASSIS">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendário lateral */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendário</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                locale={ptBR}
                className="rounded-md border"
              />
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">Legenda</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-secondary text-secondary-foreground">Formação</Badge>
                  <Badge className="bg-info text-info-foreground">Reunião</Badge>
                  <Badge className="bg-success text-success-foreground">Acadêmico</Badge>
                  <Badge className="bg-warning text-warning-foreground">Tarefa</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área de visualização */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Agenda</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[150px] text-center">
                    {format(currentDate, "d 'de' MMMM yyyy", { locale: ptBR })}
                  </span>
                  <Button variant="outline" size="icon" onClick={handleNext}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
                <TabsList className="w-full grid grid-cols-4 mb-4">
                  <TabsTrigger value="day">Hoje</TabsTrigger>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mês</TabsTrigger>
                  <TabsTrigger value="semester">Semestre</TabsTrigger>
                </TabsList>

                <TabsContent value="day" className="mt-0">
                  <div className="space-y-3">
                    {sampleEvents.filter(e => 
                      format(e.date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
                    ).length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">Nenhum evento para este dia</p>
                    ) : (
                      sampleEvents.filter(e => 
                        format(e.date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
                      ).map(event => (
                        <div key={event.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className={`w-1 h-full min-h-[60px] rounded-full ${getTypeColor(event.type)}`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            {event.time && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3" /> {event.time}
                              </p>
                            )}
                          </div>
                          <Badge className={getTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="week" className="mt-0">
                  <div className="space-y-3">
                    {sampleEvents.map(event => (
                      <div key={event.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-1 h-full min-h-[60px] rounded-full ${getTypeColor(event.type)}`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <CalendarIcon className="h-3 w-3" /> {format(event.date, "EEEE, d 'de' MMMM", { locale: ptBR })}
                          </p>
                          {event.time && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {event.time}
                            </p>
                          )}
                        </div>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="month" className="mt-0">
                  <div className="space-y-3">
                    {sampleEvents.map(event => (
                      <div key={event.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-1 h-full min-h-[60px] rounded-full ${getTypeColor(event.type)}`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <CalendarIcon className="h-3 w-3" /> {format(event.date, "d 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="semester" className="mt-0">
                  <p className="text-center text-muted-foreground py-8">Visão semestral em desenvolvimento</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </HubLayout>
  );
};

export default AgendaPage;
