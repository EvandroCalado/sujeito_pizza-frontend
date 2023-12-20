import { AuthContext } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

export default function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <header className="h-20">
      <div className="m-auto flex h-full max-w-6xl items-center justify-between px-8">
        <Link href={'/'} className="cursor-pointer">
          <Image src="/logo.svg" alt="Logo" width={190} height={60} />
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={'/categories'}
            className="relative inline-block px-2 text-white duration-150 hover:text-red-900"
          >
            Categoria
          </Link>
          <Link
            href={'/products'}
            className="relative inline-block px-2 text-white duration-150 hover:text-red-900"
          >
            Cardapio
          </Link>

          <button className="duration-150 hover:scale-125" onClick={signOut}>
            <LogOut className="text-white" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
