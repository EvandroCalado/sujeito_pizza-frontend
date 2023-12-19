import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button
      className="rounded-md bg-red-900 p-2 text-white duration-150 hover:brightness-110 disabled:cursor-not-allowed"
      disabled={loading}
      {...rest}
    >
      {loading ? <Loader2 className="animate-spin text-white" /> : children}
    </button>
  );
}
