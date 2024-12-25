import { FC } from 'react';

const ReviewDetailsSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-primary-green-900">Review Details</h1>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="skeleton h-4 w-10" />
          <div className="skeleton h-10 w-full" />
        </div>
      ))}
    </div>
  );
};

export default ReviewDetailsSkeleton;
