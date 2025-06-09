
export interface Lead {
  id: string;
  telefone: string;
  nome: string;
  mensagem: string;
  data_inicio: string;
  data_fim: string;
  calendar_id: string;
  event_id: string;
  criado_em: string;
  valor_desejado: string;
  temperatura: 'Quente' | 'Morno' | 'Frio';
  tipo_de_consorcio: 'Automóvel' | 'Imóvel' | 'Serviços';
  tema: string;
}
