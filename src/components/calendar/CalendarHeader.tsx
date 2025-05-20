
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  view: 'day' | 'week' | 'month' | 'semester';
  onViewChange: (view: 'day' | 'week' | 'month' | 'semester') => void;
}

const CalendarHeader = ({ 
  currentDate, 
  onPrevious, 
  onNext, 
  view, 
  onViewChange 
}: CalendarHeaderProps) => {
  const formatTitle = () => {
    switch (view) {
      case 'day':
        return format(currentDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
      case 'week':
        return `Semana de ${format(currentDate, "dd 'de' MMMM", { locale: ptBR })}`;
      case 'month':
        return format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });
      case 'semester':
        return `Semestre - ${format(currentDate, "MMMM 'de' yyyy", { locale: ptBR })}`;
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 p-2 gap-2">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold mr-4 text-purple-800">{formatTitle()}</h2>
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onPrevious} 
            className="border-purple-200 hover:bg-purple-100"
          >
            <ChevronLeft className="h-4 w-4 text-purple-700" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onNext} 
            className="border-purple-200 hover:bg-purple-100"
          >
            <ChevronRight className="h-4 w-4 text-purple-700" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 bg-purple-50 rounded-md p-1 overflow-x-auto">
        <Button 
          variant={view === 'day' ? "default" : "ghost"} 
          size="sm"
          onClick={() => onViewChange('day')}
          className={view === 'day' ? "bg-purple-600 text-white hover:bg-purple-700" : "text-purple-600 hover:bg-purple-100"}
        >
          Dia
        </Button>
        <Button 
          variant={view === 'week' ? "default" : "ghost"} 
          size="sm"
          onClick={() => onViewChange('week')}
          className={view === 'week' ? "bg-purple-600 text-white hover:bg-purple-700" : "text-purple-600 hover:bg-purple-100"}
        >
          Semana
        </Button>
        <Button 
          variant={view === 'month' ? "default" : "ghost"} 
          size="sm"
          onClick={() => onViewChange('month')}
          className={view === 'month' ? "bg-purple-600 text-white hover:bg-purple-700" : "text-purple-600 hover:bg-purple-100"}
        >
          Mês
        </Button>
        <Button 
          variant={view === 'semester' ? "default" : "ghost"} 
          size="sm"
          onClick={() => onViewChange('semester')}
          className={view === 'semester' ? "bg-purple-600 text-white hover:bg-purple-700" : "text-purple-600 hover:bg-purple-100"}
        >
          Semestre
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
