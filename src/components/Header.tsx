
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Download } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExport }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-dashboard-primary">
              Dashboard Consórcio
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={onExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Exportar CSV
            </Button>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                Olá, {user?.name}
              </span>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
