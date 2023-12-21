import Header from '@/components/Header';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/button';
import { setupApiClient } from '@/utils/api';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { Plus } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface ProductProps {
  categoryList: CategoryListProps[];
}

type CategoryListProps = {
  id: string;
  name: string;
};

export default function Product({ categoryList }: ProductProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState('');
  const [categories] = useState<CategoryListProps[]>(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setCategorySelected(e.target.value as unknown as number);
  }

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      const data = new FormData();

      if (!name || !price || !description || !image) {
        toast.error('Preecha todos do campos!');
        return;
      }

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categories[categorySelected].id);
      data.append('file', image);

      const apiClient = setupApiClient();

      await apiClient.post('/products', data);

      toast.success('Produto cadastrado com sucesso!');
    } catch (error) {
      toast.error('Erro ao cadastrar!');
      console.log(error);
    }

    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setImageUrl('');
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

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleRegister}>
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

            <select
              className="mb-4 h-10 w-full rounded-md border-[1px] border-gray-100 bg-dark-900 px-2 text-white"
              value={categorySelected}
              onChange={handleSelect}
            >
              {categories.map((category, index) => {
                return (
                  <option key={category.id} value={index}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <Input
              type="text"
              placeholder="Digite o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Digite o preço do produto"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextArea
              placeholder="Descrição do produto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/categories');

  return {
    props: {
      categoryList: response.data,
    },
  };
});
