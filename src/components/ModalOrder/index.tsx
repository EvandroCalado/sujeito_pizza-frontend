import { OrderItemProps } from '@/pages/dashboard';
import { X } from 'lucide-react';
import Modal from 'react-modal';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (order_id: string) => void;
}

export default function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: ModalOrderProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          padding: '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#1d1d2e',
          borderRadius: '0.25rem',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
      shouldCloseOnOverlayClick
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <X className="text-red-900" />
      </button>

      <div className="w-[280px] bg-dark-700 px-4 text-white sm:w-[400px] md:w-[620px]">
        <h2 className="my-4 text-2xl">Detalhes do pedido</h2>
        <span className="text-2xl">
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className="my-4 flex flex-col">
            <span>
              {item.amount} -{' '}
              <strong className="text-green-900">{item.product.name}</strong>
            </span>
            <span className="mt-2 break-all">{item.product.description}</span>
          </section>
        ))}

        <button
          className="mt-6 rounded-md bg-dark-900 px-4 py-2 text-red-900"
          onClick={() => handleFinishOrder(order[0].order_id)}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
