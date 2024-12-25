import { useEffect } from 'react';
import { getAuthorsApi } from '@/services/authors';
import { useCommonStore } from '@/Providers/commonStoreProvider';

export const useFetchAuthors = () => {
  const setAuthors = useCommonStore((state) => state.setAuthors);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authors = await getAuthorsApi();
      setAuthors(authors);
    };

    fetchAuthors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
