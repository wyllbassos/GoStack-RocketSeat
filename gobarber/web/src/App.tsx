import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/Auth';
import { ToastProvider } from './hooks/Toast';
import ToastContainer from './components/ToastContainer';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />

      <AuthProvider>
        <SignIn />
        <ToastContainer />
      </AuthProvider>
    </>
  );
};

export default App;
