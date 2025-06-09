
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
      bgColor: 'bg-apple-gray-50',
      iconColor: 'text-apple-blue',
      textColor: 'text-apple-gray-900'
    },
    {
      title: 'Leads Quentes',
      value: leadsPorTemperatura['Quente'] || 0,
      icon: TrendingUp,
      bgColor: 'bg-red-50',
      iconColor: 'text-apple-red',
      textColor: 'text-apple-red'
    },
    {
      title: 'Leads Mornos',
      value: leadsPorTemperatura['Morno'] || 0,
      icon: Clock,
      bgColor: 'bg-orange-50',
      iconColor: 'text-apple-orange',
      textColor: 'text-apple-orange'
    },
    {
      title: 'Leads Frios',
      value: leadsPorTemperatura['Frio'] || 0,
      icon: Target,
      bgColor: 'bg-blue-50',
      iconColor: 'text-apple-blue',
      textColor: 'text-apple-blue'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {estatisticas.map((stat, index) => (
        <Card 
          key={stat.title} 
          className={`apple-card border-border bg-card shadow-apple rounded-apple overflow-hidden ${stat.bgColor}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-apple-subhead font-system text-muted-foreground font-medium">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`text-apple-title2 font-system font-bold ${stat.textColor}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
