import { FC } from 'react';
import { getReviewByIdApi } from '@/services/reviews';
import ReviewDetails from '@/features/reviews/ReviewDetails';

type ReviewProps = {
  params: Promise<{ id: string }>;
};

const Review: FC<ReviewProps> = async ({ params }) => {
  const id = (await params).id;

  const review = await getReviewByIdApi(id);

  return <ReviewDetails isNew={false} review={review} />;
};

export default Review;
