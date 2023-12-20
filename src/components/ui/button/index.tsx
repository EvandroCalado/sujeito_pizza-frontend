import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  color?: 'red' | 'green';
}

export default function Button({
  loading,
  children,
  color = 'red',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${
        color === 'red' ? 'bg-red-900 text-white' : 'bg-green-900 text-dark-700'
      } rounded-md  p-2  duration-150 hover:brightness-110 disabled:cursor-not-allowed`}
      disabled={loading}
      {...rest}
    >
      {loading ? <Loader2 className="animate-spin text-white" /> : children}
    </button>
  );
}
