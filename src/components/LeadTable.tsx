import React from 'react';
import { Lead } from '../types/Lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Phone, Mail, Calendar, MessageCircle, Users } from 'lucide-react';

interface LeadTableProps {
  leads: Lead[];
}

const LeadTable: React.FC<LeadTableProps> = ({ leads }) => {
  const getTemperatureBadge = (temperatura: string) => {
    switch (temperatura.toLowerCase()) {
      case 'quente':
        return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">Quente</Badge>;
      case 'morno':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100">Morno</Badge>;
      case 'frio':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100">Frio</Badge>;
      default:
        return <Badge variant="secondary">{temperatura}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    return (
      <Badge 
        variant="outline" 
        className={tipo === 'Imóvel' ? 'border-green-200 text-green-800' : 'border-blue-200 text-blue-800'}
      >
        {tipo}
      </Badge>
    );
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
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded bg-primary"></div>
          </div>
          Lista de Leads
          <Badge variant="secondary" className="ml-2">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {leads.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Contato</TableHead>
                <TableHead className="font-semibold">Telefone</TableHead>
                <TableHead className="font-semibold">Valor</TableHead>
                <TableHead className="font-semibold">Tipo</TableHead>
                <TableHead className="font-semibold">Temperatura</TableHead>
                <TableHead className="font-semibold">Data</TableHead>
                <TableHead className="font-semibold">Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{lead.nome}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="font-mono text-sm">{lead.telefone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-primary">{lead.valor_desejado}</div>
                  </TableCell>
                  <TableCell>
                    {getTipoBadge(lead.tipo_de_consorcio)}
                  </TableCell>
                  <TableCell>
                    {getTemperatureBadge(lead.temperatura)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{formatDate(lead.data_inicio)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 max-w-xs">
                      <MessageCircle size={14} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground truncate">
                        {lead.mensagem}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <div className="h-12 w-12 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6" />
            </div>
            <p className="text-lg font-medium mb-2">Nenhum lead encontrado</p>
            <p className="text-sm">Os leads aparecerão aqui quando forem criados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadTable;
