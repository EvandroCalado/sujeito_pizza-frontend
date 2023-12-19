import Input from '@/components/ui/Input';
import Button from '@/components/ui/button';
import { AuthContext } from '@/contexts/AuthContext';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning('Preencha todos os campos!');
      return;
    }

    setLoading(true);

    await signUp({ name, email, password });

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={400}
          height={120}
          className="px-16 md:px-6"
        />

        <div className="mt-8 flex w-[100%] flex-col items-center justify-center px-6 py-8 md:w-[600px]">
          <form className="flex w-[90%] flex-col" onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link
            href={'/'}
            className="mt-4 cursor-pointer text-white duration-150 hover:brightness-75"
          >
            Já possue conta? Faça login!
          </Link>
        </div>
      </div>
    </>
  );
}
