import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea({ ...rest }: TextAreaProps) {
  return (
    <textarea
      className='"bg-dark-900 placeholder:text-white/0.8 mb-4 h-10 rounded-md border-[1px] border-gray-100 p-4 text-white'
      {...rest}
    ></textarea>
  );
}
