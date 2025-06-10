import React from 'react';
import { Lead } from '../types/Lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Clock, Target } from 'lucide-react';

interface StatsCardsProps {
  leads: Lead[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const leadsPorTemperatura = leads.reduce((acc, lead) => {
    acc[lead.temperatura] = (acc[lead.temperatura] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const estatisticas = [
    {
      title: 'Total de Leads',
      value: totalLeads,
      icon: Users,
      color: 'text-foreground',
      bgColor: 'bg-card'
    },
    {
      title: 'Leads Quentes',
      value: leadsPorTemperatura['Quente'] || 0,
      icon: TrendingUp,
      color: 'text-red-400',
      bgColor: 'bg-card'
    },
    {
      title: 'Leads Mornos',
      value: leadsPorTemperatura['Morno'] || 0,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-card'
    },
    {
      title: 'Leads Frios',
      value: leadsPorTemperatura['Frio'] || 0,
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-card'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {estatisticas.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`${stat.bgColor} border border-border shadow-sm hover:shadow-md transition-shadow duration-200 text-foreground`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-semibold ${stat.color}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
