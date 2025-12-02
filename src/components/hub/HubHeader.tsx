import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HubHeaderProps {
  userName: string;
  motivationalMessage?: string;
  onMenuClick?: () => void;
}

const HubHeader = ({ userName, motivationalMessage, onMenuClick }: HubHeaderProps) => {
  return (
    <div className="gradient-header text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-white hover:bg-white/20"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Bem-vindo {userName}
              </h1>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Bell className="h-4 w-4 mr-2" />
                Central de Notificações
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Nova tarefa disponível</span>
                  <span className="text-sm text-muted-foreground">Há 5 minutos</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Evento amanhã</span>
                  <span className="text-sm text-muted-foreground">Há 1 hora</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {motivationalMessage && (
        <div className="bg-gradient-to-r from-orange-500/90 to-amber-500/90 py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/95 text-sm md:text-base">
              {motivationalMessage} 👋 🌟
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubHeader;
