'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/FormInput';
import DeleteReviewButton from './DeleteReviewButton';
import { ReviewFormSchema, ReviewFormSchemaType } from './validation';
import { createReviewApi, updateReviewApi } from '@/services/reviews';
import { Review } from '@/types/reviews';

type ReviewDetailsProps = {
  isNew: boolean;
  review: Review | null;
};

const ReviewDetails: FC<ReviewDetailsProps> = ({ isNew, review }) => {
  const router = useRouter();

  // example hook for fetching a review by id. Decided to use server side fetching instead.
  // const { data: reviewData, isLoading, error } = useFetchReviewById(id ?? null);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormSchemaType>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: {
      rating: 5,
    },
  });

  useEffect(() => {
    if (isNew) return;

    if (review) {
      setValue('title', review.title);
      setValue('rating', review.rating);
      setValue('content', review.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

  const onSubmit = async (data: ReviewFormSchemaType) => {
    const body = {
      ...data,
      author: isNew ? 'Anonymous Author' : review?.author,
    };

    try {
      if (review && !isNew) {
        await updateReviewApi(review.id, body);
      } else {
        await createReviewApi(body);
      }

      router.push('/');
    } catch (error) {
      setError('root', { message: (error as Error).message });
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="w-fit underline">
        ← Back
      </button>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-green-900">Review Details {review?.id}</h1>
        {review && <DeleteReviewButton id={review.id} />}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput control={control} name={'title'} label={'Title'} placeholder={'Your Title'} />

        <label htmlFor="rating">
          <p className="pb-1 pl-2 font-bold-f text-base  text-left text-primary-green-900">Rating</p>
          <select
            id="rating"
            className="p-4 border border-primary-green-300 rounded-2xl w-full text-primary-green-700 focus:outline-none "
            {...control.register('rating', {
              setValueAs: (value) => parseInt(value, 10),
            })}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
        {errors.rating && <p className="text-text-error text-left text-sm">{errors.rating.message}</p>}

        <FormInput control={control} name={'content'} label={'Content'} placeholder={'Your Content'} />

        {errors.root?.message && (
          <div className="flex flex-col gap-2">
            {errors.root?.message?.split('\n').map((error, index) => (
              <p key={index} className="text-text-error text-left text-sm text-red-500">
                {error}
              </p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="block mx-auto p-2 w-full bg-blue-900 active:bg-blue-400 hover:bg-blue-400 text-white  rounded-2xl "
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ReviewDetails;
