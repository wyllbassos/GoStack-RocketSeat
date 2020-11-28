import React from 'react';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Button onPress={signOut}>Sair</Button>
    </Container>
  );
};

export default Dashboard;
