
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
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-apple flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">DC</span>
          </div>
          <h1 className="text-apple-headline font-system text-foreground">
            Dashboard Consórcio
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={onExport}
            variant="outline"
            size="sm"
            className="font-system text-apple-callout border-border hover:bg-secondary/50 transition-colors"
          >
            <Download size={16} />
            Exportar CSV
          </Button>
          
          <div className="flex items-center space-x-4 pl-4 border-l border-border">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                <User size={14} className="text-muted-foreground" />
              </div>
              <span className="text-apple-callout font-system text-foreground font-medium">
                {user?.name}
              </span>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground font-system"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
