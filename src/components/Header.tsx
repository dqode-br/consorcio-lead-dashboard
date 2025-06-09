
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">DC</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Dashboard Consórcio
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={onExport}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Exportar CSV
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm">
              <User size={16} className="text-muted-foreground" />
              <span className="text-foreground font-medium">
                {user?.name}
              </span>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
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
