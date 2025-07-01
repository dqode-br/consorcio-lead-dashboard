import React from 'react';
import { Appointment } from '../types/Appointment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Clock, XCircle, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
  appointments: Appointment[];
  highlight?: string;
  onTempClick?: (temp: string) => void;
  onTotalClick?: () => void;
}

const StatsCards: React.FC<StatsCardsProps> = ({ appointments, highlight, onTempClick, onTotalClick }) => {
  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  
  // Separa agendamentos futuros e passados
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futuros = safeAppointments.filter(a => a.data_inicio && new Date(a.data_inicio) >= today);
  const passados = safeAppointments.filter(a => a.data_inicio && new Date(a.data_inicio) < today);

  // Contagem para os cards principais (apenas futuros)
  const futurosPorTemperatura = futuros.reduce((acc, appointment) => {
    const temp = (appointment.temperatura || '').toLowerCase();
    if (temp) acc[temp] = (acc[temp] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Contagem total (futuros + passados) para o texto menor
  const totalPorTemperatura = safeAppointments.reduce((acc, appointment) => {
    const temp = (appointment.temperatura || '').toLowerCase();
    if (temp) acc[temp] = (acc[temp] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const estatisticas = [
    {
      title: 'Total de Agendamentos',
      value: futuros.length,
      valuePassados: passados.length, // Usado para "Finalizados"
      icon: Users,
      color: 'text-foreground',
      bgColor: 'bg-card'
    },
    {
      title: 'Leads Quentes',
      value: futurosPorTemperatura['quente'] || 0,
      total: totalPorTemperatura['quente'] || 0,
      icon: TrendingUp,
      color: 'text-red-500',
      bgColor: 'bg-card'
    },
    {
      title: 'Leads Mornos',
      value: futurosPorTemperatura['morno'] || 0,
      total: totalPorTemperatura['morno'] || 0,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-card'
    },
    {
      title: 'Leads Frios',
      value: futurosPorTemperatura['frio'] || 0,
      total: totalPorTemperatura['frio'] || 0,
      icon: XCircle,
      color: 'text-blue-500',
      bgColor: 'bg-card'
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {estatisticas.map((stat, index) => {
        // Filtro por temperatura
        let isClickable = false;
        let tempKey = '';
        let onClick;
        if (stat.title === 'Leads Quentes') { isClickable = true; tempKey = 'quente'; onClick = () => onTempClick && onTempClick(tempKey); }
        if (stat.title === 'Leads Mornos') { isClickable = true; tempKey = 'morno'; onClick = () => onTempClick && onTempClick(tempKey); }
        if (stat.title === 'Leads Frios') { isClickable = true; tempKey = 'frio'; onClick = () => onTempClick && onTempClick(tempKey); }
        if (stat.title === 'Total de Agendamentos') { isClickable = true; onClick = onTotalClick; }
        const isActive = highlight === tempKey;
        return (
          <Card
            key={stat.title}
            className={
              `${stat.bgColor} border border-border shadow-sm hover:shadow-md transition-shadow duration-200 text-foreground min-h-[120px] flex flex-col justify-center` +
              (isActive ? ' ring-2 ring-primary border-primary' : '') +
              (isClickable ? ' cursor-pointer' : '')
            }
            onClick={isClickable ? onClick : undefined}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {stat.title === 'Total de Agendamentos' ? (
                <>
                  <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                  <div className="text-xs mt-1 text-muted-foreground" style={{color:'#888'}}>
                    <span className="font-semibold" style={{color:'#888'}}>Finalizados: </span>
                    <span className="font-semibold" style={{color:'#444'}}>{stat.valuePassados}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
                  {(stat.total || 0) > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Total: {stat.total}
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
