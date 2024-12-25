import { FC } from 'react';
import ReviewDetails from '@/features/reviews/ReviewDetails';

const NewReview: FC = () => {
  return <ReviewDetails isNew={true} review={null} />;
};

export default NewReview;
