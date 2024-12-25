'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCommonStore } from '@/Providers/commonStoreProvider';

const AuthorsFilter: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const authors = useCommonStore((state) => state.authors);

  const author = searchParams.get('author');

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const author = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (!author) {
      params.delete('author');
    } else {
      params.set('author', author);
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-md p-2">
      <label htmlFor="authors">Authors</label>
      <select
        name="authors"
        id="authors"
        value={author || ''}
        onChange={handleAuthorChange}
        data-testid="author-filter"
        className="bg-transparent"
      >
        <option value="">All</option>
        {authors?.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthorsFilter;
