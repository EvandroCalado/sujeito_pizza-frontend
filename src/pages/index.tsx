import Input from '@/components/ui/Input';
import Button from '@/components/ui/button';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu login</title>
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
          <form className="flex w-[90%] flex-col">
            <Input type="text" placeholder="Digite seu email" />
            <Input type="password" placeholder="Digite sua senha" />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <Link href={'#'} className="mt-4 cursor-pointer text-white">
            Não possue uma conta? Cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}
