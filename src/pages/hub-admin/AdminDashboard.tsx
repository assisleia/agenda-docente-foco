import React from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Users, AlertTriangle, Settings, FileUp, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const adminCards = [
  {
    title: 'Gerenciar Agenda',
    description: 'Criar eventos, tarefas e notificações',
    icon: Calendar,
    href: '/hub-admin/agenda',
    stats: '12 eventos ativos'
  },
  {
    title: 'Gerenciar Usuários',
    description: 'Importar e administrar usuários',
    icon: Users,
    href: '/hub-admin/usuarios',
    stats: '1.250 usuários'
  },
  {
    title: 'Configurar Incidentes',
    description: 'Definir fluxos e responsáveis',
    icon: AlertTriangle,
    href: '/hub-admin/incidentes',
    stats: '5 categorias'
  },
  {
    title: 'Configurações',
    description: 'Preferências gerais do sistema',
    icon: Settings,
    href: '/hub-admin/configuracoes',
    stats: ''
  },
];

const recentActivity = [
  { action: 'Novo evento criado', detail: 'Formação Docente - Metodologias Ativas', time: 'Há 2 horas' },
  { action: 'Usuários importados', detail: '45 novos mediadores pedagógicos', time: 'Há 5 horas' },
  { action: 'Notificação enviada', detail: 'Lembrete de prazo para todos os perfis', time: 'Ontem' },
  { action: 'Incidente configurado', detail: 'Nova categoria: Infraestrutura', time: 'Há 2 dias' },
];

const AdminDashboard = () => {
  return (
    <HubLayout isAdmin userName="Administrador">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Painel de Administração</h2>
          <p className="text-muted-foreground">Gerencie a agenda, usuários e configurações do Hub de Gestão</p>
        </div>

        {/* Cards de acesso rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminCards.map(card => (
            <Link key={card.href} to={card.href}>
              <Card className="hover:shadow-md transition-all hover:border-primary cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{card.description}</p>
                  {card.stats && (
                    <p className="text-xs text-primary mt-2 font-medium">{card.stats}</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Estatísticas e atividade recente */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">1.250</p>
                  <p className="text-sm text-muted-foreground">Usuários cadastrados</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Eventos ativos</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-sm text-muted-foreground">Tarefas pendentes</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Incidentes abertos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </HubLayout>
  );
};

export default AdminDashboard;
