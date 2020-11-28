import React from 'react';
import { useAuth } from '../../hooks/auth';

import { Container, ContainerText } from './styles';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <ContainerText>{`Olá ${user.name}`}</ContainerText>
      <ContainerText>{`Email: ${user.email}`}</ContainerText>
      <Button onPress={signOut}>Sair</Button>
    </Container>
  );
};

export default Dashboard;
