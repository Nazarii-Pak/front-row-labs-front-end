'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

const SearchComponent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md p-2 w-full sm:w-fit bg-transparent"
        data-testid="search-input"
      />
    </div>
  );
};

export default SearchComponent;
