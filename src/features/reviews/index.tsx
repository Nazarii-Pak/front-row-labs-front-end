import Link from 'next/link';
import { FC } from 'react';
import Pagination from '@/components/Pagiantion';
import { Review } from '@/types/reviews';
import { REVIEWS_PAGE_SIZE } from '@/core';

type ReviewsProps = {
  reviews: Review[];
  total: number;
  page: number;
};

const titles = ['ID', 'Title', 'Rating', 'Content', 'Author'];

const Reviews: FC<ReviewsProps> = ({ reviews, total, page }) => {
  const totalPages = Math.ceil(total / REVIEWS_PAGE_SIZE);

  return (
    <div>
      <div className=" w-full max-w-screen overflow-x-auto">
        <ul className="flex flex-col w-full min-w-[600px]">
          <li className="grid grid-cols-5 w-full py-2 ">
            {titles.map((title) => (
              <p key={title} className="text-lg font-bold text-center bg-slate-700">
                {title}
              </p>
            ))}
          </li>
          {reviews.length === 0 && <p className="text-center">No reviews found</p>}
          {reviews.map((review) => (
            <Link key={review.id} href={`/reviews/${review.id}`} className="hover:bg-gray-600 odd:bg-gray-800">
              <li className="grid grid-cols-5 w-full p-2  text-center">
                <p className="text-sm font-bold">{review.id}</p>
                <p className="text-sm font-bold truncate">{review.title}</p>
                <p className="text-sm text-gray-500">
                  {Array.from({ length: review.rating }, (_, index) => index + 1).map((_, index) => (
                    <span key={index} className="text-sm text-gray-500">
                      ⭐️
                    </span>
                  ))}
                </p>
                <p className="text-sm text-gray-500 truncate">{review.content}</p>
                <p className="text-sm text-gray-500 truncate">{review.author}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex justify-center pt-8">
        <Pagination currentPage={Number(page || 1)} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Reviews;
