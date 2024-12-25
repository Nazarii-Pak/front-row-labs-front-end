import { FC } from 'react';
import Link from 'next/link';
import AuthorsFilter from '@/features/reviews/components/AuthorsFilter';
import RatingFilter from '@/features/reviews/components/RatingFilter';
import SearchComponent from '@/features/reviews/components/SearchComponent';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <Link href="/reviews/new" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Review
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <AuthorsFilter />
        <RatingFilter />
        <SearchComponent />
      </div>

      {children}
    </div>
  );
};

export default Layout;
