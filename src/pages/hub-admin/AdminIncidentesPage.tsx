import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Settings, Users, Pencil, Trash2, AlertTriangle } from 'lucide-react';

const incidentCategories = [
  { 
    id: 'suporte_tecnico', 
    label: 'Suporte Técnico', 
    description: 'Problemas com sistemas, acesso e tecnologia',
    responsibles: ['João TI', 'Maria Suporte'],
    color: 'bg-info'
  },
  { 
    id: 'academico', 
    label: 'Acadêmico', 
    description: 'Questões relacionadas ao processo acadêmico',
    responsibles: ['Ana Coordenadora', 'Carlos Gestor'],
    color: 'bg-success'
  },
  { 
    id: 'administrativo', 
    label: 'Administrativo', 
    description: 'Assuntos administrativos e financeiros',
    responsibles: ['Fernanda Admin'],
    color: 'bg-warning'
  },
  { 
    id: 'infraestrutura', 
    label: 'Infraestrutura', 
    description: 'Problemas com espaço físico e equipamentos',
    responsibles: ['Pedro Manutenção'],
    color: 'bg-secondary'
  },
  { 
    id: 'outro', 
    label: 'Outro', 
    description: 'Outros tipos de incidentes',
    responsibles: ['Equipe Geral'],
    color: 'bg-muted'
  },
];

const availableUsers = [
  { id: '1', name: 'João TI', role: 'Suporte Técnico' },
  { id: '2', name: 'Maria Suporte', role: 'Suporte Técnico' },
  { id: '3', name: 'Ana Coordenadora', role: 'Coordenação' },
  { id: '4', name: 'Carlos Gestor', role: 'Gestão Acadêmica' },
  { id: '5', name: 'Fernanda Admin', role: 'Administrativo' },
  { id: '6', name: 'Pedro Manutenção', role: 'Infraestrutura' },
];

const AdminIncidentesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  return (
    <HubLayout isAdmin userName="Administrador">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Configurar Incidentes</h2>
            <p className="text-muted-foreground">Defina o fluxo de gestão e responsáveis por categoria</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Categoria</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Nome da Categoria</Label>
                  <Input placeholder="Ex: Suporte Pedagógico" />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Input placeholder="Breve descrição da categoria" />
                </div>
                <div>
                  <Label className="mb-2 block">Responsáveis pelo atendimento</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableUsers.map(user => (
                      <div key={user.id} className="flex items-center gap-2">
                        <Checkbox id={`user-${user.id}`} />
                        <label htmlFor={`user-${user.id}`} className="text-sm">
                          {user.name} <span className="text-muted-foreground">({user.role})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                  Criar Categoria
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Explicação do fluxo */}
        <Card className="bg-accent/50 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Como funciona o fluxo de incidentes</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Quando um usuário abre um incidente e seleciona uma categoria, o sistema 
                  automaticamente notifica os responsáveis configurados para aquela categoria. 
                  Os responsáveis recebem um alerta e podem atender o incidente diretamente 
                  pelo Hub de Gestão.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {incidentCategories.map(category => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <CardTitle className="text-lg">{category.label}</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingCategory(category.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-xs text-muted-foreground">Responsáveis</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.responsibles.map((responsible, index) => (
                      <Badge key={index} variant="outline">
                        <Users className="h-3 w-3 mr-1" />
                        {responsible}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estatísticas de incidentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Estatísticas de Incidentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {incidentCategories.map(category => (
                <div key={category.id} className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 20)}</p>
                  <p className="text-xs text-muted-foreground">{category.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default AdminIncidentesPage;
