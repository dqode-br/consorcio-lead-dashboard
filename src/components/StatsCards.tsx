
import React from 'react';
import { Lead } from '../types/Lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardsProps {
  leads: Lead[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const leadsPorTemperatura = leads.reduce((acc, lead) => {
    acc[lead.temperatura] = (acc[lead.temperatura] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsPorTipo = leads.reduce((acc, lead) => {
    acc[lead.tipo_de_consorcio] = (acc[lead.tipo_de_consorcio] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const estatisticas = [
    {
      title: 'Total de Leads',
      value: totalLeads,
      color: 'text-dashboard-primary',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Leads Quentes',
      value: leadsPorTemperatura['Quente'] || 0,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Leads Mornos',
      value: leadsPorTemperatura['Morno'] || 0,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Leads Frios',
      value: leadsPorTemperatura['Frio'] || 0,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {estatisticas.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`card-hover ${stat.bgColor} border-l-4 border-l-current animate-fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
