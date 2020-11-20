import { createContext } from 'react';

interface AuthContextState {
  nome: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export default AuthContext;
