// 'use client';

import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages }) => {
  // const searchParams = useSearchParams();

  // const getPageUrl = (page: number) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set('page', page.toString());
  //   return params.toString();
  // };

  return (
    <ul className="join">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Link key={page} href={`?page=${page}`} className={`join-item btn ${page === currentPage ? 'btn-active' : ''}`}>
          {page}
        </Link>
      ))}
    </ul>
  );
};

export default Pagination;
