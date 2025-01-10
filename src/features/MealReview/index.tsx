'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DeleteReviewButton from '../reviews/ReviewDetails/DeleteReviewButton';
import MealComponentInput from './components/MealComponentInput';
import { UpdatedMealReviewSchema, UpdatedMealReviewSchemaType } from './validation';
import { UpdatedMealReview } from '@/types/reviews';

type MealReviewProps = {
  review: UpdatedMealReview;
};

const MealReview: FC<MealReviewProps> = ({ review }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdatedMealReviewSchemaType>({
    resolver: zodResolver(UpdatedMealReviewSchema),
    defaultValues: {
      rating: review?.rating,
      title: review?.title,
      content: review?.content,
      author: '',
      components: review?.components,
      confirm: false,
    },
  });

  const onSubmit = (data: UpdatedMealReviewSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm, ...rest } = data;

    console.log(rest);
  };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <button onClick={() => router.back()} className="w-fit underline">
          ← Back
        </button>
        {review && <DeleteReviewButton id={review.id} />}
      </div>

      <div className="py-8 px-14 bg-white rounded-2xl">
        <h1 className="pb-4 text-2xl font-medium text-neutral-800 text-center">Meal Review</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <section className="flex flex-col gap-4 pb-8 border-b border-neutral-300">
            <h2 className="font-semibold text-neutral-800 leading-[20px]">Meal Components</h2>

            {review?.components.map((component, index) => (
              <MealComponentInput
                key={component.id}
                control={control}
                label={component.title}
                name={`components.${index}`}
                isComponent
              />
            ))}
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-semibold text-neutral-800 leading-[20px]">Meal Review</h2>

            <MealComponentInput key={review.id} control={control} label={'Meal Summary Review'} isComponent={false} />
          </section>

          <input
            type="text"
            {...register('author')}
            placeholder="Your Nickname (other users will see this)"
            className="p-4 border border-primary-green-300 rounded-2xl w-full bg-transparent focus:outline-none text-neutral-500-base"
          />

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('confirm')}
                className="w-4 h-4 bg-transparent border border-neutral-300"
              />
              <span className="text-neutral-500-base">
                I confirm that I have read and accepted Terms and Conditions and Privacy Policy
              </span>
            </label>
          </div>

          {errors.root?.message && <div className="text-red-600 text-sm">{errors.root.message}</div>}
          {errors.confirm && <p className="text-red-600 text-sm text-center">{errors?.confirm?.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className="block w-full p-3 bg-primary-green text-white rounded-2xl hover:bg-green-900 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealReview;
