import Header from '@/components/Header';
import ModalOrder from '@/components/ModalOrder';
import { setupApiClient } from '@/utils/api';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { RefreshCcw } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';
import Modal from 'react-modal';

interface DashboardProps {
  orders: OrdersProps[];
}

type OrdersProps = {
  id: string;
  name: string;
  table: string | number;
  status: boolean;
  draft: boolean;
};

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  };
  order: {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
  };
};

export default function Dashboard({ orders }: DashboardProps) {
  const [orderList, setOrderList] = useState<OrdersProps[]>(orders || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleOpenModalView(order_id: string) {
    setLoading(true);
    const apiClient = setupApiClient();

    const response = await apiClient.get('/orders/detail', {
      params: {
        order_id,
      },
    });

    setModalItem(response.data);
    setOpenModal(true);
    setLoading(false);
  }

  function handleCloseModalView() {
    setOpenModal(false);
  }

  async function handleFinishOrder(order_id: string) {
    setLoading(true);
    const apiClient = setupApiClient();

    await apiClient.put('/orders/finish', {
      order_id,
    });

    const response = await apiClient.get('/orders');

    setOrderList(response.data);

    setOpenModal(false);
    setLoading(false);
  }

  async function handleRefrashOrders() {
    setLoading(true);
    const apiClient = setupApiClient();

    const response = await apiClient.get('/orders');

    setOrderList(response.data);
    setLoading(false);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Painel Sujeito Pizzaria</title>
      </Head>

      <div>
        <Header />

        <main className="mx-auto my-16 flex max-w-screen-md flex-col px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl text-white">Últimos pedidos</h1>

            <button
              onClick={handleRefrashOrders}
              disabled={loading}
              className="disabled:animate-spin"
            >
              <RefreshCcw className="text-green-900" />
            </button>
          </div>

          <article className="my-4 flex flex-col">
            {orderList.length === 0 && (
              <span className="text-lg text-white">
                Nenhum pedido em andamento...
              </span>
            )}

            {orderList.map((order) => (
              <section
                key={order.id}
                className="mb-4 flex items-center rounded-md bg-dark-900"
              >
                <button
                  className="flex h-[60px] items-center text-lg text-white"
                  onClick={() => handleOpenModalView(order.id)}
                >
                  <div className="mr-4 h-[60px] w-2 rounded-s-md bg-green-900"></div>
                  <span>Mesa {order.table}</span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {openModal && (
          <ModalOrder
            isOpen={openModal}
            onRequestClose={handleCloseModalView}
            order={modalItem}
            handleFinishOrder={handleFinishOrder}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/orders');

  return {
    props: {
      orders: response.data,
    },
  };
});
