
import React from 'react';
import { Lead } from '../types/Lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LeadTableProps {
  leads: Lead[];
}

const LeadTable: React.FC<LeadTableProps> = ({ leads }) => {
  const getTemperatureClass = (temperatura: string) => {
    switch (temperatura.toLowerCase()) {
      case 'quente':
        return 'temperature-hot';
      case 'morno':
        return 'temperature-warm';
      case 'frio':
        return 'temperature-cold';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl text-dashboard-primary">
          Lista de Leads ({leads.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold text-foreground">Nome/Email</th>
                <th className="text-left p-3 font-semibold text-foreground">Telefone</th>
                <th className="text-left p-3 font-semibold text-foreground">Valor Desejado</th>
                <th className="text-left p-3 font-semibold text-foreground">Tipo</th>
                <th className="text-left p-3 font-semibold text-foreground">Temperatura</th>
                <th className="text-left p-3 font-semibold text-foreground">Data</th>
                <th className="text-left p-3 font-semibold text-foreground">Mensagem</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr 
                  key={lead.id} 
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="p-3">
                    <div className="font-medium text-foreground">{lead.nome}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-foreground">{lead.telefone}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-medium text-dashboard-primary">{lead.valor_desejado}</div>
                  </td>
                  <td className="p-3">
                    <Badge variant="secondary">{lead.tipo_de_consorcio}</Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={getTemperatureClass(lead.temperatura)}>
                      {lead.temperatura}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-muted-foreground">
                      {formatDate(lead.data_inicio)}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                      {lead.mensagem}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {leads.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum lead encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadTable;
