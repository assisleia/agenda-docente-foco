import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Upload, Plus, Users, Pencil, Trash2 } from 'lucide-react';

const userRoles = [
  { id: 'reitor', label: 'Reitor' },
  { id: 'pro_reitor', label: 'Pró-reitor' },
  { id: 'coordenador_polo', label: 'Coordenador de Polo' },
  { id: 'coordenador_curso', label: 'Coordenador de Curso' },
  { id: 'gestor_academico', label: 'Gestor Acadêmico' },
  { id: 'lideranca', label: 'Outras Lideranças' },
  { id: 'atendimento_suporte', label: 'Atendimento e Suporte' },
  { id: 'professor', label: 'Professor' },
  { id: 'professor_regente', label: 'Professor Regente' },
  { id: 'mediador_pedagogico', label: 'Mediador Pedagógico' },
  { id: 'professor_conteudista', label: 'Professor Conteudista' },
];

const sampleUsers = [
  { id: '1', name: 'Maria Silva', email: 'maria.silva@email.com', role: 'coordenador_curso', institution: 'Anhanguera', polo: 'São Paulo' },
  { id: '2', name: 'João Santos', email: 'joao.santos@email.com', role: 'professor_regente', institution: 'Unopar', polo: 'Curitiba' },
  { id: '3', name: 'Ana Costa', email: 'ana.costa@email.com', role: 'mediador_pedagogico', institution: 'Pitágoras', polo: 'Belo Horizonte' },
  { id: '4', name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', role: 'gestor_academico', institution: 'UNIC', polo: 'Cuiabá' },
  { id: '5', name: 'Fernanda Lima', email: 'fernanda.lima@email.com', role: 'atendimento_suporte', institution: 'Anhanguera', polo: 'Rio de Janeiro' },
];

const AdminUsuariosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleLabel = (roleId: string) => {
    return userRoles.find(r => r.id === roleId)?.label || roleId;
  };

  return (
    <HubLayout isAdmin userName="Administrador">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
            <p className="text-muted-foreground">Importe e administre os usuários do sistema</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Usuário</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nome completo</Label>
                    <Input placeholder="Nome do usuário" />
                  </div>
                  <div>
                    <Label>E-mail</Label>
                    <Input type="email" placeholder="email@exemplo.com" />
                  </div>
                  <div>
                    <Label>Perfil</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map(role => (
                          <SelectItem key={role.id} value={role.id}>{role.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Instituição/Marca</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a instituição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anhanguera">Anhanguera</SelectItem>
                        <SelectItem value="unopar">Unopar</SelectItem>
                        <SelectItem value="pitagoras">Pitágoras</SelectItem>
                        <SelectItem value="unic">UNIC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Polo/Campus</Label>
                    <Input placeholder="Ex: São Paulo - Paulista" />
                  </div>
                  <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                    Adicionar Usuário
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importar Planilha
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1.250</p>
                  <p className="text-xs text-muted-foreground">Total de usuários</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">420</p>
                  <p className="text-xs text-muted-foreground">Professores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">180</p>
                  <p className="text-xs text-muted-foreground">Mediadores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">85</p>
                  <p className="text-xs text-muted-foreground">Coordenadores</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nome ou e-mail..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por perfil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os perfis</SelectItem>
              {userRoles.map(role => (
                <SelectItem key={role.id} value={role.id}>{role.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabela de usuários */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários Cadastrados</CardTitle>
            <CardDescription>{filteredUsers.length} usuários encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Nome</th>
                    <th className="text-left py-3 px-4 font-medium">E-mail</th>
                    <th className="text-left py-3 px-4 font-medium">Perfil</th>
                    <th className="text-left py-3 px-4 font-medium">Instituição</th>
                    <th className="text-left py-3 px-4 font-medium">Polo</th>
                    <th className="text-left py-3 px-4 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                      </td>
                      <td className="py-3 px-4">{user.institution}</td>
                      <td className="py-3 px-4">{user.polo}</td>
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
      </div>
    </HubLayout>
  );
};

export default AdminUsuariosPage;
