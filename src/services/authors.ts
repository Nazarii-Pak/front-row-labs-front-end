import { NEXT_PUBLIC_API_URL } from '@/core/envs';
import { onError } from './common';

export const getAuthorsApi = async (): Promise<string[]> => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/authors`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['authors'],
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    return onError(await res.json());
  }

  const data: { authors: string[] } = await res.json();

  return data.authors;
};
