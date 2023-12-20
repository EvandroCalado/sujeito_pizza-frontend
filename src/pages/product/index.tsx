import Header from '@/components/Header';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/button';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { Plus } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function Product() {
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState('');

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const imageSending = e.target.files[0];

    if (!imageSending) return;

    if (
      imageSending.type === 'image/png' ||
      imageSending.type === 'image/jpeg'
    ) {
      setImage(imageSending as unknown as string);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <Head>
        <title>Novo produto - Sujeito Pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className="mx-auto my-16 flex max-w-screen-md flex-col justify-between px-8">
          <h1 className="text-4xl text-white">Novo produto</h1>

          <form className="mt-8 flex flex-col gap-4">
            <label
              htmlFor="file"
              className="mb-4 flex h-72 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1px] border-gray-100 bg-dark-900"
            >
              <span className="absolute z-20 opacity-70 duration-150 hover:scale-125 hover:opacity-100">
                <Plus size={30} className="text-white" />
              </span>

              <input
                id="file"
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFile}
              />

              {imageUrl && (
                <div className="relative h-full w-full">
                  <Image
                    src={imageUrl}
                    alt="Imagem do produto"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </label>

            <select className="mb-4 h-10 w-full rounded-md border-[1px] border-gray-100 bg-dark-900 px-2 text-white">
              <option value="bebidas">Bebidas</option>
              <option value="pizzas">Pizzas</option>
            </select>

            <Input type="text" placeholder="Digite o nome do produto" />

            <Input type="number" placeholder="Digite o preço do produto" />

            <TextArea placeholder="Descrição do produto" />

            <Button type="submit" color="green">
              Cadastrar
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
