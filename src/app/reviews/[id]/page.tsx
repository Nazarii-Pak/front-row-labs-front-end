import { FC } from 'react';
import { getReviewByIdApi } from '@/services/reviews';
import MealReview from '@/features/MealReview';

type ReviewProps = {
  params: Promise<{ id: string }>;
};

const Review: FC<ReviewProps> = async ({ params }) => {
  const id = (await params).id;

  const review = await getReviewByIdApi(id);

  const updatedMealReview = {
    ...review,
    components: [
      {
        id: '101',
        title: 'Morrocan Chicken',
        rating: 3,
        content: '',
        author: 'John Doe',
      },
      {
        id: '102',
        title: 'Couscous Pilaf',
        rating: 4,
        content: '',
        author: 'Jane Doe',
      },
      {
        id: '103',
        title: 'Turkey Meatloaf',
        rating: 5,
        content: '',
        author: 'John Doe',
      },
    ],
  };

  return <MealReview review={updatedMealReview} />;
};

export default Review;
