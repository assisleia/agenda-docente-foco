
import React from 'react';
import UrgencyBadge from './UrgencyBadge';
import { Bell, FileText, Megaphone, CircleDot } from 'lucide-react';

const CalendarLegend = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 p-3 bg-white rounded-md shadow-sm">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-purple-800">Tipos:</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1">
            <Bell className="h-4 w-4 text-purple-600" />
            <span className="text-sm">Eventos</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-pink-600" />
            <span className="text-sm">Tarefas</span>
          </div>
          <div className="flex items-center gap-1">
            <Megaphone className="h-4 w-4 text-violet-600" />
            <span className="text-sm">Notícias</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-purple-800">Status das Tarefas:</h3>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <CircleDot className="h-3 w-3 text-green-500" />
            <UrgencyBadge type="task" level="onTime" />
          </div>
          <div className="flex items-center gap-1">
            <CircleDot className="h-3 w-3 text-yellow-500" />
            <UrgencyBadge type="task" level="medium" />
          </div>
          <div className="flex items-center gap-1">
            <CircleDot className="h-3 w-3 text-orange-500" />
            <UrgencyBadge type="task" level="urgent" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-purple-800">Categorias:</h3>
        <div className="flex flex-wrap gap-2">
          <UrgencyBadge type="event" level="onTime" category="jornadaDocente" />
          <UrgencyBadge type="event" level="onTime" category="jornadaDiscente" />
          <UrgencyBadge type="event" level="onTime" category="institucional" />
        </div>
      </div>
    </div>
  );
};

export default CalendarLegend;
