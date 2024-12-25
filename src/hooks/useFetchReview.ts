import { useEffect, useState } from 'react';
import { getReviewByIdApi } from '@/services/reviews';
import { Review } from '@/types/reviews';

// example hook for fetching a review by id
export const useFetchReviewById = (id: string | null) => {
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(id !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id === null) return;

    const fetchReview = async () => {
      try {
        const review = await getReviewByIdApi(id);
        setReview(review);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  return { data: review, isLoading, error };
};
