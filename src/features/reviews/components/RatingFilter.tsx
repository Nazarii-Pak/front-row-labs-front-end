'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const RatingFilter: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rating = searchParams.get('rating');

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rating = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (!rating) {
      params.delete('rating');
    } else {
      params.set('rating', rating);
      params.set('page', '1');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-2 border border-gray-300 rounded-md p-2">
      <label htmlFor="rating">Rating</label>
      <select
        name="rating"
        id="rating"
        value={rating || ''}
        onChange={handleRatingChange}
        data-testid="rating-filter"
        className="bg-transparent"
      >
        <option value="">All</option>
        <option value="1">⭐️</option>
        <option value="2">⭐️⭐️</option>
        <option value="3">⭐️⭐️⭐️</option>
        <option value="4">⭐️⭐️⭐️⭐️</option>
        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
      </select>
    </div>
  );
};

export default RatingFilter;
