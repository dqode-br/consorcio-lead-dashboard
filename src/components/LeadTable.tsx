
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
        return <Badge className="bg-red-50 text-apple-red border-red-100 hover:bg-red-50 font-system text-apple-caption1">Quente</Badge>;
      case 'morno':
        return <Badge className="bg-orange-50 text-apple-orange border-orange-100 hover:bg-orange-50 font-system text-apple-caption1">Morno</Badge>;
      case 'frio':
        return <Badge className="bg-blue-50 text-apple-blue border-blue-100 hover:bg-blue-50 font-system text-apple-caption1">Frio</Badge>;
      default:
        return <Badge variant="secondary" className="font-system text-apple-caption1">{temperatura}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    return (
      <Badge 
        variant="outline" 
        className={`font-system text-apple-caption1 ${
          tipo === 'Imóvel' 
            ? 'border-apple-green/30 text-apple-green bg-green-50' 
            : 'border-apple-blue/30 text-apple-blue bg-blue-50'
        }`}
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
    <Card className="shadow-apple border-border rounded-apple overflow-hidden">
      <CardHeader className="bg-card border-b border-border">
        <CardTitle className="text-apple-headline font-system flex items-center gap-3">
          <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
          Lista de Leads
          <Badge variant="secondary" className="ml-auto font-system text-apple-caption1">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {leads.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground h-12">Contato</TableHead>
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground">Telefone</TableHead>
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground">Valor</TableHead>
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground">Tipo</TableHead>
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground">Temperatura</TableHead>
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground">Data</TableHead>
                <TableHead className="font-system text-apple-subhead font-semibold text-muted-foreground">Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-secondary/30 transition-colors border-b border-border/50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail size={14} className="text-primary" />
                      </div>
                      <div className="font-system text-apple-callout font-medium text-foreground">
                        {lead.nome}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="font-mono text-apple-callout text-foreground">{lead.telefone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-system text-apple-callout font-semibold text-primary">
                      {lead.valor_desejado}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTipoBadge(lead.tipo_de_consorcio)}
                  </TableCell>
                  <TableCell>
                    {getTemperatureBadge(lead.temperatura)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="font-system text-apple-callout text-muted-foreground">
                        {formatDate(lead.data_inicio)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 max-w-xs">
                      <MessageCircle size={14} className="text-muted-foreground flex-shrink-0" />
                      <span className="font-system text-apple-callout text-muted-foreground truncate">
                        {lead.mensagem}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16">
            <div className="w-12 h-12 bg-secondary/50 rounded-apple flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-system text-apple-headline font-medium text-foreground mb-2">
              Nenhum lead encontrado
            </p>
            <p className="font-system text-apple-callout text-muted-foreground">
              Os leads aparecerão aqui quando forem criados
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadTable;
