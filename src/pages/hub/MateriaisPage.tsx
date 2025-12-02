import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, BookOpen, Video, Download, ExternalLink, Calendar, FileSpreadsheet } from 'lucide-react';

const materials = [
  { id: '1', title: 'Roteiro de Mediação - Módulo 1', type: 'roteiro', category: 'Mediação', format: 'pdf', updatedAt: '2025-01-15' },
  { id: '2', title: 'Guia do Professor Regente', type: 'guia', category: 'Orientação', format: 'pdf', updatedAt: '2025-01-10' },
  { id: '3', title: 'Tutorial - Sistema de Notas', type: 'tutorial', category: 'Sistemas', format: 'video', updatedAt: '2025-01-08' },
  { id: '4', title: 'Cronograma Acadêmico 2025/1', type: 'cronograma', category: 'Calendário', format: 'xlsx', updatedAt: '2025-01-05' },
  { id: '5', title: 'Orientações Gerais - Avaliação', type: 'orientacao', category: 'Avaliação', format: 'pdf', updatedAt: '2025-01-03' },
  { id: '6', title: 'Guia de Metodologias Ativas', type: 'guia', category: 'Metodologia', format: 'pdf', updatedAt: '2024-12-20' },
  { id: '7', title: 'Roteiro de Mediação - Módulo 2', type: 'roteiro', category: 'Mediação', format: 'pdf', updatedAt: '2024-12-18' },
  { id: '8', title: 'Tutorial - Plataforma AVA', type: 'tutorial', category: 'Sistemas', format: 'video', updatedAt: '2024-12-15' },
];

const MateriaisPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || material.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return FileText;
      case 'video': return Video;
      case 'xlsx': return FileSpreadsheet;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'roteiro': return 'bg-secondary/20 text-secondary';
      case 'guia': return 'bg-info/20 text-info';
      case 'tutorial': return 'bg-success/20 text-success';
      case 'cronograma': return 'bg-warning/20 text-warning';
      case 'orientacao': return 'bg-primary/20 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <HubLayout userName="LEIA FERNANDES DE ASSIS">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Materiais</h2>
          <p className="text-muted-foreground">Acesse roteiros, guias, tutoriais e orientações</p>
        </div>

        {/* Barra de busca */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar materiais..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filtros por tipo */}
        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="roteiro">Roteiros</TabsTrigger>
            <TabsTrigger value="guia">Guias</TabsTrigger>
            <TabsTrigger value="tutorial">Tutoriais</TabsTrigger>
            <TabsTrigger value="cronograma">Cronogramas</TabsTrigger>
            <TabsTrigger value="orientacao">Orientações</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Lista de materiais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map(material => {
            const FormatIcon = getFormatIcon(material.format);
            return (
              <Card key={material.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <FormatIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{material.title}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTypeColor(material.type)} variant="secondary">
                          {material.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{material.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Atualizado em {material.updatedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Baixar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Abrir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredMaterials.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium">Nenhum material encontrado</h3>
              <p className="text-sm text-muted-foreground">Tente ajustar os filtros ou termo de busca</p>
            </CardContent>
          </Card>
        )}
      </div>
    </HubLayout>
  );
};

export default MateriaisPage;
