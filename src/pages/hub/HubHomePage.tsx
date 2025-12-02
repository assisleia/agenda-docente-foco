import React from 'react';
import { useNavigate } from 'react-router-dom';
import HubLayout from '@/components/hub/HubLayout';
import QuickAccessCard from '@/components/hub/QuickAccessCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  AlertTriangle, 
  BarChart3, 
  FolderOpen, 
  Users, 
  FileText,
  BookOpen,
  ClipboardList
} from 'lucide-react';

const HubHomePage = () => {
  const navigate = useNavigate();

  const quickAccess = [
    { title: 'Materiais Institucionais', icon: FileText, path: '/hub/materiais' },
    { title: 'Calendário Acadêmico', icon: Calendar, path: '/hub/agenda' },
    { title: 'Indicadores', icon: BarChart3, path: '/hub/indicadores' },
    { title: 'Incidentes', icon: AlertTriangle, path: '/hub/incidentes' },
    { title: 'Roteiros de Mediação', icon: BookOpen, path: '/hub/materiais' },
    { title: 'Comunidades', icon: Users, path: '/hub/comunidades' },
  ];

  return (
    <HubLayout 
      userName="LEIA FERNANDES DE ASSIS"
      motivationalMessage="Seja a mudança que você quer ver no mundo. Gratidão por continuar fazendo a diferença, hoje e sempre!"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Banner Area */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden h-full min-h-[300px]">
            <div className="gradient-purple p-8 h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                PRÊMIO DOCENTE INSPIRAÇÃO 2025
              </h2>
              <p className="text-white/80 mb-4">
                Participe e reconheça os docentes que fazem a diferença na educação.
              </p>
              <div className="flex gap-2 mt-auto">
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-white/50"></span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Access */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Aplicativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickAccess.slice(0, 6).map((item) => (
                  <QuickAccessCard
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    onClick={() => navigate(item.path)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium text-sm">Reunião de Coordenação</p>
              <p className="text-xs text-muted-foreground">Amanhã, 14:00</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium text-sm">Formação Docente</p>
              <p className="text-xs text-muted-foreground">Sexta, 09:00</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-warning" />
              Tarefas Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium text-sm">Lançar notas do bimestre</p>
              <p className="text-xs text-muted-foreground">Vence em 2 dias</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium text-sm">Revisar plano de aula</p>
              <p className="text-xs text-muted-foreground">Vence em 5 dias</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Incidentes Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium text-sm">Sistema indisponível</p>
              <p className="text-xs text-muted-foreground">Em atendimento</p>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="font-medium text-sm">Dúvida sobre calendário</p>
              <p className="text-xs text-muted-foreground">Resolvido</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default HubHomePage;
