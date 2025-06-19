import React, { useState, useEffect } from 'react';
import { Appointment } from '../types/Appointment';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import AppointmentTable from '../components/AppointmentTable';
import { exportToCSV } from '../utils/csvExport';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Trash, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [tempFilter, setTempFilter] = useState<string>('');

  useEffect(() => {
    console.log("authLoading:", authLoading, "user:", user);

    if (authLoading) {
      console.log("Ainda carregando autenticação, não faz nada.");
      return;
    }

    if (user === null) {
      console.log("Usuário ainda é null, só mostra loading.");
      setLoading(true);
      return;
    }

    if (!user.calendar_id) {
      console.log("Usuário pronto, mas sem calendar_id. Limpando lista.");
      setAppointments([]);
      setLoading(false);
      return;
    }

    console.log("Buscando agendamentos para calendar_id:", user.calendar_id);

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
        // Mapeia o campo email se vier de outro nome
        const mapped = (data as any[]).map((item) => ({
          ...item,
          email: item.email || item.Email || item.email_cliente || item.contato_email || '',
        }));
        setAppointments(mapped as Appointment[]);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user, user?.is_admin, authLoading, toast]);

  const handleExport = () => {
    exportToCSV(appointments);
    toast({
      title: "Exportação realizada!",
      description: "Os dados foram exportados para CSV com sucesso.",
    });
  };

  // Filtro em memória
  const filteredAppointments = appointments.filter((a) => {
    if (!a.data_inicio) return false;
    const data = new Date(a.data_inicio);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (start && data < start) return false;
    if (end && data > end) return false;
    if (tempFilter && (a.temperatura || '').toLowerCase() !== tempFilter) return false;
    return true;
  });

  // Função para filtrar semana atual
  const handleWeekFilter = () => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = now.getDate() - day + (day === 0 ? -6 : 1); // segunda-feira
    const monday = new Date(now.setDate(diffToMonday));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    setStartDate(monday.toISOString().slice(0, 10));
    setEndDate(sunday.toISOString().slice(0, 10));
  };

  // Função para filtrar mês atual
  const handleMonthFilter = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartDate(firstDay.toISOString().slice(0, 10));
    setEndDate(lastDay.toISOString().slice(0, 10));
  };

  // Função para filtrar amanhã
  const handleTomorrowFilter = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = tomorrow.toISOString().slice(0, 10);
    setStartDate(iso);
    setEndDate(iso);
  };

  // Função para filtrar hoje
  const handleTodayFilter = () => {
    const today = new Date();
    const iso = today.toISOString().slice(0, 10);
    setStartDate(iso);
    setEndDate(iso);
  };

  if (authLoading || loading || user === null) {
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
        <div className="space-y-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-foreground tracking-tight">Dashboard de Agendamentos</h1>
              <p className="text-base text-muted-foreground">Gerencie e acompanhe seus agendamentos de consórcio</p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end gap-3">
              {/* Grupo de Datas */}
              <div className="flex flex-1 md:flex-initial gap-3">
                <div className="flex-1">
                  <label className="block text-xs mb-1 text-muted-foreground">Data inicial</label>
                  <input
                    type="date"
                    className="bg-card border border-border rounded px-2 py-1 text-foreground w-full h-10 text-sm"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    min="2025-01-01"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs mb-1 text-muted-foreground">Data final</label>
                  <input
                    type="date"
                    className="bg-card border border-border rounded px-2 py-1 text-foreground w-full h-10 text-sm"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    min="2025-01-01"
                  />
                </div>
              </div>

              {/* Grupo de Botões */}
              <div className="flex items-center gap-3">
                <button
                  className="flex-1 md:flex-initial px-3 rounded bg-muted text-foreground border border-border hover:bg-muted/80 transition h-10 text-sm"
                  onClick={handleWeekFilter}
                  type="button"
                >
                  Semana
                </button>
                <button
                  className="flex-1 md:flex-initial px-3 rounded bg-muted text-foreground border border-border hover:bg-muted/80 transition h-10 text-sm"
                  onClick={handleTodayFilter}
                  type="button"
                >
                  Hoje
                </button>
                <button
                  className="flex-1 md:flex-initial px-3 rounded bg-muted text-foreground border border-border hover:bg-muted/80 transition h-10 text-sm"
                  onClick={handleTomorrowFilter}
                  type="button"
                >
                  Amanhã
                </button>
                {(startDate || endDate) && (
                  <button
                    className="px-3 rounded bg-muted text-foreground border border-border hover:bg-muted/80 transition h-10 text-sm flex items-center justify-center"
                    onClick={() => { setStartDate(''); setEndDate(''); }}
                    type="button"
                    title="Limpar filtro"
                  >
                    <Trash size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* Cards de estatísticas centralizados */}
          <div className="flex justify-center w-full">
            <StatsCards 
              appointments={appointments}
              highlight={tempFilter} 
              onTempClick={setTempFilter} 
              onTotalClick={() => setTempFilter('')}
            />
          </div>
          <AppointmentTable appointments={filteredAppointments} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
