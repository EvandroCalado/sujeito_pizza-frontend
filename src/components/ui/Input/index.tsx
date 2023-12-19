import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...rest }: InputProps) {
  return (
    <input
      type="text"
      className="bg-dark-900 placeholder:text-white/0.8 mb-4 h-10 rounded-md border-[1px] border-gray-100 p-4 text-white"
      {...rest}
    />
  );
}
