import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  AlertTriangle, 
  BarChart3, 
  FolderOpen, 
  Users, 
  MessageSquare,
  Settings,
  Home,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HubSidebarProps {
  isAdmin?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const managementLinks = [
  { href: '/hub', label: 'Página Inicial', icon: Home },
  { href: '/hub/agenda', label: 'Agenda', icon: Calendar },
  { href: '/hub/incidentes', label: 'Incidentes', icon: AlertTriangle },
  { href: '/hub/indicadores', label: 'Indicadores', icon: BarChart3 },
  { href: '/hub/materiais', label: 'Materiais', icon: FolderOpen },
  { href: '/hub/comunidades', label: 'Comunidades', icon: Users },
  { href: '/hub/assistente', label: 'Assistente', icon: MessageSquare },
];

const adminLinks = [
  { href: '/hub-admin', label: 'Painel Admin', icon: Home },
  { href: '/hub-admin/agenda', label: 'Gerenciar Agenda', icon: Calendar },
  { href: '/hub-admin/usuarios', label: 'Gerenciar Usuários', icon: Users },
  { href: '/hub-admin/incidentes', label: 'Config. Incidentes', icon: AlertTriangle },
  { href: '/hub-admin/configuracoes', label: 'Configurações', icon: Settings },
];

const HubSidebar = ({ isAdmin = false, isOpen = true, onClose }: HubSidebarProps) => {
  const location = useLocation();
  const links = isAdmin ? adminLinks : managementLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed md:sticky top-0 left-0 h-screen w-64 bg-card border-r z-50 transition-transform duration-300",
        "md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HG</span>
            </div>
            <span className="font-semibold text-foreground">
              {isAdmin ? 'Hub Admin' : 'Hub de Gestão'}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to={isAdmin ? '/hub' : '/hub-admin'}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            {isAdmin ? 'Ir para Gestão' : 'Ir para Admin'}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default HubSidebar;
