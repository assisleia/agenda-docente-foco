import React from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Bell, Mail, Globe, Shield, Database } from 'lucide-react';

const AdminConfiguracoesPage = () => {
  return (
    <HubLayout isAdmin userName="Administrador">
      <div className="space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold">Configurações</h2>
          <p className="text-muted-foreground">Gerencie as preferências do sistema</p>
        </div>

        {/* Configurações gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Nome da aplicação</Label>
                <p className="text-sm text-muted-foreground">Nome exibido no cabeçalho</p>
              </div>
              <Input className="w-64" defaultValue="Hub de Gestão" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Mensagem motivacional</Label>
                <p className="text-sm text-muted-foreground">Exibida no banner superior</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>Configure como as notificações são enviadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por e-mail</Label>
                <p className="text-sm text-muted-foreground">Enviar notificações via e-mail</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações pelo Hub Docente</Label>
                <p className="text-sm text-muted-foreground">Integrar com o Hub Docente</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Lembretes automáticos</Label>
                <p className="text-sm text-muted-foreground">Enviar lembretes de prazos</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Integrações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Integrações
            </CardTitle>
            <CardDescription>Conecte com outros sistemas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Microsoft Teams</Label>
                <p className="text-sm text-muted-foreground">Integração com o Teams</p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Engage</Label>
                <p className="text-sm text-muted-foreground">Plataforma de comunidades</p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>ULife</Label>
                <p className="text-sm text-muted-foreground">Sistema acadêmico</p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
          </CardContent>
        </Card>

        {/* E-mail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configurações de E-mail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Remetente padrão</Label>
              <Input defaultValue="hubgestao@instituicao.edu.br" />
            </div>
            <div>
              <Label>Nome do remetente</Label>
              <Input defaultValue="Hub de Gestão" />
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Autenticação de dois fatores</Label>
                <p className="text-sm text-muted-foreground">Exigir 2FA para administradores</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Log de atividades</Label>
                <p className="text-sm text-muted-foreground">Registrar todas as ações administrativas</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Dados */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Dados e Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Exportar dados</Label>
                <p className="text-sm text-muted-foreground">Baixar todos os dados do sistema</p>
              </div>
              <Button variant="outline" size="sm">Exportar</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Backup automático</Label>
                <p className="text-sm text-muted-foreground">Último backup: há 2 horas</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Salvar Configurações</Button>
        </div>
      </div>
    </HubLayout>
  );
};

export default AdminConfiguracoesPage;
