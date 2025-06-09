
import { Lead } from '../types/Lead';

export const exportToCSV = (leads: Lead[]) => {
  const headers = [
    'ID',
    'Nome/Email',
    'Telefone',
    'Valor Desejado',
    'Tipo de Consórcio',
    'Temperatura',
    'Data Início',
    'Data Fim',
    'Mensagem',
    'Tema',
    'Criado Em'
  ];

  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      lead.id,
      `"${lead.nome}"`,
      lead.telefone,
      `"${lead.valor_desejado}"`,
      lead.tipo_de_consorcio,
      lead.temperatura,
      lead.data_inicio,
      lead.data_fim,
      `"${lead.mensagem.replace(/"/g, '""')}"`,
      `"${lead.tema}"`,
      lead.criado_em
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_consorcio_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
