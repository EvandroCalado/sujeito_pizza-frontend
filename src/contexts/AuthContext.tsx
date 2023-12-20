import { api } from '@/utils/apiClient';
import router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AuthContextData {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token');
    router.push('/');
  } catch (error) {
    console.log('Logout error');
  }
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/users/me')
        .then((response) => {
          const { id, name, email } = response.data;

          setUser({ id, name, email });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/users/session', {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({
        id,
        name,
        email,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com successo!');

      router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao acessar!');
      console.log('Error', error);
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      await api.post('/users', {
        name,
        email,
        password,
      });

      toast.success('Conta criada!');

      router.push('/');
    } catch (error) {
      toast.error('Error ao cadastrar!');
      console.log('Error', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
