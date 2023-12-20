import Header from '@/components/Header';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/button';
import { setupApiClient } from '@/utils/api';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

export default function Categories() {
  const [name, setName] = useState('');

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (!name) {
      toast.warning('Nome da categoria obrigatório!');
    }

    const apiClient = setupApiClient();

    await apiClient.post('/categories', {
      name,
    });

    toast.success('Cadastrado com sucesso!');

    setName('');
  }

  return (
    <>
      <Head>
        <title>Nova categoria - Sujeito Pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className="mx-auto my-16 flex max-w-3xl flex-col justify-between px-8">
          <h1 className="text-4xl text-white">Cadastrar categorias</h1>

          <form className="my-4 flex flex-col" onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Nome da categoria"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Button type="submit" color="green">
              Cadastrar
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}
