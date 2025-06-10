import React from 'react';
import { Appointment } from '../types/Appointment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Clock, XCircle, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
  appointments: Appointment[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ appointments }) => {
  const totalAppointments = appointments.length;
  const appointmentsPorStatus = appointments.reduce((acc, appointment) => {
    acc[appointment.status] = (acc[appointment.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const estatisticas = [
    {
      title: 'Total de Agendamentos',
      value: totalAppointments,
      icon: Users,
      color: 'text-foreground',
      bgColor: 'bg-card'
    },
    {
      title: 'Agendamentos Confirmados',
      value: appointmentsPorStatus['confirmado'] || 0,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-card'
    },
    {
      title: 'Agendamentos Pendentes',
      value: appointmentsPorStatus['pendente'] || 0,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-card'
    },
    {
      title: 'Agendamentos Cancelados',
      value: appointmentsPorStatus['cancelado'] || 0,
      icon: XCircle,
      color: 'text-red-500',
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
