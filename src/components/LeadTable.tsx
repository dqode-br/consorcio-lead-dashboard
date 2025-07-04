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
    switch ((temperatura || '').toLowerCase()) {
      case 'quente':
        return <Badge className="bg-secondary text-red-400 border-red-600 hover:bg-secondary/80">Quente</Badge>;
      case 'morno':
        return <Badge className="bg-secondary text-orange-400 border-orange-600 hover:bg-secondary/80">Morno</Badge>;
      case 'frio':
        return <Badge className="bg-secondary text-blue-400 border-blue-600 hover:bg-secondary/80">Frio</Badge>;
      default:
        return <Badge variant="secondary">{temperatura}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    return (
      <Badge 
        variant="outline" 
        className={`bg-secondary ${ 
          tipo === 'Imóvel' 
            ? 'text-green-400 border-green-600' 
            : 'text-blue-440 border-blue-600'
        } hover:bg-secondary/80`}
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
    <Card className="shadow-sm border border-border rounded-lg overflow-hidden">
      <CardHeader className="bg-card rounded-t-lg">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Lista de Leads
          </span>
          <Badge variant="secondary" className="text-sm">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <div className="border-b border-border"></div>
      <CardContent className="p-0">
        {leads.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-border">
                <TableHead className="font-medium text-muted-foreground h-12">Contato</TableHead>
                <TableHead className="font-medium text-muted-foreground">Telefone</TableHead>
                <TableHead className="font-medium text-muted-foreground">Valor</TableHead>
                <TableHead className="font-medium text-muted-foreground">Tipo</TableHead>
                <TableHead className="font-medium text-muted-foreground">Temperatura</TableHead>
                <TableHead className="font-medium text-muted-foreground">Data</TableHead>
                <TableHead className="font-medium text-muted-foreground">Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/50 transition-colors border-b border-border/50">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail size={16} className="text-primary" />
                      </div>
                      <div className="font-medium text-foreground">
                        {lead.nome}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-muted-foreground" />
                      <span className="font-mono text-sm text-foreground">{lead.telefone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-primary">
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
                      <span className="text-sm text-muted-foreground">
                        {formatDate(lead.data_inicio)}
                      </span>
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
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-2">
              Nenhum lead encontrado
            </p>
            <p className="text-sm text-muted-foreground">
              Os leads aparecerão aqui quando forem criados
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadTable;
