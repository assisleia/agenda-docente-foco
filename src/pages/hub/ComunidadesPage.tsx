import React from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ExternalLink, MessageCircle, Globe, Building } from 'lucide-react';

const communities = [
  { id: '1', name: 'Comunidade Geral', description: 'Espaço de colaboração para todos os profissionais', members: 1250, brand: 'Todas', type: 'geral' },
  { id: '2', name: 'Anhanguera', description: 'Comunidade exclusiva para profissionais Anhanguera', members: 420, brand: 'Anhanguera', type: 'marca' },
  { id: '3', name: 'Unopar', description: 'Comunidade exclusiva para profissionais Unopar', members: 380, brand: 'Unopar', type: 'marca' },
  { id: '4', name: 'Pitágoras', description: 'Comunidade exclusiva para profissionais Pitágoras', members: 290, brand: 'Pitágoras', type: 'marca' },
  { id: '5', name: 'UNIC', description: 'Comunidade exclusiva para profissionais UNIC', members: 160, brand: 'UNIC', type: 'marca' },
];

const specialCommunities = [
  { id: '1', name: 'Regentes e Mediadores', description: 'Espaço de troca entre professores regentes e mediadores pedagógicos', howToAccess: 'Solicite acesso pelo canal #comunidades no Teams' },
  { id: '2', name: 'Coordenadores de Curso', description: 'Comunidade exclusiva para coordenadores de curso', howToAccess: 'Acesso automático para coordenadores cadastrados' },
  { id: '3', name: 'Gestores Acadêmicos', description: 'Espaço para discussões de gestão acadêmica', howToAccess: 'Convite enviado por e-mail institucional' },
];

const ComunidadesPage = () => {
  return (
    <HubLayout userName="LEIA FERNANDES DE ASSIS">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Comunidades</h2>
          <p className="text-muted-foreground">Conecte-se com colegas e participe das discussões</p>
        </div>

        {/* Comunidades por marca */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Comunidades Engage
            </CardTitle>
            <CardDescription>
              Acesse as comunidades de colaboração por marca
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {communities.map(community => (
                <Card key={community.id} className="border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        {community.type === 'geral' ? (
                          <Globe className="h-6 w-6 text-primary" />
                        ) : (
                          <Building className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{community.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {community.members} membros
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acessar no Engage
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comunidades especiais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comunidades Especiais
            </CardTitle>
            <CardDescription>
              Comunidades específicas por função ou área de atuação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specialCommunities.map(community => (
                <div key={community.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{community.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{community.description}</p>
                    <div className="mt-3 p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Como acessar:</span> {community.howToAccess}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info box */}
        <Card className="bg-accent/50 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Sobre o Engage</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  O Engage é nossa plataforma de comunidades integrada ao Microsoft Teams. 
                  Nele você pode participar de discussões, compartilhar conhecimento e 
                  colaborar com colegas de toda a organização.
                </p>
                <Button className="mt-4" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Acessar Engage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </HubLayout>
  );
};

export default ComunidadesPage;
