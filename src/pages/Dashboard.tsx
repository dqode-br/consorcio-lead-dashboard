import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/Appointment';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import AppointmentTable from '../components/AppointmentTable';
import { exportToCSV } from '../utils/csvExport';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../lib/supabaseClient';

const Dashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('agendamentos')
        .select('*');

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
  }, [toast]);

  const handleExport = () => {
    exportToCSV(appointments);
    toast({
      title: "Exportação realizada!",
      description: "Os dados foram exportados para CSV com sucesso.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
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
