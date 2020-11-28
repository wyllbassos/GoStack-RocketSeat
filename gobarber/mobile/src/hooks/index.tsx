import React from 'react';

import { AuthProvider } from './auth';

// import { Container } from './styles';

const Hooks: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Hooks;
