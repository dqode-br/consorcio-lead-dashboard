import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Download, User } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExport }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">DC</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">
            Dashboard Consórcio
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={onExport}
            variant="outline"
            size="sm"
            className="text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Exportar CSV</span>
          </Button>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-border">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center">
                <User size={14} className="text-muted-foreground" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-foreground">
                {user?.name}
              </span>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary-foreground"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
