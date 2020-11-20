import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />

      <AuthContext.Provider value={{ nome: 'Wylliam' }}>
        <SignIn />
      </AuthContext.Provider>
    </>
  );
};

export default App;
