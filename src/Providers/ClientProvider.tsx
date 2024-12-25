'use client';

import { useFetchAuthors } from '@/hooks/useFetchAuthors';
import { FC } from 'react';

type ClientProviderProps = {
  children: React.ReactNode;
};

const ClientProvider: FC<ClientProviderProps> = ({ children }) => {
  useFetchAuthors();

  return <>{children}</>;
};

export default ClientProvider;
