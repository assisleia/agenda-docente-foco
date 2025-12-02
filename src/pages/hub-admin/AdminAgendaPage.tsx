import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Upload, Calendar, ClipboardList, Bell, Pencil, Trash2 } from 'lucide-react';

const profiles = [
  { id: 'professor', label: 'Professores' },
  { id: 'professor_regente', label: 'Professores Regentes' },
  { id: 'mediador_pedagogico', label: 'Mediadores Pedagógicos' },
  { id: 'professor_conteudista', label: 'Professores Conteudistas' },
];

const eventTypes = [
  { id: 'formacao', label: 'Formação' },
  { id: 'reuniao', label: 'Reunião de Trabalho' },
  { id: 'academico', label: 'Evento Acadêmico' },
  { id: 'outro', label: 'Outro' },
];

const sampleItems = [
  { id: '1', title: 'Formação Docente', type: 'evento', eventType: 'formacao', startDate: '2025-02-10', endDate: '2025-02-10', profiles: ['professor', 'professor_regente'] },
  { id: '2', title: 'Entrega de Notas', type: 'tarefa', startDate: '2025-02-15', endDate: '2025-02-20', profiles: ['professor'] },
  { id: '3', title: 'Novo calendário disponível', type: 'notificacao', startDate: '2025-02-01', profiles: ['todos'] },
];

const AdminAgendaPage = () => {
  const [activeTab, setActiveTab] = useState('eventos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <HubLayout isAdmin userName="Administrador">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Gerenciar Agenda</h2>
            <p className="text-muted-foreground">Crie e gerencie eventos, tarefas e notificações</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="eventos" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            <TabsTrigger value="tarefas" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Tarefas
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
          </TabsList>

          {/* EVENTOS */}
          <TabsContent value="eventos" className="space-y-4">
            <div className="flex gap-2">
              <Dialog open={isDialogOpen && activeTab === 'eventos'} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Título</Label>
                      <Input placeholder="Nome do evento" />
                    </div>
                    <div>
                      <Label>Tipo de Evento</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map(type => (
                            <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Data Início</Label>
                        <Input type="date" />
                      </div>
                      <div>
                        <Label>Data Fim</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <Label>Descrição</Label>
                      <Textarea placeholder="Descrição do evento" />
                    </div>
                    <div>
                      <Label className="mb-2 block">Perfis de destino</Label>
                      <div className="space-y-2">
                        {profiles.map(profile => (
                          <div key={profile.id} className="flex items-center gap-2">
                            <Checkbox id={profile.id} />
                            <label htmlFor={profile.id} className="text-sm">{profile.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">Notificação</Label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox id="email" />
                          <label htmlFor="email" className="text-sm">Enviar por e-mail</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="hub" />
                          <label htmlFor="hub" className="text-sm">Notificar pelo Hub Docente</label>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                      Criar Evento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar Arquivo
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Eventos Criados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Título</th>
                        <th className="text-left py-3 px-4 font-medium">Tipo</th>
                        <th className="text-left py-3 px-4 font-medium">Data</th>
                        <th className="text-left py-3 px-4 font-medium">Perfis</th>
                        <th className="text-left py-3 px-4 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleItems.filter(i => i.type === 'evento').map(item => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{item.title}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{item.eventType}</Badge>
                          </td>
                          <td className="py-3 px-4">{item.startDate}</td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {item.profiles.length} perfis
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAREFAS */}
          <TabsContent value="tarefas" className="space-y-4">
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Tarefa
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Importar do Calendário Acadêmico
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar Planilha
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tarefas Criadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Título</th>
                        <th className="text-left py-3 px-4 font-medium">Início</th>
                        <th className="text-left py-3 px-4 font-medium">Prazo</th>
                        <th className="text-left py-3 px-4 font-medium">Perfis</th>
                        <th className="text-left py-3 px-4 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleItems.filter(i => i.type === 'tarefa').map(item => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{item.title}</td>
                          <td className="py-3 px-4">{item.startDate}</td>
                          <td className="py-3 px-4">{item.endDate}</td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-muted-foreground">
                              {item.profiles.length} perfis
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTIFICAÇÕES */}
          <TabsContent value="notificacoes" className="space-y-4">
            <div className="flex gap-2">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Notificação
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar Planilha
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Notificações Enviadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Título</th>
                        <th className="text-left py-3 px-4 font-medium">Data</th>
                        <th className="text-left py-3 px-4 font-medium">Público</th>
                        <th className="text-left py-3 px-4 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleItems.filter(i => i.type === 'notificacao').map(item => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{item.title}</td>
                          <td className="py-3 px-4">{item.startDate}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">
                              {item.profiles.includes('todos') ? 'Todos' : `${item.profiles.length} perfis`}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </HubLayout>
  );
};

export default AdminAgendaPage;
