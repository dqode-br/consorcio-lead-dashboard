
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
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary'
    },
    {
      title: 'Leads Quentes',
      value: leadsPorTemperatura['Quente'] || 0,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      title: 'Leads Mornos',
      value: leadsPorTemperatura['Morno'] || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Leads Frios',
      value: leadsPorTemperatura['Frio'] || 0,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {estatisticas.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-200 ${stat.bgColor}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
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
