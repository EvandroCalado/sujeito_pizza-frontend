import Input from '@/components/ui/Input';
import Button from '@/components/ui/button';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça seu login</title>
      </Head>
      <div className="center">
        <Image src="/logo.svg" alt="Logo" width={400} height={120} />

        <div className="login">
          <form>
            <Input type="text" placeholder="Digite seu email" />
            <Input type="password" placeholder="Digite sua senha" />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
