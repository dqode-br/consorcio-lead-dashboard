
import React, { useState, useEffect } from 'react';
import { Lead } from '../types/Lead';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import LeadTable from '../components/LeadTable';
import { exportToCSV } from '../utils/csvExport';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading leads data
    const mockLeads: Lead[] = [
      {
        id: "4d79135f-126f-415f-aa4b-7260ea2b9dfb",
        telefone: "13991698163",
        nome: "danilo@gmail.com",
        mensagem: "NÃO tem experiência com consórcios.",
        data_inicio: "2025-06-10 08:30:00",
        data_fim: "2025-06-10 08:30:00",
        calendar_id: "a1c558dc60cbc1d1c9895222922927577c32cd9b3d81e56f7a4d77d56571b7f0@group.calendar.google.com",
        event_id: "5nem20bc5bv3rs6dp3h083no9g",
        criado_em: "2025-06-09 22:07:12.689462",
        valor_desejado: "R$ 300 mil",
        temperatura: "Morno",
        tipo_de_consorcio: "Automóvel",
        tema: " Reunião com Danilo Vieira"
      },
      {
        id: "sample-lead-2",
        telefone: "11987654321",
        nome: "maria@exemplo.com",
        mensagem: "Interessada em consórcio imobiliário para primeira casa própria.",
        data_inicio: "2025-06-11 14:00:00",
        data_fim: "2025-06-11 14:30:00",
        calendar_id: "calendar-id-2",
        event_id: "event-id-2",
        criado_em: "2025-06-09 15:30:00",
        valor_desejado: "R$ 500 mil",
        temperatura: "Quente",
        tipo_de_consorcio: "Imóvel",
        tema: "Reunião com Maria Silva"
      },
      {
        id: "sample-lead-3",
        telefone: "21999888777",
        nome: "joao@exemplo.com",
        mensagem: "Procurando consórcio para troca de veículo.",
        data_inicio: "2025-06-12 10:00:00",
        data_fim: "2025-06-12 10:30:00",
        calendar_id: "calendar-id-3",
        event_id: "event-id-3",
        criado_em: "2025-06-09 11:15:00",
        valor_desejado: "R$ 80 mil",
        temperatura: "Frio",
        tipo_de_consorcio: "Automóvel",
        tema: "Reunião com João Santos"
      }
    ];

    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  const handleExport = () => {
    exportToCSV(leads);
    toast({
      title: "Exportação realizada!",
      description: "Os dados foram exportados para CSV com sucesso.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header onExport={handleExport} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Carregando leads...</p>
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
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">Dashboard de Leads</h1>
            <p className="text-base text-muted-foreground">Gerencie e acompanhe seus leads de consórcio</p>
          </div>
          <StatsCards leads={leads} />
          <LeadTable leads={leads} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
