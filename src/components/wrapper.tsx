import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex min-h-screen w-full max-w-7xl flex-col">
      {children}
    </div>
  );
}
