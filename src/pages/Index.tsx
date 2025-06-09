
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to dashboard if logged in, otherwise stay on login
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return null;
};

export default Index;
