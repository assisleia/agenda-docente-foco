import React, { useState } from 'react';
import HubLayout from '@/components/hub/HubLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Users, Star, RefreshCw, Eye } from 'lucide-react';

const indicators = [
  { id: '1', name: 'NPS', value: 72, previousValue: 68, unit: '', type: 'nps' },
  { id: '2', name: 'Avaliação Institucional', value: 4.2, previousValue: 4.0, unit: '/5', type: 'avaliacao' },
  { id: '3', name: 'Taxa de Retenção', value: 85, previousValue: 82, unit: '%', type: 'retencao' },
  { id: '4', name: 'Acessos Mensais', value: 15420, previousValue: 14200, unit: '', type: 'acessos' },
];

const indicatorsByBrand = [
  { brand: 'Anhanguera', nps: 74, avaliacao: 4.3, retencao: 86, acessos: 5200 },
  { brand: 'Unopar', nps: 71, avaliacao: 4.1, retencao: 84, acessos: 4800 },
  { brand: 'Pitágoras', nps: 70, avaliacao: 4.0, retencao: 83, acessos: 3100 },
  { brand: 'UNIC', nps: 73, avaliacao: 4.2, retencao: 87, acessos: 2320 },
];

const IndicadoresPage = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return { icon: TrendingUp, color: 'text-success', label: 'Aumento' };
    if (current < previous) return { icon: TrendingDown, color: 'text-destructive', label: 'Queda' };
    return { icon: Minus, color: 'text-muted-foreground', label: 'Estável' };
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'nps': return Star;
      case 'avaliacao': return Star;
      case 'retencao': return RefreshCw;
      case 'acessos': return Eye;
      default: return Users;
    }
  };

  return (
    <HubLayout userName="LEIA FERNANDES DE ASSIS">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Indicadores</h2>
            <p className="text-muted-foreground">Acompanhe os principais indicadores de desempenho</p>
          </div>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as marcas</SelectItem>
              <SelectItem value="anhanguera">Anhanguera</SelectItem>
              <SelectItem value="unopar">Unopar</SelectItem>
              <SelectItem value="pitagoras">Pitágoras</SelectItem>
              <SelectItem value="unic">UNIC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards de indicadores principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators.map(indicator => {
            const trend = getTrend(indicator.value, indicator.previousValue);
            const Icon = getIconForType(indicator.type);
            return (
              <Card key={indicator.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className={trend.color}>
                      <trend.icon className="h-3 w-3 mr-1" />
                      {trend.label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{indicator.name}</p>
                    <p className="text-3xl font-bold">
                      {indicator.value.toLocaleString()}{indicator.unit}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Anterior: {indicator.previousValue.toLocaleString()}{indicator.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabela por marca */}
        <Card>
          <CardHeader>
            <CardTitle>Indicadores por Marca</CardTitle>
            <CardDescription>Comparativo entre as diferentes marcas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Marca</th>
                    <th className="text-center py-3 px-4 font-medium">NPS</th>
                    <th className="text-center py-3 px-4 font-medium">Avaliação</th>
                    <th className="text-center py-3 px-4 font-medium">Retenção</th>
                    <th className="text-center py-3 px-4 font-medium">Acessos</th>
                  </tr>
                </thead>
                <tbody>
                  {indicatorsByBrand.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{row.brand}</td>
                      <td className="text-center py-3 px-4">
                        <Badge variant="outline">{row.nps}</Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge variant="outline">{row.avaliacao}/5</Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge variant="outline">{row.retencao}%</Badge>
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge variant="outline">{row.acessos.toLocaleString()}</Badge>
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

export default IndicadoresPage;
