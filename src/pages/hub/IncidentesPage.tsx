import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Plus, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const sampleIncidents = [
  { id: '1', title: 'Sistema de notas indisponível', category: 'suporte_tecnico', status: 'em_atendimento', scope: 'nacional', createdAt: new Date() },
  { id: '2', title: 'Dúvida sobre calendário acadêmico', category: 'academico', status: 'resolvido', scope: 'local', polo: 'São Paulo', createdAt: new Date() },
  { id: '3', title: 'Problema com acesso ao sistema', category: 'suporte_tecnico', status: 'aberto', scope: 'nacional', createdAt: new Date() },
];

const contingencyPlan = [
  { category: 'suporte_tecnico', solution: 'Em caso de indisponibilidade do sistema, orientar o usuário a tentar novamente em 30 minutos. Se persistir, acionar a equipe de TI pelo canal #suporte-ti.' },
  { category: 'academico', solution: 'Consultar a coordenação do curso para esclarecimentos. Documentos oficiais disponíveis na pasta compartilhada do SharePoint.' },
  { category: 'administrativo', solution: 'Encaminhar para o setor responsável via formulário interno. Prazo de resposta: 48 horas úteis.' },
];

const IncidentesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aberto': return 'bg-destructive text-destructive-foreground';
      case 'em_atendimento': return 'bg-warning text-warning-foreground';
      case 'resolvido': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'aberto': return 'Aberto';
      case 'em_atendimento': return 'Em Atendimento';
      case 'resolvido': return 'Resolvido';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aberto': return <AlertCircle className="h-4 w-4" />;
      case 'em_atendimento': return <Clock className="h-4 w-4" />;
      case 'resolvido': return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <HubLayout userName="LEIA FERNANDES DE ASSIS">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Gestão de Incidentes</h2>
            <p className="text-muted-foreground">Acompanhe e registre incidentes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Incidente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Registrar Novo Incidente</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título</Label>
                  <Input placeholder="Descreva brevemente o incidente" />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suporte_tecnico">Suporte Técnico</SelectItem>
                      <SelectItem value="academico">Acadêmico</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                      <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Abrangência</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a abrangência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nacional">Nacional</SelectItem>
                      <SelectItem value="local">Local (Polo/Campus)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Instituição/Marca</Label>
                  <Input placeholder="Ex: Anhanguera, Unopar" />
                </div>
                <div>
                  <Label>Polo/Campus (se local)</Label>
                  <Input placeholder="Ex: São Paulo - Paulista" />
                </div>
                <div>
                  <Label>Descrição detalhada</Label>
                  <Textarea placeholder="Descreva o incidente com mais detalhes..." rows={4} />
                </div>
                <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                  Registrar Incidente
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de incidentes */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Incidentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="todos">
                  <TabsList className="mb-4">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="aberto">Abertos</TabsTrigger>
                    <TabsTrigger value="em_atendimento">Em Atendimento</TabsTrigger>
                    <TabsTrigger value="resolvido">Resolvidos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="todos" className="space-y-3">
                    {sampleIncidents.map(incident => (
                      <div key={incident.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{incident.title}</h4>
                            <Badge variant="outline">{incident.scope}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {incident.category.replace('_', ' ')} • {incident.polo || 'Nacional'}
                          </p>
                        </div>
                        <Badge className={getStatusColor(incident.status)}>
                          {getStatusIcon(incident.status)}
                          <span className="ml-1">{getStatusLabel(incident.status)}</span>
                        </Badge>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="aberto" className="space-y-3">
                    {sampleIncidents.filter(i => i.status === 'aberto').map(incident => (
                      <div key={incident.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium">{incident.title}</h4>
                        </div>
                        <Badge className={getStatusColor(incident.status)}>Aberto</Badge>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="em_atendimento" className="space-y-3">
                    {sampleIncidents.filter(i => i.status === 'em_atendimento').map(incident => (
                      <div key={incident.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium">{incident.title}</h4>
                        </div>
                        <Badge className={getStatusColor(incident.status)}>Em Atendimento</Badge>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="resolvido" className="space-y-3">
                    {sampleIncidents.filter(i => i.status === 'resolvido').map(incident => (
                      <div key={incident.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium">{incident.title}</h4>
                        </div>
                        <Badge className={getStatusColor(incident.status)}>Resolvido</Badge>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Plano de Contingência */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Plano de Contingência
                </CardTitle>
                <CardDescription>
                  Soluções de contorno para problemas comuns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contingencyPlan.map((plan, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm capitalize mb-2">
                      {plan.category.replace('_', ' ')}
                    </h4>
                    <p className="text-sm text-muted-foreground">{plan.solution}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </HubLayout>
  );
};

export default IncidentesPage;
