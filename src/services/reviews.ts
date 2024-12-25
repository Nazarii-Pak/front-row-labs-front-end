import { REVIEWS_PAGE_SIZE } from '@/core';
import { NEXT_PUBLIC_API_URL } from '@/core/envs';
import { ReviewFormSchemaType } from '@/features/reviews/ReviewDetails/validation';

import { Review, ReviewsResponse } from '@/types/reviews';
import { onError } from './common';

export const getReviews = async ({
  page = 1,
  search = '',
  page_size = REVIEWS_PAGE_SIZE,
  rating,
  author,
}: {
  page?: number;
  search?: string;
  page_size?: number;
  rating?: number;
  author?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (page) searchParams.set('page', page.toString());
  if (search) searchParams.set('search', search);
  if (page_size) searchParams.set('page_size', page_size.toString());
  if (rating) searchParams.set('rating', rating.toString());
  if (author) searchParams.set('author', author);

  const res = await fetch(`${NEXT_PUBLIC_API_URL}/reviews?${searchParams.toString()}`, {
    next: {
      tags: ['reviews', searchParams.toString()],
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    return onError(await res.json());
  }

  const data: ReviewsResponse = await res.json();
  return data;
};

export const getReviewByIdApi = async (id: string): Promise<Review> => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/reviews/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['reviews', id],
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    return onError(await res.json());
  }

  const data: Review = await res.json();

  return data;
};

export const createReviewApi = async (body: ReviewFormSchemaType) => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return onError(await res.json());
  }

  const data: Review = await res.json();
  return data;
};

export const updateReviewApi = async (id: string, review: ReviewFormSchemaType) => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });

  if (!res.ok) {
    return onError(await res.json());
  }

  const data: Review = await res.json();
  return data;
};

export const deleteReviewApi = async (id: string) => {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/reviews/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    return onError(await res.json());
  }

  return true;
};
