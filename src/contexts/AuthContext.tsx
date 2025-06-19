import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Importar o cliente Supabase

interface User {
  id: string;
  email: string;
  name?: string; // Opcional, pode vir do user_metadata do Supabase
  calendar_id?: string; // Adicionando o calendar_id do usuário
  is_admin?: boolean; // Adicionando a propriedade is_admin
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSessionAndUser = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (session) {
        const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          console.error("Erro ao buscar detalhes do usuário do Supabase:", userError);
          setUser(null);
        } else if (supabaseUser) {
          console.log("Full user object from getUser:", supabaseUser);
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.full_name as string || supabaseUser.email || 'Usuário',
            calendar_id: supabaseUser.user_metadata?.calendar_id as string || undefined,
            is_admin: supabaseUser.user_metadata?.is_admin as boolean || false,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    getSessionAndUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Quando o estado muda (ex: login/logout), getSessionAndUser será chamado novamente para sincronizar
      // Ou, podemos otimizar e tentar usar a session.user se ela já for completa
      if (session) {
        const supabaseUser = session.user;
        console.log("Full user object on auth state change:", supabaseUser);
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.full_name as string || supabaseUser.email || 'Usuário',
          calendar_id: supabaseUser.user_metadata?.calendar_id as string || undefined,
          is_admin: supabaseUser.user_metadata?.is_admin as boolean || false,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro de login do Supabase:', error.message);
      setIsLoading(false);
      return false;
    } else if (data.user) {
      // Após o login, buscamos os detalhes completos do usuário para garantir os metadados
      const { data: { user: loggedInUser }, error: getUserError } = await supabase.auth.getUser();

      if (getUserError) {
        console.error("Erro ao buscar detalhes do usuário após login:", getUserError);
        // Ainda assim, definimos o usuário básico se a sessão estiver ok
        setUser({
          id: data.user.id,
          email: data.user.email || '',
        });
        setIsLoading(false);
        return false;
      } else if (loggedInUser) {
        console.log("Full user object from getUser after login:", loggedInUser);
        setUser({
          id: loggedInUser.id,
          email: loggedInUser.email || '',
          name: loggedInUser.user_metadata?.full_name as string || loggedInUser.email || 'Usuário',
          calendar_id: loggedInUser.user_metadata?.calendar_id as string || undefined,
          is_admin: loggedInUser.user_metadata?.is_admin as boolean || false,
        });
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } else {
      // Caso data.user seja null, mas não haja erro (ex: credenciais inválidas mas sem erro explícito)
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro de logout do Supabase:', error.message);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
