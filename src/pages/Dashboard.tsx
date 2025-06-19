import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/Appointment';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import AppointmentTable from '../components/AppointmentTable';
import { exportToCSV } from '../utils/csvExport';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Só busca quando o usuário estiver carregado e calendar_id disponível
    if (authLoading || !user?.calendar_id) return;

    const fetchAppointments = async () => {
      setLoading(true);
      let query = supabase.from('agendamentos').select('*');
      if (!user.is_admin) {
        query = query.eq('calendar_id', user.calendar_id);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Erro ao buscar agendamentos do Supabase:', error);
        toast({
          title: "Erro ao carregar agendamentos",
          description: "Não foi possível carregar os dados do Supabase. Tente novamente.",
          variant: "destructive",
        });
        setAppointments([]);
      } else {
        setAppointments(data as Appointment[]);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user?.calendar_id, user?.is_admin, authLoading, toast]);

  const handleExport = () => {
    exportToCSV(appointments);
    toast({
      title: "Exportação realizada!",
      description: "Os dados foram exportados para CSV com sucesso.",
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header onExport={handleExport} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Carregando agendamentos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onExport={handleExport} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Dashboard de Agendamentos</h1>
            <p className="text-base text-muted-foreground">Gerencie e acompanhe seus agendamentos de consórcio</p>
          </div>
          <StatsCards appointments={appointments} />
          <AppointmentTable appointments={appointments} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
